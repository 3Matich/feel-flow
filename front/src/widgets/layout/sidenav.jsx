// src/widgets/layout/Sidenav.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Avatar, Button, IconButton, Typography, Tooltip } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { getUser, getUserData, getAuthData, getEnterpriseImage } from "@/api";

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}

export function Sidenav({ brandImg, brandName, routes, onLogout }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const { authority } = getUserData();
  const [enterpriseLogo, setEnterpriseLogo] = useState(brandImg);
  const [enterpriseName, setEnterpriseName] = useState(brandName);

  // Al montar, asegurarnos de que esté contraído
  useEffect(() => {
    setOpenSidenav(dispatch, false);
  }, [dispatch]);

  // Carga del logo de la empresa
  useEffect(() => {
    getEnterpriseImage()
      .then(({ fileType, fileData }) =>
        setEnterpriseLogo(`data:${fileType};base64,${fileData}`)
      )
      .catch(() => setEnterpriseLogo(brandImg));
  }, [brandImg]);

  // Carga del nombre de la empresa desde el perfil de usuario
  useEffect(() => {
    const { token } = getAuthData();
    if (!token) return;
    const { id: userID } = decodeJwt(token);
    if (!userID) {
      console.warn("❌ No se pudo extraer userID del token");
      return;
    }
    getUser(userID)
      .then((user) => {
        const ent = user.enterpriseInfoHomeDTO;
        if (ent?.name) setEnterpriseName(ent.name);
      })
      .catch((err) => console.error("❌ Error fetching user:", err));
  }, [brandName]);

  return (
    <>
      {/* Mango arriba a la izquierda en mobile, solo si el sidenav está cerrado */}
      {!openSidenav && (
        <div
          className="xl:hidden fixed top-4 left-4 z-50
                     flex items-center justify-center w-10 h-10
                     bg-gradient-to-br from-pink-500 to-red-500
                     text-white rounded-full shadow-lg cursor-pointer"
          onClick={() => setOpenSidenav(dispatch, true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </div>
      )}

      {/* Sidebar principal */}
      <aside
        className={`
          bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text
          fixed inset-y-0 left-0 z-40 my-4 ml-4 h-[calc(100vh-32px)] w-72
          border border-light-border dark:border-dark-border
          rounded-xl transition-transform duration-300 transform
          ${openSidenav ? "translate-x-0" : "-translate-x-80"}
          xl:translate-x-0
        `}
      >
        {/* Botón cerrar arriba a la izquierda SOLO en mobile */}
        {openSidenav && (
          <div className="xl:hidden absolute top-3 left-3 z-50">
            <IconButton
              variant="text"
              color="white"
              size="sm"
              ripple={false}
              onClick={() => setOpenSidenav(dispatch, false)}
              className="bg-gray-900/80 text-white rounded-full shadow"
            >
              <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
            </IconButton>
          </div>
        )}

        {/* Cabecera con logo y título */}
        <div className="pt-12 pb-2 px-4 flex items-center gap-3 relative">
          <Avatar
            src={enterpriseLogo}
            alt={enterpriseName}
            size="xl"
            className="flex-shrink-0 border-4 border-black"
          />
          <Typography
            variant="h5"
            className="truncate max-w-[calc(100%-4rem)] text-lg"
          >
            {enterpriseName}
          </Typography>
        </div>

        {/* Menú de rutas */}
        <div className="m-4">
          {routes
            .filter(({ layout }) => layout !== "auth")
            .map(({ layout, title, pages }, idx) => (
              <ul key={idx} className="mb-4 flex flex-col gap-1">
                {title && (
                  <li className="mx-3.5 mt-4 mb-2">
                    <Typography variant="small" className="uppercase text-xs">
                      {title}
                    </Typography>
                  </li>
                )}
                {pages
                  .filter(({ pageAuthority }) =>
                    pageAuthority.includes(authority)
                  )
                  .map(({ icon, name, path }) => (
                    <li key={name}>
                      <NavLink to={`/${layout}${path}`}>
                        {({ isActive }) => (
                          <Button
                            variant={isActive ? "gradient" : "text"}
                            color={
                              isActive
                                ? "pink"
                                : sidenavType === "dark"
                                ? "white"
                                : "blue-gray"
                            }
                            className={`flex items-center gap-4 px-4 capitalize ${
                              isActive ? "sidenav-text" : ""
                            } text-light-text dark:text-dark-text`}
                            fullWidth
                          >
                            {icon}
                            <Typography
                              className={`font-medium capitalize text-sm ${
                                isActive ? "sidenav-text" : ""
                              }`}
                            >
                              {name}
                            </Typography>
                          </Button>
                        )}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-4 right-4">
          <Tooltip content="Cerrar sesión" placement="left" className="bg-gray-800">
            <IconButton variant="text" color="blue-gray" onClick={onLogout}>
              <ArrowLeftOnRectangleIcon className="h-7 w-7 hover:text-red-500" />
            </IconButton>
          </Tooltip>
        </div>
      </aside>
    </>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo.png",
  brandName: "Feel Flow",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Sidenav;

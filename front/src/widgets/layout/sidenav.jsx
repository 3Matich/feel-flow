// src/widgets/layout/Sidenav.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { getEnterpriseImage } from "@/services/getEnterpriseImage";
import { getUser } from "@/api/users/getUser";
import { getAuthData } from "@/services/session";

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

  const [enterpriseLogo, setEnterpriseLogo] = useState(brandImg);
  const [enterpriseName, setEnterpriseName] = useState(brandName);

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // Carga del logo de la enterprise
  useEffect(() => {
    getEnterpriseImage()
      .then(({ fileType, fileData }) =>
        setEnterpriseLogo(`data:${fileType};base64,${fileData}`)
      )
      .catch(() => {
        setEnterpriseLogo(brandImg);
      });
  }, [brandImg]);

  // Carga del nombre de la enterprise desde el perfil de usuario
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
        if (ent && typeof ent.name === "string") {
          setEnterpriseName(ent.name);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching user:", err);
      });
  }, [brandName]);

  return (
    <aside // ${sidenavTypes[sidenavType]} classname color
      className={`bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-light-border dark:border-dark-border`}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-4 flex items-center gap-3">
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
        </Link>

        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>

      <div className="m-4">
        {routes
          .filter(({ layout }) => layout !== "auth")
          .map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography variant="small" className="uppercase text-xs">
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ icon, name, path }) => (
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

      <div className="absolute bottom-4 right-4">
        <Tooltip content="Cerrar sesión" placement="left" className="bg-gray-800">
          <IconButton variant="text" color="blue-gray" onClick={onLogout}>
            <ArrowLeftOnRectangleIcon className="h-7 w-7 hover:text-red-500" />
          </IconButton>
        </Tooltip>
      </div>
    </aside>
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

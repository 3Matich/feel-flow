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

export function Sidenav({ brandImg, brandName, routes, onLogout }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside // ${sidenavTypes[sidenavType]} classname color
      className={`bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-light-border dark:border-dark-border`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center flex items-center justify-start space-x-4">
          <Avatar src="/img/logo.png" alt={brandName} size="lg" />
          <Typography
            variant="h4"
          //color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>

        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4 text-light-text dark:text-dark-text">
        {routes
          .filter(({ layout }) => layout !== "auth")
          .map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2 ">
                  <Typography
                    variant="small"
                    // color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="uppercase"
                  >
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
                            ? sidenavColor
                            : sidenavType === "dark"
                              ? "white"
                              : "blue-gray"
                        }
                        className={`flex items-center gap-4 px-4 capitalize ${isActive && sidenavColor === "dark" ? "text-dark-text" : "text-light-text"} dark:text-dark-text`}
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
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
            <ArrowLeftOnRectangleIcon className="h-7 w-7 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500" />
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
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import {
  BellIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "@/context";

const events = [
    { user: "Pedro", action: "actualizó el estado de Kudos", time: "Hace 2 horas", avatar: "/img/team-2.jpeg"},
    { user: "María", action: "completó la encuesta de 12 Pasos", time: "Hace 4 horas", avatar: "/img/team-3.jpeg" },
    { user: "Carlos", action: "agregó un comentario en Niko Niko", time: "Ayer", avatar: "/img/team-4.jpeg" },
    { user: "Lucia", action: "marcó Niko Niko como revisado", time: "Hace 1 día", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
];

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const formattedEvents = events.map((event, index) => ({
      id: index + 1,
      title: event.user,
      message: event.action,
      time: event.time,
      avatar: event.avatar, // Imagen específica para cada notificación
    }));
    setNotifications(formattedEvents);
  }, []);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all mb-4 text-light-text dark:text-dark-text ${
        fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 bg-light-primary dark:bg-dark-primary border-light-border dark:border-dark-border"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          {/* <Breadcrumbs className={`bg-transparent p-0 ${fixedNavbar ? "mt-1" : ""}`}>
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {page}
            </Typography>
          </Breadcrumbs> */}
          <Typography variant="h6"> {/* color="blue-gray" */}
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          {/*  
          <IconButton variant="text" color="blue-gray" onClick={onLogout}>
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          */}
          <Badge content={notifications.length}>
            <Menu>
              <MenuHandler>
                <IconButton variant="text"> {/* color="blue-gray" */}
                  <BellIcon className={`h-5 w-5 ${fixedNavbar ? "text-dark dark:text-white" : "text-light-primary dark:text-dark-primary" }`} /> {/* text-blue-gray-500 */}
                </IconButton>
              </MenuHandler>
              <MenuList className="w-max border-0 bg-light-secondary dark:bg-dark-secondary">
                {notifications.map((notif) => (
                  <MenuItem key={notif.id} className="flex items-center gap-3">
                    <Avatar
                      src={notif.avatar}
                      alt={notif.title}
                      size="sm"
                      variant="circular"
                    />
                    <div>
                      <Typography
                        variant="small"
                        color="text-light-secondary dark:text-dark-secondary"
                        className="mb-1 font-normal"
                      >
                        <strong>{notif.title}</strong> {notif.message}
                      </Typography>
                      <Typography
                        variant="small"
                        color="text-light-secondary dark:text-dark-secondary"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" /> {notif.time}
                      </Typography>
                    </div>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Badge>

          <IconButton
            variant="text"
            // color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className={`h-5 w-5 ${fixedNavbar ? "text-dark dark:text-white" : "text-light-primary dark:text-dark-primary" }`} /> {/* text-blue-gray-500 */}
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
// DashboardNavbar.jsx
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
import { GetNotifications } from "@/api/dashboard/GetNotifications";
import { useOutletContext } from "react-router-dom";

// Función para calcular el tiempo relativo
function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date; // diferencia en milisegundos

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) {
    return `Hace ${diffSeconds} segundos`;
  } else if (diffMinutes < 60) {
    return `Hace ${diffMinutes} minutos`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} horas`;
  } else {
    return `Hace ${diffDays} días`;
  }
}

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const context = useOutletContext();
  const setSessionExpired = context?.setSessionExpired;

  // Estado para notificaciones (inicialmente vacío)
  const [notifications, setNotifications] = useState([]);

  // Cargar notificaciones vía GET cuando se monta (opcional, para tener un respaldo inicial)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {

        const token = sessionStorage.getItem("token");
        if (!token) return;
        const data = await GetNotifications(token); // Este servicio ya lo tienes implementado
        setNotifications(data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setSessionExpired?.(true);
        }
      };
    };
    fetchNotifications();
  }, []);

  // Conexión WebSocket para recibir notificaciones en tiempo real
  /*
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    // Ejemplo básico: ajusta la URL según la configuración de tu servidor
    const ws = new WebSocket(`ws://localhost:8080/ws/notifications?token=${token}`);
    
    ws.onopen = () => {
      console.log("WebSocket conectado para notificaciones.");
    };
    
    ws.onmessage = (event) => {
      try {
        const newNotif = JSON.parse(event.data);
        console.log("Notificación recibida vía WebSocket:", newNotif);
        // Agregar la nueva notificación al inicio de la lista
        setNotifications((prev) => [newNotif, ...prev]);
      } catch (error) {
        console.error("Error al parsear la notificación:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket desconectado.");
    };

    // Limpieza: cerrar la conexión al desmontar
    return () => {
      ws.close();
    };
  }, []);
  */
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all mb-4 text-light-text dark:text-dark-text ${fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 bg-light-primary dark:bg-dark-primary border-light-border dark:border-dark-border"
          : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h6">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <Badge content={notifications.length}>
            <Menu placement="bottom-end">
              <MenuHandler>
                <IconButton variant="text"> {/* color="blue-gray" */}
                  <BellIcon className="h-5 w-5 text-dark dark:text-white" /> {/* text-blue-gray-500 ${fixedNavbar ? "text-dark dark:text-white" : "text-light-primary dark:text-dark-primary" } */}
                </IconButton>
              </MenuHandler>
              <MenuList className="w-max border-0 bg-light-secondary dark:bg-dark-secondary">
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <MenuItem key={index} className="flex items-center gap-3 hover:!bg-pink-800">
                      {/* <Avatar
                        src={notif.avatar || "/img/default-avatar.png"}
                        alt={notif.title}
                        size="sm"
                        variant="circular"
                      /> */}
                      <div>
                        <Typography
                          variant="small"
                          className="mb-1"
                        >
                          <strong>{notif.title}</strong> {notif.body}
                        </Typography>
                        <Typography
                          variant="small"
                          className="flex items-center gap-1 text-xs opacity-60"
                        >
                          <ClockIcon className="h-3.5 w-3.5" /> {getRelativeTime(notif.createdAt)}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>Sin notificaciones</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Badge>

          <IconButton
            variant="text"
            // color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-dark dark:text-white" /> {/* text-blue-gray-500 ${fixedNavbar ? "text-dark dark:text-white" : "text-light-primary dark:text-dark-primary" } */}
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;

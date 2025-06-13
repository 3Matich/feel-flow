// src/widgets/layout/DashboardNavbar.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
} from "@material-tailwind/react";
import {
  BellIcon,
  ClockIcon,
  Cog6ToothIcon,
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
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) return `Hace ${diffSeconds} segundos`;
  if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
  if (diffHours < 24) return `Hace ${diffHours} horas`;
  return `Hace ${diffDays} días`;
}

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const context = useOutletContext();
  const setSessionExpired = context?.setSessionExpired;

  const [notifications, setNotifications] = useState([]);

  // Carga inicial de notificaciones
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const data = await GetNotifications(token);
        setNotifications(data);
      } catch (error) {
        if (error.response?.status === 403) {
          setSessionExpired?.(true);
        }
      }
    };
    fetchNotifications();
  }, []);

  // Handler para marcar una notificación como leída
  const handleMarkAsRead = (index) => {
    // Aquí podrías llamar a tu API para marcarla en el backend
    // p.ej.: await MarkNotificationAsRead(notifications[index].id)
    setNotifications((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`
        rounded-xl transition-all mb-4 text-light-text dark:text-dark-text
        ${fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 bg-light-primary dark:bg-dark-primary border-light-border dark:border-dark-border"
          : "px-0 py-1"
        }
      `}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        {/* Título de la página */}
        <div className="capitalize">
          <Typography variant="h6">{page}</Typography>
        </div>

        {/* Íconos de notificaciones y configuración */}
        <div className="flex items-center justify-end w-full md:w-auto">
          <Badge content={notifications.length}>
            <Menu placement="bottom-end">
              <MenuHandler>
                <IconButton variant="text">
                  <BellIcon className="h-5 w-5 text-dark dark:text-white" />
                </IconButton>
              </MenuHandler>

              {/* MenuList responsive y scrollable */}
              <MenuList
                className={`
                  border-0 bg-light-primary dark:bg-dark-primary
                  w-full max-w-xs sm:max-w-sm md:max-w-md
                  overflow-y-auto max-h-80
                `}
              >
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <MenuItem
                      key={notif.id || index}
                      className="flex items-start gap-3 hover:!bg-pink-100 dark:hover:!bg-pink-800 cursor-pointer"
                      onClick={() => handleMarkAsRead(index)}
                    >
                      <div className="flex-1">
                        <Typography variant="small" className="mb-1">
                          <strong>{notif.title}</strong> {notif.body}
                        </Typography>
                        <Typography
                          variant="small"
                          className="flex items-center gap-1 text-xs opacity-60"
                        >
                          <ClockIcon className="h-3.5 w-3.5" />
                          {getRelativeTime(notif.createdAt)}
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
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-dark dark:text-white" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;

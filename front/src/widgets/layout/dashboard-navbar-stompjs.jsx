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
import { GetNotifications } from "@/services/GetNotifications";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

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

export function DashboardNavbar({ onLogout, selectedTeam }) {
  // selectedTeam se espera que contenga al menos { value, label } (o similar) con el ID del equipo.
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  // Estado para notificaciones (inicialmente vacío)
  const [notifications, setNotifications] = useState([]);

  // Conexión WebSocket con Stomp (para notificaciones en tiempo real)
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token || !selectedTeam || !selectedTeam.value) return;
    
    // URL de conexión (ajustá según tu servidor)
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("Conectado al WebSocket para notificaciones");
      // Suscribirse al tópico, asumiendo que el back envía notificaciones a /topic/notifications/{teamId}
      const subscriptionPath = `/topic/notifications/${selectedTeam.value}`;
      stompClient.subscribe(subscriptionPath, (message) => {
        try {
          const newNotification = JSON.parse(message.body);
          console.log("Notificación recibida:", newNotification);
          setNotifications((prev) => [newNotification, ...prev]);
        } catch (error) {
          console.error("Error al parsear la notificación:", error);
        }
      });
    }, (error) => {
      console.error("Error en la conexión STOMP:", error);
    });

    // Limpiar la conexión al desmontar
    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("WebSocket desconectado");
        });
      }
    };
  }, [selectedTeam]);

  // (Opcional) Llamada GET para cargar notificaciones al inicio, en caso de que no se reciban por WS
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      const data = await GetNotifications(token);
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all mb-4 ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 ${fixedNavbar ? "mt-1" : ""}`}>
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
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={onLogout}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          <Badge content={notifications.length}>
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
              </MenuHandler>
              <MenuList className="w-max border-0">
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <MenuItem key={notif.id || index} className="flex items-center gap-3">
                      {/* <Avatar
                        src={notif.avatar || "/img/default-avatar.png"}
                        alt={notif.title}
                        size="sm"
                        variant="circular"
                      /> */}
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 font-normal"
                        >
                          <strong>{notif.title}</strong> {notif.body}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center gap-1 text-xs font-normal opacity-60"
                        >
                          <ClockIcon className="h-3.5 w-3.5" /> {getRelativeTime(notif.createdAt)}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem className="text-gray-500">Sin notificaciones</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Badge>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;

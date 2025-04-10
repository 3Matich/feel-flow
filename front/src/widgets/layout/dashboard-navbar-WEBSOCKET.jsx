// DashboardNavbar.jsx
import React from 'react';
import {
  Navbar,
  Typography,
  IconButton,
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
} from "@heroicons/react/24/solid";

import { useStompNotifications } from "@/hooks/useStompNotifications";
// Asumiendo que tenés un teamUUID para suscribirte

export function DashboardNavbar({ teamUUID }) {
  // Hook STOMP
  const { connected, notifications } = useStompNotifications(teamUUID);

  return (
    <Navbar fullWidth>
      <div className="flex justify-between items-center">
        <Typography variant="h6" color="blue-gray">
          Dashboard
        </Typography>
        <div className="flex items-center gap-4">
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
                    <MenuItem key={index} className="flex items-center gap-3">
                      <Avatar
                        src={notif.avatar || "/img/default-avatar.png"}
                        alt={notif.title}
                        size="sm"
                        variant="circular"
                      />
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 font-normal"
                        >
                          <strong>{notif.title}</strong> {notif.body}
                        </Typography>
                        {/* Suponiendo que notif.createdAt es la fecha */}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center gap-1 text-xs font-normal opacity-60"
                        >
                          <ClockIcon className="h-3.5 w-3.5" /> Hace X tiempo
                        </Typography>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem className="text-gray-500">
                    Sin notificaciones
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Badge>
          <IconButton variant="text" color="blue-gray">
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

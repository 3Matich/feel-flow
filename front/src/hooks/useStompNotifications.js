// hooks/useStompNotifications.js
import { useEffect, useState } from 'react';
import { StompService } from '@/services/StompService';

export function useStompNotifications(teamUUID) {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Crear una instancia del servicio STOMP
    const stompService = new StompService(teamUUID);

    // Callback cuando se conecta
    const handleConnected = () => {
      setConnected(true);
    };

    // Callback para nuevas notificaciones
    const handleNotification = (notif) => {
      // Agregar al inicio
      setNotifications((prev) => [notif, ...prev]);
    };

    // Conectar STOMP
    stompService.connect(handleConnected, handleNotification);

    // Cleanup: Desconectar al desmontar
    return () => {
      stompService.disconnect();
    };
  }, [teamUUID]);

  return { connected, notifications };
}

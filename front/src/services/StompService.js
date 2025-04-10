// services/StompService.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export class StompService {
  constructor(teamUUID) {
    // Ajustá la URL a la de tu servidor
    this.socketUrl = `http://localhost:8080/ws`;
    this.teamUUID = teamUUID;
    this.stompClient = null;
    this.onNotificationCallback = null;
  }

  connect(onConnected, onNotification) {
    // Guardamos el callback para notificaciones entrantes
    this.onNotificationCallback = onNotification;

    // Crear socket con SockJS
    const socket = new SockJS(this.socketUrl);

    // Crear un cliente STOMP
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log('STOMP debug:', str);
      },
      onConnect: () => {
        console.log('Conectado al servidor STOMP');
        // Suscribirse al tópico con teamUUID
        this.subscribeToTopic(this.teamUUID);
        // Llamar el callback de "conectado"
        if (onConnected) {
          onConnected();
        }
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
      },
    });

    // Conectar STOMP
    this.stompClient.activate();
  }

  subscribeToTopic(teamUUID) {
    // Ejemplo: /topic/{teamUUID}
    const topic = `/topic/notifications/${teamUUID}`;
    this.stompClient.subscribe(topic, (msg) => {
      // msg.body contiene el payload
      const notification = JSON.parse(msg.body);
      console.log('Notificación recibida:', notification);
      if (this.onNotificationCallback) {
        // Emitir la notificación al callback
        this.onNotificationCallback(notification);
      }
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Desconectado de STOMP');
    }
  }
}

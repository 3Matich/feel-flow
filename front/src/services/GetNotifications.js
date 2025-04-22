// services/GetNotifications.js
export async function GetNotifications(token, { from, to, max } = {}) {
    let endpoint = `http://localhost:8080/api/v1/notifications/notifications`;
    
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (max) params.append("max", max);
    
    if ([...params].length > 0) {
      endpoint += `?${params.toString()}`;
    }
  
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log("GetNotifications Success:", data);
        return data; // Se espera un array de objetos: [{ title, body, createdAt }, ... ]
      } else {
        const errorData = await response.json();
        console.error("Error en GetNotifications:", errorData);
        return [];
      }
    } catch (error) {
      console.error("Error en la solicitud GetNotifications:", error);
      return [];
    }
  }
  
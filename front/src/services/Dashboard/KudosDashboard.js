// src/services/Dashboard/KudosDashboard.js
export async function getKudosDashboardData(token) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/dashboard/kudos_dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Error al obtener datos de Kudos");
  
      return await response.json(); // Array de { username, cantBadges, highlight }
    } catch (error) {
      console.error("Error en getKudosDashboardData:", error);
      return [];
    }
  }
  
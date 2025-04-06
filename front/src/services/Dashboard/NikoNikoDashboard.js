// src/services/Dashboard/NikoNikoDashboard.js
export async function getNikoNikoTendencias(token) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/dashboard/niko_niko_avg", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Error al obtener datos de Niko Niko");
  
      const json = await response.json();
  
      // Orden de los días para mantener consistencia visual
      const diasOrdenados = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
      const convertirDia = (dia) => {
        switch (dia) {
          case "MONDAY": return "L";
          case "TUESDAY": return "M";
          case "WEDNESDAY": return "Mi";
          case "THURSDAY": return "J";
          case "FRIDAY": return "V";
          default: return dia;
        }
      };
  
      // Mapear los datos asegurando el orden
      const startOfDay = diasOrdenados.map(dia => {
        const item = json.nikoAvgDataStartOfDay.find(d => d.dayOfWeek === dia);
        return item ? item.avg : null;
      });
  
      const endOfDay = diasOrdenados.map(dia => {
        const item = json.nikoAvgDataEndOfDay.find(d => d.dayOfWeek === dia);
        return item ? item.avg : null;
      });
  
      const labels = diasOrdenados.map(convertirDia);
  
      return {
        startOfDay,
        endOfDay,
        labels
      };
  
    } catch (error) {
      console.error("Error en getNikoNikoTendencias:", error);
      return {
        startOfDay: [],
        endOfDay: [],
        labels: []
      };
    }
  }
  
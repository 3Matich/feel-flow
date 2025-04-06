export async function getTwelveStepsSummary(token) {
    try {
      const response = await fetch('http://localhost:8080/api/v1/dashboard/twelve_steps_avg', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Esto será un array con objetos { categoryName, average }
    } catch (error) {
      console.error("Error al obtener resumen de 12 pasos:", error);
      return null;
    }
  }
  
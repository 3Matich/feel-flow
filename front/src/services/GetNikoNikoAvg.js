export async function GetNikoNikoAvg(token, { teamId, month }) {
    let endpoint = `http://localhost:8080/api/v1/dashboard/niko_niko_avg`;
    // Agregar query params si se proporcionan
    if (teamId) {
      endpoint += `?teamId=${teamId}`;
      if (month) {
        endpoint += `&month=${month}`;
      }
    }
  
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('GetNikoNikoAvg Success:', data);
        return data;
      } else {
        const errorData = await response.json();
        console.error('Error en GetNikoNikoAvg:', errorData.errorMessage);
        return errorData.errorMessage;
      }
    } catch (error) {
      console.error('Error durante la solicitud de GetNikoNikoAvg:', error);
      return 'Error al realizar la solicitud';
    }
  }
export async function GetTwelveStepsAvg(token, { teamId }) {
    let endpoint = `http://localhost:8080/api/v1/dashboard/twelve_steps_avg`;
    if (teamId) {
      endpoint += `?teamId=${teamId}`;
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
        console.log('GetTwelveStepsAvg Success:', data);
        return data;
      } else {
        const errorData = await response.json();
        console.error('Error en GetTwelveStepsAvg:', errorData.errorMessage);
        return errorData.errorMessage;
      }
    } catch (error) {
      console.error('Error durante la solicitud de GetTwelveStepsAvg:', error);
      return 'Error al realizar la solicitud';
    }
  }
  
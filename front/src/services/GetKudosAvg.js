// services/GetKudosAvg.js
export async function GetKudosAvg(token, { teamId }) {
  let endpoint = `http://localhost:8080/api/v1/dashboard/kudos_dashboard`;
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
      console.log('GetKudosDashboard Success:', data);
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error en GetKudosDashboard:', errorData.errorMessage);
      return errorData.errorMessage;
    }
  } catch (error) {
    console.error('Error durante la solicitud de GetKudosDashboard:', error);
    return 'Error al realizar la solicitud';
  }
}

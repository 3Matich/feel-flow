// services/GetNikoNikoSummary.js
export async function GetNikoNikoSummary(token, idTeam, numberOfMonth) {
    if (!idTeam || typeof idTeam !== 'string') {
      console.error('idTeam debe ser un string UUID válido');
      return [];
    }
  
    // let endpoint = `http://localhost:8080/api/v1/summary/niko-niko?idTeam=${idTeam}`;
    let endpoint = `http://localhost:8080/api/v1/summary/niko-niko?idTeam=717defe8-297e-4343-b6f9-aea1f116255a`;
    if (numberOfMonth) {
      endpoint += `&numberOfMonth=${numberOfMonth}`;
    }

    console.log("A este endpont le pega: ")
    console.log(endpoint)
  
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error('Error al obtener el summary de NikoNiko:', errorData);
        return [];
      }
    } catch (error) {
      console.error('Error en la solicitud NikoNikoSummary:', error);
      return [];
    }
  }
  
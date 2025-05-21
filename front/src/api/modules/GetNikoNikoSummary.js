// services/GetNikoNikoSummary.js
import { host } from "@/configs";
import { getAuthData } from "@/api/services";

export async function GetNikoNikoSummary(idTeam, numberOfMonth) {
  const { token } = getAuthData();
  if (!idTeam || typeof idTeam !== 'string') {
    console.error('idTeam debe ser un string UUID válido');
    return [];
  }

  let endpoint = `${host}/api/v1/summary/niko-niko?idTeam=${idTeam}`;
  
  if (numberOfMonth) {
    endpoint += `&numberOfMonth=${numberOfMonth}`;
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

// src/services/equipos/createTeam.js
import { getAuthData } from "@/api/services/session";

export async function createTeam(teamData) {
  const { token } = getAuthData();
  const url = "http://localhost:8080/api/v1/team";

  const payload = {
    nameTeam: teamData.name,
    descriptionTeam: teamData.description || "Sin descripción",
    teamLeaderDTO: {
      name: teamData.leaderFirstName,
      surname: teamData.leaderLastName,
      username: teamData.leaderUsername,
      password: teamData.leaderPassword,
    }
  };

  console.log("📦 Payload enviado:", payload);
  console.log("🔑 Token:", token);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const rawResponse = await response.clone().text();
    console.log("🧾 Respuesta cruda del backend:", rawResponse);

    if (!response.ok) {
      const errorBody = JSON.parse(rawResponse);
      const errorMsg = Array.isArray(errorBody)
        ? Object.values(errorBody[0])[0]
        : errorBody.errorMessage || "Error al crear el equipo";

      throw new Error(errorMsg);
    }

    return await response.text(); // Devuelve un string simple

  } catch (error) {
    console.error("❌ Error creando equipo:", error);
    throw error;
  }
}

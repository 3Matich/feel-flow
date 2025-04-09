import { getAuthData } from "@/services/session";

export async function getAvailableTeams() {
  const { token } = getAuthData();

  try {
    const response = await fetch("http://localhost:8080/api/v1/team", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("No se pudieron obtener los equipos");

    return await response.json();
  } catch (error) {
    console.error("❌ Error al obtener equipos disponibles:", error);
    return [];
  }
}

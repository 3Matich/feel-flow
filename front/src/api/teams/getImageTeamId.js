// src/services/images/getTeamImageById.js
import { getAuthData } from "@/services/session";
import { host } from "@/configs";

export async function getTeamImageById(teamId) {
  const { token } = getAuthData();

  const res = await fetch(
    `${host}/api/v1/images/team/${teamId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (res.status === 403) {
    throw new Error("Forbidden: revisa permisos o token vencido");
  }
  if (!res.ok) {
    throw new Error("No se pudo cargar la imagen del equipo");
  }

  // { id, name, fileType, fileData }
  return res.json();
}

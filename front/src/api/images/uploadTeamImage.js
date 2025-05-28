// src/api/images/uploadTeamImage.js
import { host } from "@/configs";
import { getAuthData } from "@/api";
import { getUserData } from "@/services/session";

export async function uploadTeamImage(teamId, file) {
  console.log("teamId: " + teamId)
  const { token } = getAuthData();
  const { authUserID } = getUserData();

  const formData = new FormData();
  formData.append("imageFile", file);

  const res = await fetch(`${host}/api/v1/images/team/${teamId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // No especificar Content-Type para que el navegador añada el boundary
    },
    body: formData,
  });

  if (res.status === 403) {
    throw new Error("Forbidden: revisa permisos o token vencido");
  }
  if (!res.ok) {
    throw new Error("No se pudo subir la imagen de usuario");
  }

  return res.json();
}
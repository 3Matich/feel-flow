// src/api/images/getUserImage.js
import { host } from "@/configs";
import { getAuthData } from "@/api/services";

export async function getUserImage() {
  const { token } = getAuthData();
  const res = await fetch(`${host}/api/v1/images/user/current_user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (res.status === 403) {
    throw new Error("Forbidden: revisa permisos o token vencido");
  }
  if (!res.ok) {
    throw new Error("No se pudo cargar la imagen de usuario");
  }

  return res.json(); // { fileType, fileData }
}

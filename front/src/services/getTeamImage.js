// src/api/images/getTeamImage.js

export async function getTeamImage(token) {
    const res = await fetch("http://localhost:8080/api/v1/images/team/current_team", {
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
      throw new Error("No se pudo cargar la imagen del equipo");
    }
  
    return res.json(); // { fileType, fileData }
  }
  
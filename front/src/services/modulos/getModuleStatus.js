// src/services/modulos/getModuleStatus.js
import { host } from "@/configs";
import { getUserData, getAuthData } from "@/services/session";

export async function getModuleStatus(moduleName) {
  try {
    const { isAdmin } = getUserData();
    const { token } = getAuthData();

    const url = new URL(`${host}/api/v1/dashboard/modules-and-users`);
    url.searchParams.append("nameModule", moduleName);
    url.searchParams.append("isAdmin", isAdmin === "true");

    console.log(`📡 GET module: ${moduleName} → ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error al obtener estado del módulo");

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`❌ Error en módulo ${moduleName}:`, error);
    return null;
  }
}

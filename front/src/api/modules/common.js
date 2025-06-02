import { host } from "@/configs";
import { getAuthData, getUserData } from "@/api";

export async function GetModulesAndUsers(nameModule = "TWELVE_STEPS") {
    const { token } = getAuthData();
    const { isAdmin } = getUserData();
    const endpoint = `${host}/api/v1/dashboard/modules-and-users?nameModule=${nameModule}&isAdmin=${isAdmin}`;

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json();
            // data: [ { moduleDto, usersDto }, { moduleDto, usersDto }, ... ]
            return data;
        } else {
            const errorData = await response.json();
            console.error("Error en GetModulesAndUsers:", errorData);
            return [];
        }
    } catch (error) {
        console.error("Error en la solicitud GetModulesAndUsers:", error);
        return [];
    }
}

export async function getModuleStatus(moduleName) {
    try {
        const { isAdmin } = getUserData();
        const { token } = getAuthData();

        const url = new URL(`${host}/api/v1/dashboard/modules-and-users`);
        url.searchParams.append("nameModule", moduleName);
        url.searchParams.append("isAdmin", isAdmin === "true");

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

export async function GeneralSummary() {
    const url = `${host}/api/v1/dashboard/general_summary`
    const { token } = getAuthData();
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
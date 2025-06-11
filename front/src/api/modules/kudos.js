import { host } from "@/configs";
import { getAuthData } from "@/api";

export async function createKudosModule({ idTeam, dateAndTimeToPublish, dateAndTimeToClose }) {
    const { token } = getAuthData();

    try {
        const response = await fetch(`${host}/api/v1/kudos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                idTeam,
                dateAndTimeToPublish,
                dateAndTimeToClose,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            let errorMessage = "Error al crear el módulo de Kudos";

            try {
                const parsed = JSON.parse(text);
                errorMessage = parsed?.errorMessage || errorMessage;
            } catch (err) {
                console.warn("⚠️ Respuesta no JSON:", text);
            }

            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (err) {
        console.error("❌ Error creando módulo Kudos:", err);
        throw err;
    }
}

export async function GetKudosSummary(idModule, idRegularUser = "") {
    console.log("Modulo: " + idModule)
    const endpoint = `${host}/api/v1/summary/kudos?idModule=${idModule}` +
        (idRegularUser ? `&idRegularUser=${idRegularUser}` : "");

    const { token } = getAuthData();
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
            console.log("GetKudosSummary Success: ", data);  // Log para ver la data
            return data; // Array de { badgeName, numberOfBadges }
        } else {
            const errorData = await response.json();
            console.error("Error en GetKudosSummary:", errorData);
            return [];
        }
    } catch (error) {
        console.error("Error en la solicitud GetKudosSummary:", error);
        return [];
    }
}

export async function GetNotificationsKudos() {
    const url = `${host}/api/v1/dashboard/notification_kudos_panel`
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
            const errorData = await response.json();
            console.error("Error:", errorData);
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export async function getKudosDashboardData(tkn) {
    const { token } = getAuthData();

    try {
        const response = await fetch(`${host}/api/v1/dashboard/kudos_dashboard`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Error al obtener datos de Kudos");

        return await response.json(); // Array de { username, cantBadges, highlight }
    } catch (error) {
        console.error("Error en getKudosDashboardData:", error);
        return [];
    }
}
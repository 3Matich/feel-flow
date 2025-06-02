import { host } from "@/configs";
import { getAuthData } from "@/api";

export async function createTwelveStepsModule({ idTeam, dateAndTimeToPublish, dateAndTimeToClose }) {
    const { token } = getAuthData();

    try {
        const response = await fetch(`${host}/api/v1/twelve_steps_modules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                idTeam,
                idPoolQuestion: 1,
                dateAndTimeToPublish,
                dateAndTimeToClose,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            let errorMessage = "Error al crear el módulo";

            try {
                const parsed = JSON.parse(text);
                errorMessage = parsed?.errorMessage || errorMessage;
            } catch (err) {
                console.warn("⚠️ Respuesta vacía o inválida:", text);
            }

            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (err) {
        console.error("❌ Error creando módulo 12 pasos:", err);
        throw err;
    }
};

export async function getTwelveStepsSummary(tkn) {
    const { token } = getAuthData();
    try {
        const response = await fetch(`${host}/api/v1/dashboard/twelve_steps_avg`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data = await response.json();
        return data; // Esto será un array con objetos { categoryName, average }
    } catch (error) {
        console.error("Error al obtener resumen de 12 pasos:", error);
        return null;
    }
}

export async function GetTwelveStepsSummary(idModule, idRegularUser = "") {
    const { token } = getAuthData();
    const endpoint = `${host}/api/v1/summary/twelve-steps?idModule=${idModule}` +
        (idRegularUser ? `&idRegularUser=${idRegularUser}` : "");
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
            return data; // Array de { categoryName, average }
        } else {
            const errorData = await response.json();
            console.error("Error en GetTwelveStepsSummary:", errorData);
            return [];
        }
    } catch (error) {
        console.error("Error en la solicitud GetTwelveStepsSummary:", error);
        return [];
    }
}
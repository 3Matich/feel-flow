import { host } from "@/configs";
import { getAuthData } from "@/api";

export const createNikoNikoModule = async (payload) => {
    const { token } = getAuthData();

    try {
        const response = await fetch(`${host}/api/v1/niko_niko`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("❌ Error creando módulo Niko Niko:", error.errorMessage);
            throw new Error(error.errorMessage || "Error al crear módulo");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error de red en Niko Niko:", error);
        throw error;
    }
};

export async function GetNikoNikoSummary(idTeam, numberOfMonth) {
    const { token } = getAuthData();
    if (!idTeam || typeof idTeam !== 'string') {
        console.error('idTeam debe ser un string UUID válido');
        return [];
    }

    let endpoint = `${host}/api/v1/summary/niko-niko?idTeam=${idTeam}`;

    if (numberOfMonth) {
        endpoint += `&numberOfMonth=${numberOfMonth}`;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            console.error('Error al obtener el summary de NikoNiko:', errorData);
            return [];
        }
    } catch (error) {
        console.error('Error en la solicitud NikoNikoSummary:', error);
        return [];
    }
};

export async function GetNotificationsNikoNiko() {
    const url = `${host}/api/v1/dashboard/notification_niko_niko_panel`
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
};

export async function getNikoNikoTendencias(token) {
    try {
        const response = await fetch(`${host}/api/v1/dashboard/niko_niko_avg`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Error al obtener datos de Niko Niko");

        const json = await response.json();

        // Orden de los días para mantener consistencia visual
        const diasOrdenados = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
        const convertirDia = (dia) => {
            switch (dia) {
                case "MONDAY": return "L";
                case "TUESDAY": return "M";
                case "WEDNESDAY": return "Mi";
                case "THURSDAY": return "J";
                case "FRIDAY": return "V";
                default: return dia;
            }
        };

        // Mapear los datos asegurando el orden
        const startOfDay = diasOrdenados.map(dia => {
            const item = json.nikoAvgDataStartOfDay.find(d => d.dayOfWeek === dia);
            return item ? item.avg : null;
        });

        const endOfDay = diasOrdenados.map(dia => {
            const item = json.nikoAvgDataEndOfDay.find(d => d.dayOfWeek === dia);
            return item ? item.avg : null;
        });

        const labels = diasOrdenados.map(convertirDia);

        return {
            startOfDay,
            endOfDay,
            labels
        };

    } catch (error) {
        console.error("Error en getNikoNikoTendencias:", error);
        return {
            startOfDay: [],
            endOfDay: [],
            labels: []
        };
    }
}
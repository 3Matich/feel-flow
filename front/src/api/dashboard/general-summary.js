import { host } from "@/configs";
import { getAuthData } from "../services/session";

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
            console.log(data);
            return data; 
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error en la solicitud GetKudosSummary:", error);
        return [];
    }
}
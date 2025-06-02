import { host } from "@/configs";
import { getAuthData } from "../services/session";

const { token } = getAuthData();

export async function CreateRecommendations() {
    try {
        if (token) {

            const response = await fetch(`${host}/api/v1/recommendations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log(response.status)
            return response.status;
        }
    } catch (error) {
        throw new Error(error.message || "Error al comunicarse con el servidor");
    }
}

export async function GetRecommendations() {
    try {
        const response = await fetch(`${host}/api/v1/recommendations`, {
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
        console.error("Error:", error);
        return [];
    }
}
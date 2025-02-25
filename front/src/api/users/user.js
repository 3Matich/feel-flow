import { getAuthData } from "../services/session";
import { host } from "@/configs";

export async function getUser(userID) {
    const { token } = getAuthData();
    try {
        const response = await fetch(`${host}/api/v1/user/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            const enterpriseName = data.enterpriseInfoHomeDTO.name;
            const enterpriseID = data.enterpriseInfoHomeDTO.uuid;
            const name = data.name;
            const surname = data.surname;
            const username = data.username;
            const userID = data.uuid;
            return ({ enterpriseName, enterpriseID, name, surname, username, userID });
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Error desconocido del servidor.";
            console.error(`Error al obtener los datos del perfil: ${response.status} - ${errorMessage}`);
            return (errorMessage);
        }
    } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
        return (error)
    }
}

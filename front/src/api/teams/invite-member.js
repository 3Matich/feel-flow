import { host } from "@/configs";
import { getAuthData } from "@/api";

export async function InviteMember( idTeam ) {
    let url = `${host}/api/v1/team/${idTeam}/invite`
    let { token } = getAuthData();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response.json(); // Devuelve true si la actualización fue exitosa
        } else if (response.status === 403) {
            return 403;
        } else {
            return false; // Devuelve false en caso de otro código de estado
        }
    } catch (error) {
        console.error('Error en la actualización:', error);
        return 500; // Devuelve false en caso de error
    }

}
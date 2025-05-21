import { host } from "@/configs";
import { getAuthData, getUserData } from "@/api";

export async function updateLoggedUser(changes) {
    const { token } = getAuthData();
    const { authUserID } = getUserData();
    
    // const token = sessionStorage.getItem('token');
    // const userId = sessionStorage.getItem('userID');
    const url = `${host}/api/v1/user/${authUserID}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changes),
        });

        if (response.status !== 204) { //204 es el OK
            const errorData = await response.json();
            return { errors: errorData };
        }

        return true;
    } catch (error) {
        console.error('Error en la actualización:', error);
        return false;
    }
}
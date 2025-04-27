import { host } from "@/configs";
import { getAuthData } from "../services";
const { token } = getAuthData();


export async function GetTeam() {
    let url = `${host}/api/v1/team`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        return response.status; // Aca se deberia cerrar la sesion y redirigir al login, hay que crear un hook
    } else {
        throw new Error('Error al recuperar los datos'); // Aca deberiamos tirar a una pag 500 o 404
    }
}
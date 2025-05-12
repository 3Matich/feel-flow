import { host } from "@/configs";

export async function GetEquipobyID(token, id) {
    let url = `${host}/api/v1/team/${id}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        navigate("/general");
    } else {
        throw new Error('Error al recuperar los datos');
    }
}
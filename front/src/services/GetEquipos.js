export async function GetEquipos(token) {
    let url = `http://localhost:8080/api/v1/team`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        window.location.href = '../pages/sign_in.html'
    } else {
        throw new Error('Error al recuperar los datos');
    }
}

export async function GetIdEquipo(token) {
    let url = `http://localhost:8080/api/v1/team`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
            return data[0].uuid;
        } else {
            // Manejar el caso donde no hay equipos
            console.error('No se encontraron equipos en la respuesta.');
            return null;
        }
    } else {
        // Manejar el caso de respuesta no exitosa
        console.error('Error en la solicitud:', response.status);
        return null;
    }
}
export async function GetEquipobyID(token, id) {
    let url = `http://localhost:8080/api/v1/team/${id}`;
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
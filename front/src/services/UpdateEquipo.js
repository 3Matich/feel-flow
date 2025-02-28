export async function UpdateEquipo(id, token, nameTeam, descriptionTeam) {
    let url = `http://localhost:8080/api/v1/team/${id}`;
    const changes = {
        nameTeam,
        descriptionTeam
    }
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        });

        if (response.status === 200) {
            return true; // Devuelve true si la actualización fue exitosa
        } else if (response.status === 403) {
            window.location.href = '../pages/sign_in.html';
        } else {
            return false; // Devuelve false en caso de otro código de estado
        }
    } catch (error) {
        console.error('Error en la actualización:', error);
        return false; // Devuelve false en caso de error
    }
}


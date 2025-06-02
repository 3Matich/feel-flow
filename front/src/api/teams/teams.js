import { host } from "@/configs";
import { getAuthData } from "@/api";

export async function createTeam(teamData) {
    const { token } = getAuthData();
    const url = `${host}/api/v1/team`;

    const payload = {
        nameTeam: teamData.name,
        descriptionTeam: teamData.description || "Sin descripción",
        teamLeaderDTO: {
            name: teamData.leaderFirstName,
            surname: teamData.leaderLastName,
            username: teamData.leaderUsername,
            password: teamData.leaderPassword,
        }
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const rawResponse = await response.clone().text();

        if (!response.ok) {
            const errorBody = JSON.parse(rawResponse);
            const errorMsg = Array.isArray(errorBody)
                ? Object.values(errorBody[0])[0]
                : errorBody.errorMessage || "Error al crear el equipo";

            throw new Error(errorMsg);
        }

        return await response.text(); // Devuelve un string simple

    } catch (error) {
        console.error("❌ Error creando equipo:", error);
        throw error;
    }
}

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

export async function GetTeam() {
    let { token } = getAuthData();
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

export async function UpdateTeam(id, data) {
    let { token } = getAuthData();
    let url = `${host}/api/v1/team/${id}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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

export async function InviteMember(idTeam) {
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

export async function getTeamImage() {
    const { token } = getAuthData();
    const res = await fetch(`${host}/api/v1/images/team/current_team`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

    if (res.status === 403) {
        throw new Error("Forbidden: revisa permisos o token vencido");
    }
    if (!res.ok) {
        throw new Error("No se pudo cargar la imagen del equipo");
    }

    // { id, name, fileType, fileData }
    return res.json();
}

export async function getTeamImageById(teamId) {
    const { token } = getAuthData();
    const res = await fetch(
        `${host}/api/v1/images/team/${teamId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );
    if (res.status === 403) {
        throw new Error("Forbidden: revisa permisos o token vencido");
    }
    if (!res.ok) {
        throw new Error("No se pudo cargar la imagen del equipo");
    }
    return res.json(); // { fileType, fileData }
}

export async function uploadTeamImage(teamId, file) {
    const { token } = getAuthData();

    const formData = new FormData();
    formData.append("imageFile", file);

    const res = await fetch(`${host}/api/v1/images/team/${teamId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            // No especificar Content-Type para que el navegador añada el boundary
        },
        body: formData,
    });

    if (res.status === 403) {
        throw new Error("Forbidden: revisa permisos o token vencido");
    }
    if (!res.ok) {
        throw new Error("No se pudo subir la imagen de usuario");
    }

    return res.json();
}
import { host } from "@/configs";
import { getAuthData, getUserData } from "@/api";

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
            return data
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Error desconocido del servidor.";
            console.error(`Error al obtener los datos del perfil: ${response.status} - ${errorMessage}`);
            return (errorMessage);
        }
    } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
        return (error);
    }
}

export async function updateLoggedUser(changes) {
    const { token } = getAuthData();
    const { authUserID } = getUserData();

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

export async function getUserImage() {
    const { token } = getAuthData();
    const res = await fetch(`${host}/api/v1/images/user/current_user`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    if (res.status === 403) {
        throw new Error("Forbidden: revisa permisos o token vencido");
    }
    if (!res.ok) {
        throw new Error("No se pudo cargar la imagen de usuario");
    }

    return res.json(); // { fileType, fileData }
}

export async function uploadUserImage(file) {
    const { token } = getAuthData();
    const { authUserID } = getUserData();

    const formData = new FormData();
    formData.append("imageFile", file);

    const res = await fetch(`${host}/api/v1/images/user/${authUserID}`, {
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

export async function JoinToTeam(invitation_link, data) {
    try {
        const response = await fetch(`${host}/api/v1/regular_user/${invitation_link}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 200) {
            const errorData = await response.json();
            console.log(errorData);
            return { errors: errorData };
        }

        return response.status;
    } catch (error) {
        return 404
    }
} 
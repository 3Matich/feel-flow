import { saveAuthData } from "@/services/session";
import { host } from "@/configs";

export async function validateLogin(user, pw) {
    const body = {
        username: user,
        password: pw,
    };

    try {
        const response = await fetch(`${host}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en la solicitud");
        }

        const data = await response.json();
        saveAuthData(data.token, data.username);
        return response.status;
    } catch (error) {
        throw new Error(error.message || "Error al comunicarse con el servidor");
    }
};

/*
Retorna 200 -> Autenticado
Retorna 401 -> Credenciales erróneas
Retorna 500 -> Error desconocido
*/
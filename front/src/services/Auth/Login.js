import { saveAuthData } from "../session";

export const login = async (user, pw) => {
    const body = {
        username: user,
        password: pw,
    };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            // Maneja errores HTTP
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en la solicitud");
        }

        const data = await response.json();
        saveAuthData(data.token, data.username);
        return data; // Devuelve la respuesta del backend (por ejemplo, el token)
    } catch (error) {
        // Manejo de errores de red o de la API
        throw new Error(error.message || "Error al comunicarse con el servidor");
    }
};

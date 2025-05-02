import { host } from "@/configs";

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
        console.warn("hola")
        console.log(error.message);
        throw new Error(error.message || "Error al comunicarse con el servidor");
    }
} 
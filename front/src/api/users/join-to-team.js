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

        if (response.status !== 201) {
            const errorData = await response.json();
            return { errors: errorData };
        }

        return response.status;
    } catch (error) {
        throw new Error(error.message || "Error al comunicarse con el servidor");
    }
} 
import { host } from "@/configs";


export async function SignUpAdmin(body) {

    try {
        const response = await fetch(`${host}/api/v1/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (response.status !== 201) {
            const errorData = await response.json();
            return { errors: errorData };
        }

        return response.status;
    } catch (error) {
        return { errors: { general: "Error de red o servidor." } };
    }
}

export async function Logueado(id, token) {
    try {
        const url = `http://localhost:8080/api/v1/user/${id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during the fetch:", error);
        return false;
    }
}
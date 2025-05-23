import { host } from "@/configs";
import { getAuthData } from "@/services/session";

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

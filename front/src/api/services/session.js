import { getUser } from "@/api";

const saveUserData = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));

    sessionStorage.setItem("userID", decodedPayload.id);
    sessionStorage.setItem("isAdmin", decodedPayload.isAdmin);
    sessionStorage.setItem("authority", JSON.parse(decodedPayload.authorities)[0].authority);
}

export const saveAuthData = (token, username) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);    
    saveUserData(token);
};

export const getAuthData = () => {
    const token = sessionStorage.getItem("token");
    // const username = sessionStorage.getItem("username");
    return { token };
};

export const getUserData = () => {
    const username = sessionStorage.getItem("username");
    const authUserID = sessionStorage.getItem("userID");
    const isAdmin = sessionStorage.getItem("isAdmin");
    const authority = sessionStorage.getItem("authority");
    return { username, authUserID, isAdmin, authority }
}

export const clearAuthData = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("authority");
};
/* 
export const validateToken = async (onLogout) => {
    const { authUserID } = await getUserData();
    try {
        const session = await getUser(authUserID);

        if (session === "El token JWT no es valido") {
            onLogout();
        }

    } catch (error) {
        console.error("Error en sessionTimeLife:", error);
    }
};
*/
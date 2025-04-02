import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ProfileBanner from "../components/ProfileBanner";
import ProfileCard from "../components/ProfileCard";
import ProfileDetails from "../components/ProfileDetails";
import { getUser } from "../services/Users/GetUser";
import { getUserData } from "../services/session";  // Para obtener el userID desde el sessionStorage

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            const { authUserID } = getUserData();  // Obtener el userID desde sessionStorage

            try {
                const data = await getUser(authUserID);  // Obtener los datos del perfil usando getUser
                console.log("Datos del perfil:", data);  // Verifica los datos recibidos

                if (typeof data === "string") {
                    setError(data);  // Si es un error, muestra el mensaje
                } else {
                    setProfile(data);  // Establece los datos del perfil
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos del perfil:", error);
                setError(`Error al obtener los datos del perfil: ${error.message || error}`);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);  // Este efecto se ejecutará una sola vez al montar el componente

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Perfil | Feel Flow</title>
            </Helmet>

            <div className="space-y-8">
                <ProfileBanner />

                {/* Mostrar datos del perfil si están disponibles */}
                {profile && (
                    <>
                        <ProfileCard user={profile} />
                        <ProfileDetails user={profile} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;

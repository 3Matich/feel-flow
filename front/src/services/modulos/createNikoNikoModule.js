import { getAuthData } from "@/services/session";

export const createNikoNikoModule = async (payload) => {
    const { token } = getAuthData();
    console.log("📡 Enviando módulo Niko Niko →", payload);

    try {
        const response = await fetch("http://localhost:8080/api/v1/niko_niko", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("❌ Error creando módulo Niko Niko:", error.errorMessage);
            throw new Error(error.errorMessage || "Error al crear módulo");
        }

        const data = await response.json();
        console.log("✅ Módulo Niko Niko creado:", data);
        return data;
    } catch (error) {
        console.error("❌ Error de red en Niko Niko:", error);
        throw error;
    }
};

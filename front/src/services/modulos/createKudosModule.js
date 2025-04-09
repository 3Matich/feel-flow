import { getAuthData } from "@/services/session";

export async function createKudosModule({ idTeam, dateAndTimeToPublish, dateAndTimeToClose }) {
  const { token } = getAuthData();

  try {
    const response = await fetch("http://localhost:8080/api/v1/kudos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idTeam,
        dateAndTimeToPublish,
        dateAndTimeToClose,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = "Error al crear el módulo de Kudos";

      try {
        const parsed = JSON.parse(text);
        errorMessage = parsed?.errorMessage || errorMessage;
      } catch (err) {
        console.warn("⚠️ Respuesta no JSON:", text);
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    console.error("❌ Error creando módulo Kudos:", err);
    throw err;
  }
}

import { getAuthData } from "@/services/session";

export async function createTwelveStepsModule({ idTeam, dateAndTimeToPublish, dateAndTimeToClose }) {
  const { token } = getAuthData();

  try {
    const response = await fetch("http://localhost:8080/api/v1/twelve_steps_modules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idTeam,
        idPoolQuestion: 1,
        dateAndTimeToPublish,
        dateAndTimeToClose,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = "Error al crear el módulo";

      try {
        const parsed = JSON.parse(text);
        errorMessage = parsed?.errorMessage || errorMessage;
      } catch (err) {
        console.warn("⚠️ Respuesta vacía o inválida:", text);
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err) {
    console.error("❌ Error creando módulo 12 pasos:", err);
    throw err;
  }
}

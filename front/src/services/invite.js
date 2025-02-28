import Swal from "sweetalert2";

/**
 * Genera una invitación para un equipo.
 * @param {string} token - El token de autenticación.
 * @param {string} teamId - El UUID del equipo.
 * @returns {Promise<string>} - Devuelve el enlace de invitación.
 */
export const invite = async (token, teamId) => {
  if (!token) {
    throw new Error("Token no proporcionado.");
  }

  if (!teamId) {
    throw new Error("ID del equipo no proporcionado.");
  }

  try {
    const url = `http://localhost:8080/api/v1/team/${teamId}/invite`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al invitar al equipo: ${response.status}`);
    }

    const data = await response.json();
    const inviteUuid = data.uuid;
    const inviteLink = `http://localhost:3000/register?invite=${inviteUuid}`;

    // Mostrar popup de SweetAlert
    Swal.fire({
      title: "Invitación generada",
      html: `
        <p><strong>Link de Invitación:</strong></p>
        <a href="${inviteLink}" target="_blank">${inviteLink}</a>
      `,
      showCancelButton: true,
      confirmButtonText: "Copiar link",
      cancelButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(inviteLink)
          .then(() => {
            Swal.fire("Copiado", "El enlace ha sido copiado al portapapeles.", "success");
          })
          .catch((error) => {
            console.error("Error al copiar el enlace:", error);
            Swal.fire("Error", "No se pudo copiar el enlace.", "error");
          });
      }
    });

    return inviteLink;
  } catch (error) {
    console.error("Error en la función invite:", error);
    Swal.fire("Error", "No se pudo generar la invitación.", "error");
    throw error;
  }
};

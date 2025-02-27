import React from "react";
import Swal from "sweetalert2";
import { invite } from "../services/invite";
import Banner from '../assets/img/banner.jpg';

const TeamBanner = ({ bannerUrl = Banner, name, uuid, onEdit }) => {
  const handleInviteMember = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Error",
        text: "No se encontró el token. Por favor, inicia sesión.",
        icon: "error",
        confirmButtonColor: "#3b82f6", // Azul primario
      });
      return;
    }

    if (!uuid) {
      Swal.fire({
        title: "Error",
        text: "No se encontró el UUID del equipo. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonColor: "#3b82f6", // Azul primario
      });
      return;
    }

    try {
      const inviteLink = await invite(token, uuid);

      Swal.fire({
        html: `
          <p class="text-gray-800 font-semibold mb-2">Enlace de Invitación:</p>
          <a href="${inviteLink}" target="_blank" class="text-blue-500 underline">${inviteLink}</a>
        `,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Copiar link",
        cancelButtonText: "Cerrar",
        confirmButtonColor: "#3b82f6", // Azul primario
        cancelButtonColor: "#ef4444", // Rojo de Tailwind
      }).then((result) => {
        if (result.isConfirmed) {
          navigator.clipboard.writeText(inviteLink)
            .then(() => {
              Swal.fire({
                title: "Copiado",
                text: "El enlace ha sido copiado al portapapeles.",
                icon: "success",
                confirmButtonColor: "#3b82f6", // Azul primario
              });
            })
            .catch(() => {
              Swal.fire({
                title: "Error",
                text: "No se pudo copiar el enlace.",
                icon: "error",
                confirmButtonColor: "#3b82f6", // Azul primario
              });
            });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo generar el enlace de invitación.",
        icon: "error",
        confirmButtonColor: "#3b82f6", // Azul primario
      });
    }
  };

  return (
    <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
      <img
        src={bannerUrl}
        alt="Team Banner"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-6">
        <h1 className="text-3xl font-bold text-white">{name || "Nombre del Equipo"}</h1>
        <div className="space-y-4 flex flex-col items-end">
          <button
            onClick={handleInviteMember}
            className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 w-32"
          >
            Invitar Miembro
          </button>
          <button
            onClick={onEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-32"
          >
            Editar
          </button>
          <button
            onClick={() => console.log("Eliminar equipo")}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-32"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamBanner;

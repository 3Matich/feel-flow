import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import Profile from "../assets/img/profile.jpg";
import EditProfile from "../pages/EditProfile.jsx"; // Importa tu componente de edición
import Popup from "../components/PopupEditProfile"; // Componente reutilizable de Popup

function ProfileCard({ user, token }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="relative -mt-20 mx-auto w-11/12 max-w-4xl bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
      {/* Imagen de Perfil */}
      <img
        src={Profile}
        alt="Avatar"
        className="w-24 h-24 rounded-full shadow-md border-4 border-white"
      />

      {/* Información del Usuario */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>

      {/* Botón de Editar */}
      <button
        onClick={openPopup}
        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
      >
        <FaUserEdit />
        <span>Editar Perfil</span>
      </button>

      {/* Popup */}
      <Popup
        isOpen={isPopupOpen}
        title="Editar Perfil"
        buttons={[
          {
            label: "Cerrar",
            onClick: closePopup,
            color: "red",
          },
        ]}
      >
        <EditProfile userId={user.id} token={token} />
      </Popup>
    </div>
  );
}

export default ProfileCard;

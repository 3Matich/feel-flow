import React from "react";
import { FaUser } from "react-icons/fa";

function ProfileDetails({ user }) {
    return (
        <div className="mx-auto w-11/12 max-w-4xl bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <FaUser />
                <span>Información del Perfil</span>
            </h2>

            <div className="space-y-2">
                <p>
                    <span className="font-semibold text-gray-700">Nombre:</span> {user.name}
                </p>
                <p>
                    <span className="font-semibold text-gray-700">Apellido:</span> {user.surname}
                </p>
                <p>
                    <span className="font-semibold text-gray-700">Correo:</span> {user.username}
                </p>
                <p>
                    <span className="font-semibold text-gray-700">Empresa:</span> {user.enterpriseName || 'No disponible'}
                </p>
                <p>
                    <span className="font-semibold text-gray-700">ID de Empresa:</span> {user.enterpriseID || 'No disponible'}
                </p>
                <p>
                    <span className="font-semibold text-gray-700">ID de Usuario:</span> {user.userID || 'No disponible'}
                </p>
            </div>
        </div>
    );
}

export default ProfileDetails;

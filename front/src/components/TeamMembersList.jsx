import React from "react";

const TeamMembersList = ({ members = [] }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Miembros del Equipo</h3>
      {members.length > 0 ? (
        <div className="space-y-2">
          {members.map((member, index) => (
            <div
              key={index}
              className="text-lg text-gray-700 flex items-center space-x-2"
            >
              <span className="font-medium">{member.name || "Nombre no disponible"}</span>
              <span>{member.surname || "Apellido no disponible"}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">No hay miembros en este equipo.</p>
      )}
    </div>
  );
};

export default TeamMembersList;

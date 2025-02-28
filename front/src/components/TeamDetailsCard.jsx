import React from "react";

const TeamDetailsCard = ({ description, leader }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Detalles del Equipo</h2>
      <p className="text-lg mb-2">
        <strong>Descripción:</strong> {description || "Sin descripción."}
      </p>
      <p className="text-lg">
        <strong>Líder del Equipo:</strong> {leader || "No asignado."}
      </p>
    </div>
  );
};

export default TeamDetailsCard;

// components/PodiumChart.jsx
import React, { useEffect } from 'react';

const PodiumChart = ({ data }) => {
  // Lista de premios que se deben mostrar en el chart
  const prizes = ["Manos Amigas", "Resolutor Estrella", "Energía Positiva", "Maestro del Detalle"];
  
  // Íconos para cada premio, respetando la estética original
  const icons = {
    "Manos Amigas": "/icons/kudos_Manos_Amigas.svg",
    "Resolutor Estrella": "/icons/Kudos_Resolutor_Estrella.svg",
    "Energía Positiva": "/icons/Kudos_Energia_Positiva.svg",
    "Maestro del Detalle": "/icons/Kudos_Maestro_Del_detalle.svg"
  };

  // Colores utilizados (se mantienen según el original)
  const colors = ["bg-blue-200", "bg-yellow-200", "bg-gray-200", "bg-orange-200", "bg-transparent"];

  // Mapeo para transformar los badgeName recibidos a los nombres esperados por la UI.
  const badgeMapping = {
    "MANOS_AMIGAS": "Manos Amigas",
    "RESOLUTOR_ESTRELLA": "Resolutor Estrella",
    "ENERGIA_POSITIVA": "Energía Positiva",
    "MAESTRO_DEL_DETALLE": "Maestro del Detalle"
  };

  // Convertir el array de data en un objeto que asocia cada premio con su número de badges.
  // La data recibida es un array de objetos: { badgeName, numberOfBadges }
  const counts = {};
  prizes.forEach((prize) => {
    counts[prize] = 0;
  });
  data.forEach((item) => {
    const mappedName = badgeMapping[item.badgeName] ;
    if (counts.hasOwnProperty(mappedName)) {
      counts[mappedName] = item.numberOfBadges;
    }
  });
  
  // Función para asignar colores basada en el ranking de los counts.
  const assignColors = (counts) => {
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    const colorMapping = {};

    let rank = 0;
    let previousCount = null;

    sorted.forEach(([key, count], index) => {
      if (count !== previousCount) {
        rank = index;
      }
      previousCount = count;

      if (rank === 0) colorMapping[key] = colors[0];
      else if (rank === 1) colorMapping[key] = colors[1];
      else if (rank === 2) colorMapping[key] = colors[2];
      else if (rank === 3) colorMapping[key] = colors[3];
      else colorMapping[key] = colors[4];
    });

    return colorMapping;
  };

  const colorMapping = assignColors(counts);
  return (
    <div className="grid grid-cols-4 gap-8 h-80">
      {prizes.map((prize) => (
        <div
          key={prize}
          className={`flex flex-col items-center justify-center rounded-lg shadow-lg p-4 hover:scale-105 transform transition-transform ${colorMapping[prize] || colors[4]}`}
        >
          {/* Ícono SVG */}
          <img
            src={icons[prize]}
            alt={prize}
            className="w-28 h-28 mb-2"
          />
          <p className="font-bold text-center">{prize}</p>
          <p className="text-center text-sm">{counts[prize] || 0} kudos</p>
        </div>
      ))}
    </div>
  );
};

export default PodiumChart;

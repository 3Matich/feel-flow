import React from 'react';

const PodiumChart = ({ data }) => {
  const prizes = ["Manos Amigas", "Resolutor Estrella", "Energía Positiva", "Maestro del Detalle"];

  const icons = {
    "Manos Amigas": "/icons/kudos_Manos_Amigas.svg",
    "Resolutor Estrella": "/icons/Kudos_Resolutor_Estrella.svg",
    "Energía Positiva": "/icons/Kudos_Energia_Positiva.svg",
    "Maestro del Detalle": "/icons/Kudos_Maestro_Del_detalle.svg"
  };

  const colors = ["bg-blue-200", "bg-yellow-200", "bg-gray-200", "bg-orange-200", "bg-transparent"];

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

  const colorMapping = assignColors(data);

  return (
    <div className="grid grid-cols-4 gap-8 h-80 bg-gray-100 rounded-lg shadow-md relative">
      {prizes.map((prize) => (
        <div
          key={prize}
          className={`flex flex-col items-center justify-center rounded-lg shadow-lg p-4 hover:scale-105 transform transition-transform ${colorMapping[prize] || colors[4]}`}
        >
          {/* SVG más grande y sin fondo blanco */}
          <img
            src={icons[prize]}
            alt={prize}
            className="w-28 h-28 mb-2"
          />
          <p className="text-gray-700 font-bold text-center">{prize}</p>
          <p className="text-gray-700 text-center text-sm">{data[prize] || 0} kudos</p>
        </div>
      ))}
    </div>
  );
};

export default PodiumChart;

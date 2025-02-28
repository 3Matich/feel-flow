import React from 'react';

const PodiumChart = ({ data }) => {
  const prizes = ["Manos Amigas", "Resolutor Estrella", "Energía Positiva", "Maestro del Detalle"];
  const symbols = { "Manos Amigas": "🤝", "Resolutor Estrella": "⭐", "Energía Positiva": "😊", "Maestro del Detalle": "🔍" };
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

      if (rank === 0) colorMapping[key] = colors[0]; // Diamante
      else if (rank === 1) colorMapping[key] = colors[1]; // Oro
      else if (rank === 2) colorMapping[key] = colors[2]; // Plata
      else if (rank === 3) colorMapping[key] = colors[3]; // Bronce
      else colorMapping[key] = colors[4]; // Sin premio
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
          <div className="flex justify-center items-center w-16 h-16 rounded-full border-2 border-gray-400 hover:shadow-md">
            <span className="text-4xl text-gray-700">{symbols[prize]}</span>
          </div>
          <p className="text-gray-700 font-bold text-center mt-4">{prize}</p>
          <p className="text-gray-700 text-center text-sm">{data[prize] || 0} premios</p>
        </div>
      ))}
    </div>
  );
};

export default PodiumChart;

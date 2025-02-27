import React from "react";

function NikoNikoTable({ teamMembers, nikoData }) {
  const getFaceWithColor = (value) => {
    // Rutas de los íconos para cada estado de ánimo
    const moodIcons = [
      "/public/icons/1_mood_w.svg",   // Muy Feliz
      // "/public/icons/2_mood_w.svg",   // Feliz
      // "/public/icons/b_p_mood_w.svg", // No tan bien
      "/public/icons/n_mood_w.svg",   // Neutral
      // "/public/icons/-1_mood_w.svg",  // Triste
      "/public/icons/-2_mood_w.svg"   // Muy Triste
    ];

    // Colores correspondientes a cada estado de ánimo
    const moodColors = [
      "bg-green-500",  // Muy Feliz
      // "bg-green-400",  // Feliz
      // "bg-yellow-400", // No tan bien
      "bg-gray-400",   // Neutral
      // "bg-yellow-600", // Triste
      "bg-red-500"     // Muy Triste
    ];

    return (
      <div
        className={`${moodColors[value - 1]} w-12 h-12 rounded-full flex items-center justify-center`}
      >
        <img
          src={moodIcons[value - 1]}
          alt={`Mood ${value}`}
          className="w-10 h-10"
        />
      </div>
    );
  };

  return (
    <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow-lg p-6">
      <table className="min-w-full text-sm table-auto border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-gray-600 font-semibold text-center">
              Miembro / Día
            </th>
            {Array.from({ length: 30 }, (_, i) => (
              <th key={i} className="px-4 py-2 text-gray-600 text-center">
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member} className="border-b">
              <td className="px-6 py-4 font-medium text-gray-700 text-center">
                {member}
              </td>
              {nikoData[member]?.map((value, i) => (
                <td key={i} className="px-4 py-2 text-center">
                  {getFaceWithColor(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NikoNikoTable;

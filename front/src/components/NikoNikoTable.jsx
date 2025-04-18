import React, { useState } from "react";

function NikoNikoTable({ teamMembers, nikoData }) {
  const [dayPage, setDayPage] = useState(0);

  const membersPerPage = 7;
  const daysPerPage = 7;

  const currentMembers = teamMembers.slice(0, membersPerPage); // Solo los primeros 7
  const totalDayPages = Math.ceil(30 / daysPerPage);

  const currentDays = Array.from({ length: 30 }, (_, i) => i + 1).slice(
    dayPage * daysPerPage,
    dayPage * daysPerPage + daysPerPage
  );

  const getFaceWithColor = (value) => {
    const moodIcons = [
      "/icons/1_mood_w.svg",   // Muy feliz
      "/icons/n_mood_w.svg",   // Neutral
      "/icons/-2_mood_w.svg"   // Muy triste
    ];

    const moodColors = [
      "bg-green-500",
      "bg-gray-400",
      "bg-red-500"
    ];

    const index = value === 1 ? 0 : value === 2 ? 1 : 2;

    return (
      <div className={`${moodColors[index]} w-10 h-10 rounded-full flex items-center justify-center mx-auto`}>
        <img src={moodIcons[index]} alt={`Mood ${value}`} className="w-8 h-8" />
      </div>
    );
  };

  return (
    <div className="mt-4 rounded-lg shadow-lg">
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="table-header">
            <th className="px-4 py-3 table-header-cell text-center w-32">
              Miembro
            </th>
            {currentDays.map((day) => (
              <th key={day} className="px-2 py-2 table-header-cell text-center w-12">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member} className="border table-body">
              <td className="px-4 py-2 table-body-cell text-center font-bold">
                {member}
              </td>
              {currentDays.map((dayIndex) => (
                <td key={dayIndex} className="px-2 py-1 text-center align-middle table-body-cell">
                  {getFaceWithColor(nikoData[member]?.[dayIndex - 1])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Flechas de navegación centradas */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setDayPage((prev) => Math.max(prev - 1, 0))}
          disabled={dayPage === 0}
          className="w-9 h-9 rounded-full bg-pink-400 text-white hover:bg-pink-700 font-bold disabled:opacity-50 text-lg"
        >
          ←
        </button>
        <button
          onClick={() => setDayPage((prev) => Math.min(prev + 1, totalDayPages - 1))}
          disabled={dayPage === totalDayPages - 1}
          className="w-9 h-9 rounded-full bg-pink-400 text-white hover:bg-pink-700 font-bold disabled:opacity-50 text-lg"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default NikoNikoTable;

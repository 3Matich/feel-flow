import React, { useState } from "react";

function NikoNikoTable({ nikoDataByMember }) {
  const TOTAL_DAYS = 30;
  const daysPerPage = 7;
  const [dayPage, setDayPage] = useState(0);

  const members = Object.keys(nikoDataByMember);
  const allDays = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);
  const totalDayPages = Math.ceil(TOTAL_DAYS / daysPerPage);
  const currentDays = allDays.slice(
    dayPage * daysPerPage,
    dayPage * daysPerPage + daysPerPage
  );

  const getFaceWithColor = (response) => {
    if (!response) {
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
          <span className="text-xs text-gray-400">-</span>
        </div>
      );
    }

    const normalized = response.toLowerCase();

    const moodMap = {
      "muy bien": {
        icon: "/public/icons/1_mood_w.svg",
        color: "bg-green-500"
      },
      "bien": {
        icon: "/public/icons/2_mood_w.svg",
        color: "bg-green-200"
      },
      "normal": {
        icon: "/public/icons/n_mood_w.svg",
        color: "bg-gray-300"
      },
      "mal": {
        icon: "/public/icons/-1_mood_w.svg",
        color: "bg-orange-400"
      },
      "muy mal": {
        icon: "/public/icons/-2_mood_w.svg",
        color: "bg-red-500"
      }
    };

    const mood = moodMap[normalized];
    if (!mood) return null;

    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${mood.color}`}>
        <img src={mood.icon} alt={normalized} className="w-5 h-5" />
      </div>
    );
  };

  const getDayData = (member, dayNumber) => {
    const dayInfo = nikoDataByMember[member]?.find(
      (item) => item.numberOfDay === dayNumber
    );
    if (!dayInfo) return null;

    return {
      start: dayInfo.responseStartOfDay,
      end: dayInfo.responseEndOfDay
    };
  };

  return (
    <div className="mt-4 rounded-lg shadow-lg">
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="table-header">
            <th className="px-4 py-3 table-header-cell text-center w-32">
              Miembro
            </th>
            <th className="px-2 py-3 text-gray-600 font-semibold text-center w-20">
              Jornada
            </th>
            {currentDays.map((day) => (
              <th key={day} className="px-2 py-2 table-header-cell text-center w-12">
                Día {day}
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
          {members.map((member) => (
            <tr key={member} className="border table-body">
              <td className="px-2 py-2 table-body-cell text-center align-middle">
                {member.split(" ")[0].toUpperCase()}
              </td>
              <td className="px-2 py-1 text-center align-middle table-body-cell">
                <div className="flex flex-col items-center gap-1 leading-tight">
                  <span className="text-[10px]">Comienzo</span>
                  <span className="text-[10px]">Fin</span>
                </div>
              </td>
              {currentDays.map((dayNumber) => {
                const dayData = getDayData(member, dayNumber);
                return (
                  <td key={dayNumber} className="px-2 py-1 text-center align-middle">
                    {dayData ? (
                      <div className="flex flex-col items-center gap-1">
                        {getFaceWithColor(dayData.start)}
                        {getFaceWithColor(dayData.end)}
                      </div>
                    ) : (
                      <div className="text-sm">No data</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navegación de días */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setDayPage((prev) => Math.max(prev - 1, 0))}
          disabled={dayPage === 0}
          className="w-9 h-9 rounded-full bg-pink-400 text-white hover:bg-pink-700 font-bold disabled:opacity-50 text-lg"
        >
          ←
        </button>
        <button
          onClick={() =>
            setDayPage((prev) => Math.min(prev + 1, totalDayPages - 1))
          }
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

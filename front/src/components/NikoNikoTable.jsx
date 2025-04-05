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
    <div className="mt-4 bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
      <table className="w-full text-sm table-auto border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-3 text-gray-600 font-semibold text-center w-32">
              Miembro
            </th>
            <th className="px-2 py-3 text-gray-600 font-semibold text-center w-20">
              Jornada
            </th>
            {currentDays.map((day) => (
              <th
                key={day}
                className="px-2 py-2 text-gray-600 text-center w-20"
              >
                Día {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member} className="border-b">
              <td className="px-2 py-2 font-medium text-gray-700 text-center align-middle">
                {member.split(" ")[0].toUpperCase()}
              </td>
              <td className="px-2 py-2 text-xs text-gray-500 text-center align-middle">
                <div className="flex flex-col items-center gap-1 leading-tight">
                  <span className="text-[10px] text-gray-500">Comienzo</span>
                  <span className="text-[10px] text-gray-500">Fin</span>
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
                      <div className="text-sm text-gray-400">No data</div>
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
          className="w-9 h-9 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 text-lg"
        >
          ←
        </button>
        <button
          onClick={() =>
            setDayPage((prev) => Math.min(prev + 1, totalDayPages - 1))
          }
          disabled={dayPage === totalDayPages - 1}
          className="w-9 h-9 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 text-lg"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default NikoNikoTable;

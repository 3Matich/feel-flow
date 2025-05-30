import React, { useState, useEffect } from "react";

export function NikoNikoTable({ nikoDataByMember, selectedMonth }) {
  const WEEKDAYS_LABELS = ["LUN", "MAR", "MIE", "JUE", "VIE"];
  const currentYear = new Date().getFullYear();
  const monthIndex = (selectedMonth >= 1 && selectedMonth <= 12) ? selectedMonth - 1 : new Date().getMonth();

  const getBusinessDaysWithPadding = () => {
    const businessDays = [];
    const totalDaysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = new Date(currentYear, monthIndex, day);
      const dayOfWeek = date.getDay(); // 0=domingo, 1=lunes, ..., 6=sábado
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        businessDays.push({ number: day, dayOfWeek });
      }
    }

    // Padding inicial: solo si el primer día hábil no es lunes
    const paddedDays = [...businessDays];
    if (paddedDays.length > 0) {
      const firstDay = paddedDays[0];
      const startPadding = firstDay.dayOfWeek - 1; // 1 (lunes) -> 0, 2 (martes) -> 1, ...
      for (let i = 0; i < startPadding; i++) {
        paddedDays.unshift(null);
      }
    }

    // Padding final: completar última fila de 5 columnas
    const remainder = paddedDays.length % 5;
    if (remainder !== 0) {
      const endPadding = 5 - remainder;
      for (let i = 0; i < endPadding; i++) {
        paddedDays.push(null);
      }
    }

    return paddedDays;
  };

  const generateWeeks = () => {
    const businessDays = getBusinessDaysWithPadding();
    const weeks = [];

    for (let i = 0; i < businessDays.length; i += 5) {
      weeks.push(businessDays.slice(i, i + 5));
    }

    return weeks;
  };

  const weeks = generateWeeks();
  const [page, setPage] = useState(0);
  const currentWeek = weeks[page] || new Array(5).fill(null);
  const members = Object.keys(nikoDataByMember);

  useEffect(() => {
    setPage(0);
  }, [selectedMonth]);

  const getDayData = (member, dayNumber) => {
    if (!dayNumber) return null;
    const dayInfo = nikoDataByMember[member]?.find(item => item.numberOfDay === dayNumber);
    if (!dayInfo) return null;
    return {
      start: dayInfo.responseStartOfDay,
      end: dayInfo.responseEndOfDay,
    };
  };

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
      "muy bien": { icon: "/public/icons/1_mood_w.svg", color: "bg-green-500" },
      "bien": { icon: "/public/icons/2_mood_w.svg", color: "bg-green-200" },
      "normal": { icon: "/public/icons/n_mood_w.svg", color: "bg-gray-300" },
      "mal": { icon: "/public/icons/-1_mood_w.svg", color: "bg-orange-400" },
      "muy mal": { icon: "/public/icons/-2_mood_w.svg", color: "bg-red-500" },
    };

    const mood = moodMap[normalized];
    if (!mood) return null;

    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${mood.color}`}>
        <img src={mood.icon} alt={normalized} className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="mt-4 p-6 overflow-x-auto">
      <table className="w-full text-sm table-auto border-separate border-spacing-0">
        <thead>
          <tr className="table-header">
            <th className="px-2 py-3 table-header-cell text-center w-32">Miembro</th>
            <th className="px-2 py-3 table-header-cell text-center w-20">Jornada</th>
            {WEEKDAYS_LABELS.map((label, idx) => (
              <th key={idx} className="px-2 py-2 text-center table-header-cell w-20">
                {label}
                <br />
                {currentWeek[idx]?.number ?? ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member} className="border-b table-body">
              <td className="px-2 py-2 table-body-cell text-center align-middle">
                {member.split(" ")[0].toUpperCase()}
              </td>
              <td className="px-2 py-2 text-xs table-body-cell text-center align-middle">
                <div className="flex flex-col items-center gap-1 leading-tight">
                  <span className="text-[10px]">Comienzo</span>
                  <span className="text-[10px]">Fin</span>
                </div>
              </td>
              {currentWeek.map((day, idx) => {
                const dayData = getDayData(member, day?.number);
                return (
                  <td key={idx} className="px-2 py-1 text-center align-middle">
                    {dayData ? (
                      <div className="flex flex-col items-center gap-1">
                        {getFaceWithColor(dayData.start)}
                        {getFaceWithColor(dayData.end)}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">-</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navegación entre semanas */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="w-9 h-9 rounded-full bg-pink-400 text-white hover:bg-pink-700 font-bold disabled:opacity-50 text-lg"
        >
          ←
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= weeks.length - 1}
          className="w-9 h-9 rounded-full bg-pink-400 text-white hover:bg-pink-700 font-bold disabled:opacity-50 text-lg"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default NikoNikoTable;

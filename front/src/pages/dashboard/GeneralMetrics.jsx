import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const statisticsCardsData = [
  { title: "Estado Emocional Promedio", value: "Positivo", icon: ArrowUpIcon },
  { title: "Felicidad General", value: "78%", icon: ArrowUpIcon },
  { title: "Kudos Enviados", value: "45", icon: ArrowUpIcon },
  { title: "Participación en Módulos", value: "85%", icon: ArrowUpIcon },
];

export function GeneralMetrics() {
  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {statisticsCardsData.map(({ icon, title, value }) => (
        <div key={title} className="p-4 shadow-md rounded-lg flex items-center gap-4 border card">
          <div className="flex items-center justify-center w-12 h-12 rounded-full">
            {React.createElement(icon, {
              className: "w-6 h-6",
            })}
          </div>
          <div>
            <h5 className="text-sm">{title}</h5>
            <p className="text-lg">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GeneralMetrics;
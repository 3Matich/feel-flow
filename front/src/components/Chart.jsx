import React from "react";
import { TOPICS } from "./topics"; // Importa desde topics.js

export const renderChart = (data) => {
  return (
    <div className="flex items-end justify-between h-64 gap-2">
      {data.map((value, index) => {
        const numericValue = typeof value === "number" ? value : 0;
        return (
          <div key={index} className="flex flex-col items-center w-1/12">
            <div
              className="relative w-8 h-48 bg-gray-200 rounded-md overflow-hidden flex justify-center"
              title={TOPICS[index].name}
            >
              <div
                className="absolute bottom-0 left-0 bg-blue-500 rounded-md"
                style={{ height: `${Math.max((numericValue / 5) * 100, 10)}%`, width: "100%" }}
              ></div>
            </div>
            <span className="mt-2 text-xl" role="img" aria-label={TOPICS[index].name}>
              {TOPICS[index].icon}
            </span>
            <p className="mt-1 text-sm text-gray-600">{numericValue.toFixed(2)}</p>
            <p className="text-xs text-center mt-1 text-gray-800">{TOPICS[index].name}</p>
          </div>
        );
      })}
    </div>
  );
};

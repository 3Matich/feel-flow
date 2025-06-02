// components/Chart.js
import React from "react";
import { motion } from "framer-motion";
import { TOPICS } from "./topics";

export const renderChart = (data) => {
  return (
    <div className="relative flex items-end justify-between h-64 gap-2 overflow-visible">
      {data.map((item, index) => {
        const numericValue =
          typeof item.average === "number" ? item.average : 0;
        // Buscamos en TOPICS el tema que corresponde al categoryName; si no se encuentra, usamos un fallback
        const topic =
          TOPICS.find((t) => t.name === item.categoryName) || {
            icon: "",
            name: item.categoryName,
          };

        // Si tus íconos están en la carpeta public, la ruta se debe referenciar sin '/public'
        const iconSrc =
          topic.icon.startsWith("/public/")
            ? topic.icon.replace("/public", "")
            : topic.icon;

        return (
          <div
            key={index}
            className="flex flex-col items-center w-1/12 relative group overflow-visible"
          >
            {/* Contenedor de la barra */}
            <div className="relative w-8 h-48 bg-gray-200 rounded-md flex justify-center">
              <motion.div
                className="absolute bottom-0 left-0 w-full rounded-md group-hover:z-40"
                style={{
                  height: `${Math.max((numericValue / 5) * 100, 10)}%`,
                  backgroundColor: "#3498db",
                }}
                whileHover={{
                  scaleY: 1.1,
                  scaleX: 1.05,
                  backgroundColor: "#2980b9",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Tooltip posicionado arriba */}
                <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-50">
                  <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-md opacity-95">
                    {numericValue.toFixed(2)}
                  </div>
                  <div className="w-2 h-2 bg-gray-800 rotate-45 mt-[-2px]" />
                </div>
              </motion.div>
            </div>

            {/* Ícono SVG */}
            {iconSrc && (
              <img
                src={iconSrc}
                alt={topic.name}
                className="mt-1 w-14 h-14"
                title={topic.name}
              />
            )}

            {/* Nombre del tópico */}
            <p className="text-xs text-center mt-1 text-gray-800 h-10 overflow-hidden">
              {topic.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

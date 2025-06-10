// components/HappinessChart.jsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { renderChart } from "../components/Chart";

function HappinessChart({
  teamData,
  modulesData,
  memberOptions,
  selectedMember,
  setSelectedMember,
  selectedModule,
  setSelectedModule,
  selectedData,
}) {
  // Generamos opciones de módulos en base a la fecha de publicación
  const moduleOptions = modulesData.map((moduleItem) => {
    const dateStr = new Date(
      moduleItem.moduleDto.dateAndTimeToPublish
    ).toLocaleDateString();
    return {
      label: dateStr,
      value: moduleItem.moduleDto.id,
    };
  });

  return (
    <div className="rounded-lg shadow-lg card relative">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-12 py-4 gap-4">
        <Autocomplete
          options={moduleOptions}
          value={
            selectedModule
              ? moduleOptions.find((o) => o.value === selectedModule)
              : null
          }
          onChange={(e, v) => setSelectedModule(v ? v.value : "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Fecha del Módulo"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "pink" }}
            />
          )}
        />

        <Autocomplete
          options={memberOptions}
          value={
            selectedMember
              ? memberOptions.find((o) => o.value === selectedMember)
              : null
          }
          onChange={(e, v) => setSelectedMember(v ? v.value : "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Miembros"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "pink" }}
            />
          )}
        />
      </div>

      {/* Contenedor scrollable para los charts */}
      <div className="mt-20 px-4 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {/*
            renderChart devuelve el elemento <canvas> o SVG.
            Al envolverlo en este flex con min-w-max, 
            forzamos que su ancho sea el natural y permitimos scroll.
          */}
          {renderChart(selectedData)}
        </div>
      </div>
    </div>
  );
}

export default HappinessChart;

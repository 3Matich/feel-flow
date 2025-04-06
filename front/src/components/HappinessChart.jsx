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
    const dateStr = new Date(moduleItem.moduleDto.dateAndTimeToPublish).toLocaleDateString();
    return {
      label: dateStr,
      value: moduleItem.moduleDto.id,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10 relative">
      <h1 className="text-2xl font-bold text-center mb-10">
        12 pasos de la felicidad - {teamData.teamName}
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center mb-12 gap-4">
        {/* Autocomplete para seleccionar módulo (fecha) */}
        <Autocomplete
          options={moduleOptions}
          value={
            selectedModule
              ? moduleOptions.find((option) => option.value === selectedModule)
              : null
          }
          onChange={(event, newValue) =>
            setSelectedModule(newValue ? newValue.value : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Fecha del Módulo"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "white" }}
            />
          )}
        />

        {/* Autocomplete para seleccionar miembro (usuario) */}
        <Autocomplete
          options={memberOptions}
          value={
            selectedMember
              ? memberOptions.find((option) => option.value === selectedMember)
              : null
          }
          onChange={(event, newValue) =>
            setSelectedMember(newValue ? newValue.value : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona Miembro"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "white" }}
            />
          )}
        />
      </div>

      {/* Se usa 'selectedData' => array de { categoryName, average } */}
      <div className="mt-16 pb-16">
        {renderChart(selectedData)}
      </div>
    </div>
  );
}

export default HappinessChart;

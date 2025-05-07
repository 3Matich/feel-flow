// components/KudosChart.jsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import PodiumChart from "./PodiumChart";

function KudosChart({
  teamData,
  modulesData,           // Datos de módulos obtenidos para Kudos (a través de GetModulesAndUsers con nameModule "KUDOS")
  kudosMemberOptions,     // Opciones de usuarios asignadas desde Home.js (actualizadas cuando se selecciona un módulo)
  selectedKudosMember,    // Valor seleccionado del miembro
  setSelectedKudosMember, // Setter para el miembro
  selectedKudosModule,    // Valor seleccionado del módulo (por fecha)
  setSelectedKudosModule, // Setter para el módulo
  selectedData,           // Data del resumen de Kudos (obtenida via GetKudosSummary)
}) {
  // Generamos las opciones de módulo usando la fecha de publicación
  const moduleOptions = (modulesData || []).map((moduleItem) => {
    const dateStr = new Date(moduleItem.moduleDto.dateAndTimeToPublish).toLocaleDateString();
    return {
      label: dateStr,
      value: moduleItem.moduleDto.id,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10 relative">
      {/* {teamData ? (
        <h1 className="text-2xl font-bold text-center mb-10">
          Resumen de Kudos - {teamData.teamName}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold text-center mb-10">Resumen de Kudos</h1>
      )} */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-12 gap-4">
        {/* Autocomplete para seleccionar módulo (fecha) en Kudos */}
        <Autocomplete
          options={moduleOptions}
          value={
            selectedKudosModule
              ? moduleOptions.find((option) => option.value === selectedKudosModule)
              : null
          }
          onChange={(event, newValue) =>
            setSelectedKudosModule(newValue ? newValue.value : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Fecha del Módulo (Kudos)"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "white" }}
            />
          )}
        />
        {/* Autocomplete para seleccionar miembro en Kudos */}
        <Autocomplete
          options={kudosMemberOptions || []}
          value={
            selectedKudosMember
              ? kudosMemberOptions.find((option) => option.value === selectedKudosMember)
              : null
          }
          onChange={(event, newValue) =>
            setSelectedKudosMember(newValue ? newValue.value : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona Miembro (Kudos)"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "white" }}
            />
          )}
        />
      </div>
      <div className="mt-16 pb-16">
        {selectedData && selectedData.length > 0 ? (
          <PodiumChart data={selectedData} />
        ) : (
          <p className="text-gray-500 text-center">
            Selecciona un módulo y un miembro para ver los datos de Kudos.
          </p>
        )}
      </div>
    </div>
  );
}

export default KudosChart;

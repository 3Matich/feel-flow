import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { renderChart } from "../components/Chart";

function HappinessChart({
  teamData,
  selectedMember,
  setSelectedMember,
  selectedSprint,
  setSelectedSprint,
  selectedData,
}) {
  // Opciones para el Autocomplete de miembros
  const memberOptions = teamData.members.map((member, index) => ({
    label: member.name,
    value: index,
  }));

  // Opciones para el Autocomplete de sprints
  const sprintOptions = [
    { label: "Sprint Actual", value: "current" },
    { label: "Sprint Anterior", value: "previous" },
    { label: "Hace Dos Sprints", value: "twoAgo" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10 relative">
      <h1 className="text-2xl font-bold text-center mb-10">
        12 pasos de la felicidad - {teamData.teamName}
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center mb-12 gap-4">
        {/* Autocomplete para Promedio del Equipo */}
        <Autocomplete
          options={memberOptions}
          value={
            selectedMember !== "" && selectedMember !== null
              ? memberOptions.find((option) => option.value === selectedMember)
              : null
          }
          onChange={(event, newValue) =>
            setSelectedMember(newValue ? newValue.value : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Promedio del Equipo"
              variant="outlined"
              sx={{
                width: 200,
                backgroundColor: "white",
              }}
            />
          )}
        />

        {/* Autocomplete para Sprint */}
        <Autocomplete
          options={sprintOptions}
          value={
            selectedSprint
              ? sprintOptions.find((option) => option.value === selectedSprint)
              : null
          }
          onChange={(event, newValue) =>
            setSelectedSprint(newValue ? newValue.value : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sprint"
              variant="outlined"
              sx={{
                width: 200,
                backgroundColor: "white",
              }}
            />
          )}
        />
      </div>
      {/* Aumentamos la separación vertical */}
      <div className="mt-16 pb-16">
        {renderChart(selectedData)}
      </div>
    </div>
  );
}

export default HappinessChart;

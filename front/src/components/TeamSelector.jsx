import React from "react";
import { Autocomplete, TextField } from "@mui/material";

function TeamSelector({ teams, selectedTeam, setSelectedTeam, months, selectedMonth, setSelectedMonth }) {
  // Opciones para los equipos
  const teamOptions = teams.map((team) => ({
    label: team.nameTeam,
    value: team.uuid,
  }));

  // Opciones para los meses
  const monthOptions = months.map((month, index) => ({
    label: month,
    value: index + 1,
  }));

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex gap-6">
        {/* Autocomplete para seleccionar equipo */}
        <div className="flex flex-col items-center">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Seleccionar equipo
          </label> */}
          <Autocomplete
            options={teamOptions}
            value={selectedTeam ? teamOptions.find((option) => option.value === selectedTeam) : null}
            onChange={(event, newValue) => setSelectedTeam(newValue ? newValue.value : "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Todos los equipos"
                variant="outlined"
                sx={{
                  width: 200,
                  backgroundColor: "pink",
                }}
              />
            )}
          />
        </div>
        {/* Autocomplete para seleccionar mes */}
        <div className="flex flex-col items-center">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Seleccionar mes
          </label> */}
          <Autocomplete
            options={monthOptions}
            value={selectedMonth ? monthOptions.find((option) => option.value === selectedMonth) : null}
            onChange={(event, newValue) => setSelectedMonth(newValue ? newValue.value : "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Todos los meses"
                variant="outlined"
                sx={{
                  width: 200,
                  backgroundColor: "pink",
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamSelector;

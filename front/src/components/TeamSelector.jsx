import React from "react";
import { Autocomplete, TextField } from "@mui/material";

export function TeamSelector({
  teams,
  selectedTeam,
  setSelectedTeam,
  months,
  selectedMonth,
  setSelectedMonth,
}) {
  const teamOptions = teams.map((t) => ({
    label: t.nameTeam,
    value: t.uuid,
  }));
  const monthOptions = months.map((m, i) => ({
    label: m,
    value: i + 1,
  }));
  
  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex gap-6">

        {/* --- Equipo --- */}
        <Autocomplete
          options={teamOptions}
          getOptionLabel={(opt) => opt.label}
          isOptionEqualToValue={(opt, val) => opt.value === val.value}
          value={selectedTeam}                // <-- guardamos el objeto completo
          onChange={(_, newOption) =>
            setSelectedTeam(newOption)         // <-- aquí newOption es {label, value} o null
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Todos los equipos"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "pink" }}
            />
          )}
        />

        {/* --- Mes --- */}
        <Autocomplete
          options={monthOptions}
          getOptionLabel={(opt) => opt.label}
          isOptionEqualToValue={(opt, val) => opt.value === val.value}
          value={monthOptions.find(o => o.value === selectedMonth) || null}
          onChange={(_, newOption) =>
            setSelectedMonth(newOption ? newOption.value : null)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Todos los meses"
              variant="outlined"
              sx={{ width: 200, backgroundColor: "pink" }}
            />
          )}
        />

      </div>
    </div>
  );
}

export default TeamSelector;

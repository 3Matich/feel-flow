import React from "react";

function TeamSelector({ teams, selectedTeam, setSelectedTeam, months, selectedMonth, setSelectedMonth }) {
  return (
    <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
      <div>
        <label htmlFor="teamSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar equipo
        </label>
        <select
          id="teamSelect"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">Todos los equipos</option>
          {teams.map((team) => (
            <option key={team.uuid} value={team.uuid}>
              {team.nameTeam}
            </option>
          ))}
        </select>
        {/* Información seleccionada */}
        {/* <div className="mt-6 text-gray-800 text-lg">
            <p><strong>Equipo seleccionado:</strong> {selectedTeam || "Ninguno"}</p>
            <p><strong>Mes seleccionado:</strong> {months[selectedMonth - 1] || "Todos"}</p>
        </div> */}

      </div>
      <div>
        <label htmlFor="monthSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar mes
        </label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">Todos los meses</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        
      </div>
    </div>
  );
}

export default TeamSelector;

import React from "react";
import { renderChart } from "../components/Chart";

function HappinessChart({
  teamData,
  selectedMember,
  setSelectedMember,
  selectedSprint,
  setSelectedSprint,
  selectedData,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10 relative">
      <h1 className="text-2xl font-bold text-center mb-6">12 pasos de la felicidad - {teamData.teamName}</h1>
      <div className="flex justify-start items-center mb-6 gap-4">
        <select
          id="member-select"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          <option value="">Promedio del Equipo</option>
          {teamData.members.map((member, index) => (
            <option key={index} value={index}>{member.name}</option>
          ))}
        </select>
        <select
          id="sprint-select"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setSelectedSprint(e.target.value)}
        >
          <option value="current">Sprint Actual</option>
          <option value="previous">Sprint Anterior</option>
          <option value="twoAgo">Hace Dos Sprints</option>
        </select>
      </div>
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      {renderChart(selectedData)}
    </div>
  );
}

export default HappinessChart;

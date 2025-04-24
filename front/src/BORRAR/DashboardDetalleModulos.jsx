import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { GetEquipos } from "../services/GetEquipos"; // Ajustar ruta si es necesario
import TeamSelector from "../components/TeamSelector";
import NikoNikoTable from "../components/NikoNikoTable";
import HappinessChart from "../components/HappinessChart";
import DashboardHeader from "../components/DashboardHeader";
import PodiumChart from "../components/PodiumChart";

function Resultados() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [nikoData, setNikoData] = useState({});
  const [teamData, setTeamData] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState("current");

  // Estados específicos para el Kudos Dashboard
  const [selectedKudosMember, setSelectedKudosMember] = useState("Equipo");
  const [selectedKudosSprint, setSelectedKudosSprint] = useState("Sprint 1");

  const months = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const kudosData = {
    "Sprint 1": {
      Equipo: { "Manos Amigas": 8, "Resolutor Estrella": 5, "Energía Positiva": 7, "Maestro del Detalle": 6 },
      Juan: { "Manos Amigas": 2, "Resolutor Estrella": 1, "Energía Positiva": 3, "Maestro del Detalle": 2 },
      Ana: { "Manos Amigas": 3, "Resolutor Estrella": 2, "Energía Positiva": 2, "Maestro del Detalle": 1 },
      Luis: { "Manos Amigas": 1, "Resolutor Estrella": 1, "Energía Positiva": 1, "Maestro del Detalle": 2 },
      Marta: { "Manos Amigas": 2, "Resolutor Estrella": 1, "Energía Positiva": 1, "Maestro del Detalle": 1 },
    },
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado. Redirigiendo al login.");
        return;
      }

      try {
        setLoading(true);
        const response = await GetEquipos(token);
        setTeams(response);

        // Simulación de miembros y datos NicoNiko
        const mockTeamMembers = ["Juan", "María", "Pedro", "Lucía"];
        const mockNikoData = mockTeamMembers.reduce((acc, member) => {
          acc[member] = Array.from({ length: 30 }, () => Math.floor(Math.random() * 3) + 1);
          return acc;
        }, {});

        setTeamMembers(mockTeamMembers);
        setNikoData(mockNikoData);
      } catch (err) {
        console.error("Error al obtener los equipos:", err);
        setError("No se pudieron cargar los equipos. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchMockData = async () => {
      return {
        teamName: "Equipo Ágil",
        members: [
          { name: "Juan Pérez", responses: [4, 5, 4, 3, 4, 5, 5, 4, 5, 4, 4, 5] },
          { name: "Ana López", responses: [5, 4, 3, 4, 5, 4, 4, 3, 4, 3, 5, 4] },
        ],
        averages: [4.5, 4.5, 3.5, 3.5, 4.5, 4.5, 4.5, 3.5, 4.5, 3.5, 4.5, 4.5],
      };
    };

    const fetchData = async () => {
      const response = await fetchMockData();
      setTeamData(response);
    };

    fetchData();
  }, []);

  const selectedData =
    selectedMember === null || selectedMember === ""
      ? teamData?.averages || []
      : teamData?.members[parseInt(selectedMember, 10)]?.responses || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-6 px-8">
      
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <DashboardHeader />
        {loading && <p className="text-blue-500 font-semibold text-center">Cargando equipos...</p>}
        {error && <p className="text-red-500 font-semibold text-center">{error}</p>}
        <TeamSelector
          teams={teams}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          months={months}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <NikoNikoTable teamMembers={teamMembers} nikoData={nikoData} />
        {teamData && (
          <HappinessChart
            teamData={teamData}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            selectedSprint={selectedSprint}
            setSelectedSprint={setSelectedSprint}
            selectedData={selectedData}
          />
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Kudos Dashboard</h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex gap-4 mb-4">
              <select
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                value={selectedKudosMember || "Equipo"}
                onChange={(e) => setSelectedKudosMember(e.target.value)}
              >
                {Object.keys(kudosData["Sprint 1"] || {}).map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>

              <select
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                value={selectedKudosSprint || "Sprint 1"}
                onChange={(e) => setSelectedKudosSprint(e.target.value)}
              >
                {Object.keys(kudosData || {}).map((sprint) => (
                  <option key={sprint} value={sprint}>
                    {sprint}
                  </option>
                ))}
              </select>
            </div>

            {selectedKudosSprint && selectedKudosMember && kudosData[selectedKudosSprint]?.[selectedKudosMember] ? (
              <PodiumChart data={kudosData[selectedKudosSprint][selectedKudosMember]} />
            ) : (
              <p className="text-gray-500 text-center">Seleccione un miembro y un sprint para ver los datos.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resultados;

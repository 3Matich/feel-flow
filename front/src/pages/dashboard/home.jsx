// pages/Home.js
import { GeneralMetrics } from "./GeneralMetrics";
import { ChartsSection } from "./ChartsSection";
import { LatestRecords } from "./LatestRecords";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { GetEquipos } from "../../services/GetEquipos"; // Ajusta la ruta según tu estructura
import TeamSelector from "../../components/TeamSelector";
import NikoNikoTable from "../../components/NikoNikoTable";
import HappinessChart from "../../components/HappinessChart";
import DashboardHeader from "../../components/DashboardHeader";
import PodiumChart from "../../components/PodiumChart";
import { Autocomplete, TextField } from "@mui/material";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";


export function Home() {
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

        // Simulación de miembros y datos Niko Niko
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

  // Datos para las pestañas, incluyendo la pestaña "Home" como la primera
  const tabsData = [
    {
      label: "Home",
      value: "home",
      icon: HomeIcon,
      element: (
        <div className="mt-12">
          {/* <GeneralMetrics /> */}
          <ChartsSection />
          <LatestRecords />
        </div>
      ),
    },
    {
      label: "Niko Niko",
      value: "nikoNiko",
      icon: UserCircleIcon,
      element: (
        <div>
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
        </div>
      ),
    },
    {
      label: "12 Pasos de la Felicidad",
      value: "felicidad",
      icon: Squares2X2Icon,
      element: (
        <div>
          {teamData ? (
            <HappinessChart
              teamData={teamData}
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
              selectedSprint={selectedSprint}
              setSelectedSprint={setSelectedSprint}
              selectedData={selectedData}
            />
          ) : (
            <p className="text-blue-500 font-semibold text-center">Cargando datos...</p>
          )}
        </div>
      ),
    },
    {
      label: "Kudos",
      value: "kudos",
      icon: Cog6ToothIcon,
      element: (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Kudos Dashboard</h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex gap-4 mb-4 justify-center">
              <Autocomplete
                options={Object.keys(kudosData["Sprint 1"] || {})}
                value={selectedKudosMember}
                onChange={(e, newValue) => setSelectedKudosMember(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un miembro"
                    variant="outlined"
                    sx={{
                      width: 200,
                      backgroundColor: "white",
                    }}
                  />
                )}
              />
              <Autocomplete
                options={Object.keys(kudosData || {})}
                value={selectedKudosSprint}
                onChange={(e, newValue) => setSelectedKudosSprint(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona un sprint"
                    variant="outlined"
                    sx={{
                      width: 200,
                      backgroundColor: "white",
                    }}
                  />
                )}
              />
            </div>
            {selectedKudosSprint && selectedKudosMember && kudosData[selectedKudosSprint]?.[selectedKudosMember] ? (
              <PodiumChart data={kudosData[selectedKudosSprint][selectedKudosMember]} />
            ) : (
              <p className="text-gray-500 text-center">
                Seleccione un miembro y un sprint para ver los datos.
              </p>
            )}
          </div>
        </div>
      ),
    }
  ];

  return (
    <div className="mt-12">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* <DashboardHeader /> */}
      <GeneralMetrics />
      <div className="mt-12">
        {/* Se establece el valor por defecto de la pestaña a "home" */}
        <Tabs value="home">
          <TabsHeader>
            {tabsData.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabsData.map(({ value, element }) => (
              <TabPanel key={value} value={value}>
                {element}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
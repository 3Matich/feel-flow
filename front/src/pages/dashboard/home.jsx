// pages/Home.js
import { GeneralMetrics } from "./GeneralMetrics";
import { ChartsSection } from "./ChartsSection";
import { LatestRecords } from "./LatestRecords";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { GetEquipos } from "../../services/GetEquipos";
import { GetNikoNikoSummary } from "../../services/GetNikoNikoSummary";
import { GetModulesAndUsers } from "../../services/GetModulesAndUsers";
import { GetTwelveStepsSummary } from "../../services/GetTwelveStepsSummary";
import { GetKudosSummary } from "../../services/GetKudosSummary";
import TeamSelector from "../../components/TeamSelector";
// import NikoNikoTable from "../../components/NikoNikoTable";
import HappinessChart from "../../components/HappinessChart";
import KudosChart from "../../components/KudosChart"; // Nuevo componente para Kudos
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
  EyeIcon,
  GiftIcon,
  PresentationChartLineIcon,
  FaceSmileIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export function Home() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamData, setTeamData] = useState(null);

  // Estados para Niko Niko
  const [nikoDataByMember, setNikoDataByMember] = useState({});

  // Estados para 12 Pasos de la Felicidad
  const [modulesData, setModulesData] = useState([]); // Datos del endpoint modules-and-users
  const [selectedModule, setSelectedModule] = useState(""); // idModule seleccionado (por fecha)
  const [memberOptions, setMemberOptions] = useState([]); // Opciones de usuarios del módulo seleccionado
  const [selectedMember, setSelectedMember] = useState(""); // Para resumen individual; si no se selecciona, se muestra promedio de equipo
  const [twelveSummary, setTwelveSummary] = useState([]); // Resumen obtenido del endpoint summary/twelve-steps
  const [twelveLoading, setTwelveLoading] = useState(false);
  const [twelveError, setTwelveError] = useState(null);
  const [twelveStepsSummary, setTwelveStepsSummary] = useState(null);

    // Estados para Kudos
  const [kudosModulesData, setKudosModulesData] = useState([]); // Datos del endpoint modules-and-users (KUDOS)
  const [selectedKudosModule, setSelectedKudosModule] = useState(""); // idModule para Kudos
  const [kudosMemberOptions, setKudosMemberOptions] = useState([]); // Opciones de usuarios del módulo de Kudos
  const [selectedKudosMember, setSelectedKudosMember] = useState(""); // Para resumen individual de Kudos; si no, se muestra el promedio de equipo
  const [kudosSummary, setKudosSummary] = useState([]); // Resumen obtenido del endpoint summary/kudos
  const [kudosLoading, setKudosLoading] = useState(false);
  const [kudosError, setKudosError] = useState(null);

  // Cargar módulos para Kudos (KUDOS)
  useEffect(() => {
    const fetchKudosModules = async () => {
      if (!selectedTeam) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        setKudosLoading(true);
        const data = await GetModulesAndUsers(token, "KUDOS", true);
        setKudosModulesData(data);
      } catch (err) {
        console.error("Error al obtener módulos de KUDOS:", err);
        setKudosError("No se pudieron cargar los módulos de Kudos.");
      } finally {
        setKudosLoading(false);
      }
    };
    fetchKudosModules();
  }, [selectedTeam]);

  // Actualizar opciones de miembros para Kudos según módulo seleccionado
  useEffect(() => {
    if (!kudosModulesData || kudosModulesData.length === 0) return;
    const moduleSelected = kudosModulesData.find(
      (moduleItem) => moduleItem.moduleDto.id === selectedKudosModule
    );
    if (moduleSelected) {
      const options = moduleSelected.usersDto.map((user) => ({
        label: `${user.name} ${user.surname}`,
        value: user.uuid,
      }));
      setKudosMemberOptions(options);
    } else {
      setKudosMemberOptions([]);
    }
  }, [kudosModulesData, selectedKudosModule]);

  // Llamada al resumen de Kudos cuando se selecciona un módulo (y opcionalmente un usuario)
  useEffect(() => {
    const fetchKudosSummary = async () => {
      if (!selectedKudosModule) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        setKudosLoading(true);
        const summary = await GetKudosSummary(token, selectedKudosModule, selectedKudosMember || "");
        // summary: array de objetos [{ badgeName, numberOfBadges }, ... ]
        setKudosSummary(summary);
        setKudosError(null);
      } catch (err) {
        console.error("Error al obtener el resumen de Kudos:", err);
        setKudosError("No se pudieron cargar los datos de Kudos.");
      } finally {
        setKudosLoading(false);
      }
    };
    fetchKudosSummary();
  }, [selectedKudosModule, selectedKudosMember]);

  const months = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  // Estados para Kudos (se mantienen igual)
  // const [selectedKudosMember, setSelectedKudosMember] = useState("Equipo");
  // const [selectedKudosSprint, setSelectedKudosSprint] = useState("Sprint 1");

  const kudosData = {
    "Sprint 1": {
      Equipo: { "Manos Amigas": 8, "Resolutor Estrella": 5, "Energía Positiva": 7, "Maestro del Detalle": 6 },
      Juan: { "Manos Amigas": 2, "Resolutor Estrella": 1, "Energía Positiva": 3, "Maestro del Detalle": 2 },
      Ana: { "Manos Amigas": 3, "Resolutor Estrella": 2, "Energía Positiva": 2, "Maestro del Detalle": 1 },
      Luis: { "Manos Amigas": 1, "Resolutor Estrella": 1, "Energía Positiva": 1, "Maestro del Detalle": 2 },
      Marta: { "Manos Amigas": 2, "Resolutor Estrella": 1, "Energía Positiva": 1, "Maestro del Detalle": 1 },
    },
  };

  // Cargar equipos al montar
  useEffect(() => {
    const fetchTeams = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        setLoading(true);
        const response = await GetEquipos(token);
        setTeams(response);
      } catch (err) {
        console.error("Error al obtener los equipos:", err);
        setError("No se pudieron cargar los equipos. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  // Cargar datos de Niko Niko summary cuando cambie el equipo o el mes
  useEffect(() => {
    const fetchNikoNikoSummary = async () => {
      if (!selectedTeam) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        setLoading(true);
        // const data = await GetNikoNikoSummary(token, selectedTeam?.value, month);
        const data = await GetNikoNikoSummary(token, selectedTeam?.value, 2);
        const groupedData = data.reduce((acc, item) => {
          const fullName = `${item.name} ${item.surname}`.trim();
          if (!acc[fullName]) {
            acc[fullName] = [];
          }
          acc[fullName].push(item);
          return acc;
        }, {});
        setNikoDataByMember(groupedData);
      } catch (err) {
        console.error("Error al obtener el summary de NikoNiko:", err);
        setError("No se pudieron cargar los datos de Niko Niko.");
      } finally {
        setLoading(false);
      }
    };
    fetchNikoNikoSummary();
  }, [selectedTeam, selectedMonth]);

  // Cargar módulos y usuarios para 12 Pasos de la Felicidad
  useEffect(() => {
    const fetchModulesAndUsers = async () => {
      if (!selectedTeam) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        setTwelveLoading(true);
        const data = await GetModulesAndUsers(token, "TWELVE_STEPS", true);
        setModulesData(data);
      } catch (err) {
        console.error("Error al obtener módulos de TWELVE_STEPS:", err);
        setTwelveError("No se pudieron cargar los módulos de 12 pasos de la felicidad.");
      } finally {
        setTwelveLoading(false);
      }
    };
    fetchModulesAndUsers();
  }, [selectedTeam]);

  // Cuando se selecciona un módulo, actualizar las opciones de miembros (usuarios) basadas en ese módulo
  useEffect(() => {
    if (!modulesData || modulesData.length === 0) return;
    const moduleSelected = modulesData.find(
      (moduleItem) => moduleItem.moduleDto.id === selectedModule
    );
    if (moduleSelected) {
      const options = moduleSelected.usersDto.map((user) => ({
        label: `${user.name} ${user.surname}`,
        value: user.uuid,
      }));
      setMemberOptions(options);
    } else {
      setMemberOptions([]);
    }
  }, [modulesData, selectedModule]);

  // Llamada al resumen de 12 Pasos cuando se selecciona un módulo (y opcionalmente un usuario)
  useEffect(() => {
    const fetchTwelveStepsSummary = async () => {
      if (!selectedModule) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        setTwelveLoading(true);
        const summary = await GetTwelveStepsSummary(token, selectedModule, selectedMember || "");
        // summary debe ser un array de objetos: [{ categoryName, average }, ... ]
        setTwelveSummary(summary);
        setTwelveError(null);
      } catch (err) {
        console.error("Error al obtener el resumen de 12 pasos:", err);
        setTwelveError("No se pudieron cargar los datos de 12 pasos.");
      } finally {
        setTwelveLoading(false);
      }
    };
    fetchTwelveStepsSummary();
  }, [selectedModule, selectedMember]);

  // Se sigue usando un fetchMockData para teamData (para mostrar el nombre del equipo)
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

    // Llamada al resumen de 12 pasos cuando se selecciona un módulo (y opcionalmente un usuario)
    useEffect(() => {
      const fetchTwelveStepsSummary = async () => {
        if (!selectedModule) return;
        const token = sessionStorage.getItem("token");
        if (!token) return;
        try {
          setLoading(true);
          // Si se selecciona un usuario, se usa su uuid; si no, se envía vacío para obtener el promedio de equipo
          const summary = await GetTwelveStepsSummary(
            token,
            selectedModule,
            selectedMember || ""
          );
          setTwelveStepsSummary(summary);
        } catch (err) {
          console.error("Error al obtener el resumen de 12 pasos:", err);
          setError("No se pudieron cargar los datos de 12 pasos.");
        } finally {
          setLoading(false);
        }
      };
      fetchTwelveStepsSummary();
    }, [selectedModule, selectedMember]);

    // selectedData para el gráfico de felicidad (se utilizará el resumen obtenido)
    const selectedData = twelveStepsSummary || [];

  // Para Niko Niko, se usa teamData (mock) para mostrar averages si no se selecciona miembro
  const nikoSelectedData =
    selectedMember === null || selectedMember === ""
      ? teamData?.averages || []
      : teamData?.members[parseInt(selectedMember, 10)]?.responses || [];

  const tabsData = [
    {
      label: "Dashboard",
      value: "home",
      icon: PresentationChartLineIcon,
      element: (
        <div className="mt-12">
          <ChartsSection />
          <LatestRecords />
        </div>
      ),
    },
    {
      label: "Niko Niko",
      value: "nikoNiko",
      icon: FaceSmileIcon,
      element: (
        <div className="rounded-lg shadow-lg relative">
          {/* <h1 className="text-2xl font-bold text-center mb-4">
            Niko Niko - {selectedTeam || "Equipo"}
          </h1> */}

          {loading && <p className="text-center">Cargando equipos...</p>}
          {error && <p className="text-center">{error}</p>}

          <div className="flex justify-center">
            <TeamSelector
              teams={teams}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              months={months}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </div>
          <div className="mt-8">
            {/* <NikoNikoTable nikoDataByMember={nikoDataByMember} /> */}
          </div>
        </div>
      ),
    },
    {
      label: "12 Pasos de la Felicidad",
      value: "felicidad",
      icon: HeartIcon,
      element: (
        <div>
          {teamData && modulesData.length > 0 ? (
            <HappinessChart
              teamData={teamData}
              modulesData={modulesData}
              memberOptions={memberOptions}
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              selectedData={selectedData}
            />
          ) : (
            <p className="text-center">Cargando datos...</p>
          )}
        </div>
      ),
    },
    {
      label: "Kudos",
      value: "kudos",
      icon: GiftIcon,
      element: (
        <div className="rounded-lg shadow-lg relative mt-4">
          {teamData && modulesData.length > 0 ? (
          <KudosChart
            teamData={teamData}
            modulesData={kudosModulesData}
            kudosMemberOptions={kudosMemberOptions}
            selectedKudosMember={selectedKudosMember}
            setSelectedKudosMember={setSelectedKudosMember}
            selectedKudosModule={selectedKudosModule}
            setSelectedKudosModule={setSelectedKudosModule}
            selectedData={kudosSummary}
          />
        ) : (
          <p className="text-center">
            Cargando datos...
          </p>
        )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-12">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <GeneralMetrics />
      <div className="mt-12">
        <Tabs value="home" indicatorProps={{className: "bg-pink-500 shadow-none rounded-full",}}>
          <TabsHeader className="bg-pink-100 rounded-full" indicatorProps={{ className: "bg-pink-400 rounded-full" }}>
            {tabsData.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2 text-black">
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

// pages/Home.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import {
  GeneralMetrics,
  ChartsSection,
  LatestRecords,
} from "@/widgets/charts";
import { GetTeam } from "@/api/teams";
import { GetNikoNikoSummary } from "@/services/GetNikoNikoSummary";
import { GetModulesAndUsers } from "@/services/GetModulesAndUsers";
import { GetTwelveStepsSummary } from "@/services/GetTwelveStepsSummary";
import { GetKudosSummary } from "@/services/GetKudosSummary";

import TeamSelector from "@/components/TeamSelector";
import NikoNikoTable from "@/components/NikoNikoTable";
import HappinessChart from "@/components/HappinessChart";
import KudosChart from "@/components/KudosChart";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  GiftIcon,
  PresentationChartLineIcon,
  FaceSmileIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export function Home() {
  // --- Estados generales ---
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);       // objeto { label, value } o null
  const [selectedMonth, setSelectedMonth] = useState(null);     // número 1–12 o null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamData, setTeamData] = useState(null);

  // --- Niko Niko ---
  const [nikoDataByMember, setNikoDataByMember] = useState({});

  // --- 12 Pasos de la Felicidad ---
  const [modulesData, setModulesData] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [memberOptions, setMemberOptions] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [twelveLoading, setTwelveLoading] = useState(false);
  const [twelveError, setTwelveError] = useState(null);
  const [twelveStepsSummary, setTwelveStepsSummary] = useState(null);

  // --- Kudos ---
  const [kudosModulesData, setKudosModulesData] = useState([]);
  const [selectedKudosModule, setSelectedKudosModule] = useState("");
  const [kudosMemberOptions, setKudosMemberOptions] = useState([]);
  const [selectedKudosMember, setSelectedKudosMember] = useState("");
  const [kudosSummary, setKudosSummary] = useState([]);
  const [kudosLoading, setKudosLoading] = useState(false);
  const [kudosError, setKudosError] = useState(null);

  // Meses del año
  const months = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  // ------------------------------
  // 1) Carga inicial de equipos
  // ------------------------------
  useEffect(() => {
    const fetchTeams = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Token no encontrado");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await GetTeam();
        setTeams(response);
        setError(null);
      } catch (err) {
        console.error("Error al obtener los equipos:", err);
        setError("No se pudieron cargar los equipos.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  // --------------------------------------------------
  // 2) Carga módulos TWELVE_STEPS siempre al montar,
  //    y de nuevo si cambia selectedTeam
  // --------------------------------------------------
  useEffect(() => {
    const fetchTwelveModules = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      setTwelveLoading(true);
      try {
        const data = await GetModulesAndUsers(token, "TWELVE_STEPS", true);
        setModulesData(data);
        setTwelveError(null);
      } catch (err) {
        console.error("Error módulos 12 pasos:", err);
        setTwelveError("No se pudieron cargar los módulos de 12 pasos.");
      } finally {
        setTwelveLoading(false);
      }
    };
    fetchTwelveModules();
  }, [selectedTeam]);

  // ----------------------------------------------------
  // 3) Cuando modulesData o selectedModule cambian, setea
  //    memberOptions para el selector de usuario
  // ----------------------------------------------------
  useEffect(() => {
    if (!modulesData.length) {
      setMemberOptions([]);
      return;
    }
    const mod = modulesData.find(m => m.moduleDto.id === selectedModule);
    if (mod) {
      setMemberOptions(
        mod.usersDto.map(u => ({ label: `${u.name} ${u.surname}`, value: u.uuid }))
      );
    } else {
      setMemberOptions([]);
    }
  }, [modulesData, selectedModule]);

  // -----------------------------------------------------
  // 4) Trae el resumen de 12 pasos cuando se selecciona
  //    módulo o usuario dentro de 12 pasos
  // -----------------------------------------------------
  useEffect(() => {
    const fetchTwelveSummary = async () => {
      if (!selectedModule) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      setTwelveLoading(true);
      try {
        const summary = await GetTwelveStepsSummary(
          token,
          selectedModule,
          selectedMember || ""
        );
        setTwelveStepsSummary(summary);
        setTwelveError(null);
      } catch (err) {
        console.error("Error resumen 12 pasos:", err);
        setTwelveError("No se pudieron cargar los datos de 12 pasos.");
      } finally {
        setTwelveLoading(false);
      }
    };
    fetchTwelveSummary();
  }, [selectedModule, selectedMember]);

  // --------------------------------------------------
  // 5) Carga módulos KUDOS al montar y al cambiar equipo
  // --------------------------------------------------
  useEffect(() => {
    const fetchKudosModules = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      setKudosLoading(true);
      try {
        const data = await GetModulesAndUsers(token, "KUDOS", true);
        setKudosModulesData(data);
        setKudosError(null);
      } catch (err) {
        console.error("Error módulos Kudos:", err);
        setKudosError("No se pudieron cargar los módulos de Kudos.");
      } finally {
        setKudosLoading(false);
      }
    };
    fetchKudosModules();
  }, [selectedTeam]);

  // ------------------------------------------------------
  // 6) Cuando kudosModulesData o selectedKudosModule cambian
  //    actualiza kudosMemberOptions
  // ------------------------------------------------------
  useEffect(() => {
    if (!kudosModulesData.length) {
      setKudosMemberOptions([]);
      return;
    }
    const mod = kudosModulesData.find(m => m.moduleDto.id === selectedKudosModule);
    if (mod) {
      setKudosMemberOptions(
        mod.usersDto.map(u => ({ label: `${u.name} ${u.surname}`, value: u.uuid }))
      );
    } else {
      setKudosMemberOptions([]);
    }
  }, [kudosModulesData, selectedKudosModule]);

  // ----------------------------------------------------
  // 7) Trae el resumen de Kudos al cambiar módulo o usuario
  // ----------------------------------------------------
  useEffect(() => {
    const fetchKudos = async () => {
      if (!selectedKudosModule) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      setKudosLoading(true);
      try {
        const summary = await GetKudosSummary(
          token,
          selectedKudosModule,
          selectedKudosMember || ""
        );
        setKudosSummary(summary);
        setKudosError(null);
      } catch (err) {
        console.error("Error resumen Kudos:", err);
        setKudosError("No se pudieron cargar los datos de Kudos.");
      } finally {
        setKudosLoading(false);
      }
    };
    fetchKudos();
  }, [selectedKudosModule, selectedKudosMember]);

  // --------------------------------------------------------
  // 8) Resumen de NikoNiko cuando cambian equipo o mes
  // --------------------------------------------------------
  useEffect(() => {
    const fetchNiko = async () => {
      if (!selectedTeam?.value || !selectedMonth) return;
      const token = sessionStorage.getItem("token");
      if (!token) return;
      setLoading(true);
      try {
        const data = await GetNikoNikoSummary(
          token,
          selectedTeam.value,
          selectedMonth
        );
        const grouped = data.reduce((acc, item) => {
          const name = `${item.name} ${item.surname}`.trim();
          if (!acc[name]) acc[name] = [];
          acc[name].push(item);
          return acc;
        }, {});
        setNikoDataByMember(grouped);
        setError(null);
      } catch (err) {
        console.error("Error NikoNiko:", err);
        setError("No se pudieron cargar los datos de Niko Niko.");
      } finally {
        setLoading(false);
      }
    };
    fetchNiko();
  }, [selectedTeam, selectedMonth]);

  // ------------------------------
  // 9) Mock de teamData para charts
  // ------------------------------
  useEffect(() => {
    async function fetchMock() {
      return {
        teamName: "Equipo Ágil",
        members: [
          { name: "Juan Pérez", responses: [4,5,4,3,4,5,5,4,5,4,4,5] },
          { name: "Ana López",  responses: [5,4,3,4,5,4,4,3,4,3,5,4] },
        ],
        averages: [4.5,4.5,3.5,3.5,4.5,4.5,4.5,3.5,4.5,3.5,4.5,4.5],
      };
    }
    fetchMock().then(setTeamData);
  }, []);

  // --------------------
  // Datos para charts
  // --------------------
  const selectedData = twelveStepsSummary || [];
  const nikoSelectedData =
    !selectedMember
      ? teamData?.averages || []
      : teamData?.members[parseInt(selectedMember, 10)]?.responses || [];

  // --------------------
  // Estructura de tabs
  // --------------------
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
        <div className="mt-8">
          {loading && <p className="text-center">Cargando equipos...</p>}
          {error && <p className="text-center">{error}</p>}
          <NikoNikoTable nikoDataByMember={nikoDataByMember} />
        </div>
      ),
    },
    {
      label: "12 Pasos de la Felicidad",
      value: "felicidad",
      icon: HeartIcon,
      element: (
        <div className="mt-4">
          {twelveLoading && <p className="text-center">Cargando datos...</p>}
          {twelveError && <p className="text-center">{twelveError}</p>}
          {!twelveLoading && !twelveError && (
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
          )}
        </div>
      ),
    },
    {
      label: "Kudos",
      value: "kudos",
      icon: GiftIcon,
      element: (
        <div className="mt-4">
          {kudosLoading && <p className="text-center">Cargando datos...</p>}
          {kudosError && <p className="text-center">{kudosError}</p>}
          {!kudosLoading && !kudosError && (
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

      {/* Selector global de equipo + mes */}
      <div className="mt-8 flex justify-center">
        <TeamSelector
          teams={teams}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          months={months}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>

      {/* Pestañas */}
      <div className="mt-12">
        <Tabs value="home">
          <TabsHeader
            className="bg-pink-100 rounded-full"
            indicatorProps={{
              className: "bg-pink-500 shadow-none rounded-full",
            }}
          >
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

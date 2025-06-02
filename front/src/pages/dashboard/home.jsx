import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import {
  GeneralMetrics,
} from "@/widgets";
import { GetTeam } from "@/api";

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

import { 
  SummaryNikoNiko, 
  Dashboard,
  TwelveStepsSummary,
  KudosSummary,
} from "@/widgets";

export function Home() {
  // --- Estados generales ---
  const [teams, setTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  // ------------------------------
  // 1) Carga inicial de equipos
  // ------------------------------
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await GetTeam();
        setTeams(response);
      } catch (err) {
        console.error("Error al obtener los equipos:", err);
      }
    };
    fetchTeams();
  }, []);
  
  const tabsData = [
    
    {
      label: "Dashboard",
      value: "home",
      icon: PresentationChartLineIcon,
      element: Dashboard
    }, 
    {
      label: "12 Pasos de la Felicidad",
      value: "felicidad",
      icon: HeartIcon,
      element: TwelveStepsSummary,
    }, 
    {
      label: "Niko Niko",
      value: "nikoNiko",
      icon: FaceSmileIcon,
      element: SummaryNikoNiko,
    }, 
    {
      label: "Kudos",
      value: "kudos",
      icon: GiftIcon,
      element: KudosSummary,
    }, 
  ];

  return (
    <div className="mt-12">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <GeneralMetrics />

      {/* Pestañas */}
      <div className="mt-12 mb-8">
        <Tabs value={activeTab}>
          <TabsHeader
            className="bg-pink-100 rounded-full"
            indicatorProps={{
              className: "bg-pink-500 shadow-none rounded-full",
            }}
          >
            {tabsData.map(({ label, value, icon }) => (
              <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
                <div className="flex items-center gap-2 text-black">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabsData.map(({ value, element: Element }) => (
              <TabPanel key={value} value={value}>
                <Element isActive={activeTab} Teams={teams} />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default Home; //456
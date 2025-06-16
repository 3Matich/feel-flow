import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { 
  GetTeam,
  createKudosModule,
} from "@/api";

import { useMaterialTailwindController } from "@/context";

export function Kudos() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [controller] = useMaterialTailwindController();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const availableTeams = await GetTeam();
        setTeams(availableTeams);
      } catch (err) {
        console.error("❌ Error al obtener equipos:", err);
      }
    };
    fetchTeams();
  }, []);

  const handleCreateModule = async () => {
    try {
      if (!selectedTeam || !startDate || !endDate) {
        alert("Por favor complete todos los campos.");
        return;
      }

      const payload = {
        idTeam: selectedTeam,
        dateAndTimeToPublish: `${startDate}T00:00:00.000Z`,
        dateAndTimeToClose: `${endDate}T00:00:00.000Z`,
      };

      const response = await createKudosModule(payload);
      alert("✅ Módulo de Kudos creado con éxito");
      console.log("📦 Respuesta:", response);
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  const kudosIcons = [
    "/icons/Kudos_Energia_Positiva.svg",
    "/icons/Kudos_Resolutor_Estrella.svg",
    "/icons/Kudos_Maestro_Del_detalle.svg",
    "/icons/Kudos_Manos_Amigas.svg",
  ];

  const kudosDescriptions = [
    "Energía Positiva: Para los que contagian entusiasmo y motivación al equipo.",
    "Resolutor Estrella: Para los que encuentran soluciones efectivas a los problemas.",
    "Maestro del Detalle: Para los que prestan atención a cada pequeño detalle.",
    "Manos Amigas: Para los que siempre ayudan a sus compañeros.",
  ];

  return (
    <div className="flex gap-7 items-start">
      {/* Formulario de configuración */}
      <Card color="transparent" shadow={false} className="w-1/2 p-5">
        <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
          Configurar Módulo de Kudos
        </Typography>
        <Typography color="gray" className="font-normal text-center mb-4">
          Seleccione las opciones para configurar el módulo.
        </Typography>

        <div className="flex flex-col gap-4">
          <Typography variant="h6" color="blue-gray">
            Equipo
          </Typography>
          <Select label="Seleccione un equipo" value={selectedTeam} onChange={setSelectedTeam}>
            {teams.map((team) => (
              <Option key={team.uuid} value={team.uuid}>
                {team.nameTeam}
              </Option>
            ))}
          </Select>

          <Typography variant="h6" color="blue-gray">
            Fecha de habilitación del módulo
          </Typography>
          <Input
            type="date"
            size="lg"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Typography variant="h6" color="blue-gray">
            Fecha de Fin del módulo
          </Typography>
          <Input
            type="date"
            size="lg"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          {/* Botón con color personalizado */}
          <Button
            className="mt-4 button-custom"
            onClick={handleCreateModule}
          >
            Guardar
          </Button>
        </div>
      </Card>

      {/* Iconos y descripciones */}
      <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col items-center">
        <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
          Módulo de Kudos
        </Typography>
        <Typography color="gray" className="font-normal text-center mb-4">
          Incentivamos el reconocimiento y motivación del equipo.
        </Typography>
        <div className="grid grid-cols-2 gap-4 w-full">
          {kudosIcons.map((icon, index) => (
            <div key={index} className="flex flex-col items-center gap-2 p-2">
              <img src={icon} alt={kudosDescriptions[index].split(":")[0]} className="w-24 h-24" />
              <Typography color="gray" className="font-normal text-center">
                <strong>{kudosDescriptions[index].split(":")[0]}</strong>: {kudosDescriptions[index].split(":")[1]}
              </Typography>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

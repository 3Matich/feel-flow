import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useMaterialTailwindController } from "@/context";
import { getAvailableTeams } from "@/services/modulos/getAvailableTeams";
import { createNikoNikoModule } from "@/services/modulos/createNikoNikoModule";

import dayjs from "dayjs";

export function NikoNiko() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(""); // Inicializa como vacío
  const [publishDate, setPublishDate] = useState(null);
  const [closeDate, setCloseDate] = useState(null);
  const [startResponseTime, setStartResponseTime] = useState(null);
  const [endResponseTime, setEndResponseTime] = useState(null);

  const [controller] = useMaterialTailwindController();
  const { sidenavColor } = controller;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getAvailableTeams();
        setTeams(data);
        // No seleccionar automáticamente un equipo
      } catch (err) {
        console.error("Error cargando equipos:", err);
      }
    };
    fetchTeams();
  }, []);

  const handleCreateModule = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        idTeam: selectedTeam,
        dateAndTimeToPublish: publishDate?.toISOString(),
        dateAndTimeToClose: closeDate?.toISOString(),
        timeToToResponseStartDay: startResponseTime?.format("HH:mm:ss"),
        timeToToResponseEndDay: endResponseTime?.format("HH:mm:ss"),
      };

      await createNikoNikoModule(payload);
      alert("✅ Módulo Niko Niko creado exitosamente");
    } catch (err) {
      alert(`❌ Error al crear el módulo: ${err.message}`);
    }
  };

  const moodIcons = [
    "/public/icons/1_mood_w.svg",
    "/public/icons/2_mood_w.svg",
    "/public/icons/b_p_mood_w.svg",
    "/public/icons/n_mood_w.svg",
    "/public/icons/-1_mood_w.svg",
    "/public/icons/-2_mood_w.svg"
  ];

  const moodDescriptions = [
    "Hoy es un gran día!!.",
    "Hoy es un buen día.",
    "No es mi mejor día.",
    "Hoy es un día normal.",
    "Hoy no es un buen día.",
    "Pero qué día de m@!%&0."
  ];

  return (
    <div className="flex gap-7 items-start">
      <Card
        color="transparent"
        shadow={false}
        className="w-1/2 p-5 flex flex-col justify-start"
      >
        <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
          Configurar Módulo NikoNiko
        </Typography>
        <Typography color="gray" className="font-normal text-center">
          Seleccione las opciones para configurar el módulo.
        </Typography>
        <form className="mt-4" onSubmit={handleCreateModule}>
          <div className="mb-2 flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray">
              Equipo
            </Typography>
            <Select
              label="Selecciona un equipo"
              value={selectedTeam}
              onChange={(val) => setSelectedTeam(val)}
            >
              {teams.map((team) => (
                <Option key={team.uuid} value={team.uuid}>
                  {team.nameTeam}
                </Option>
              ))}
            </Select>

            <Typography variant="h6" color="blue-gray">
              Fecha de habilitación del módulo
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Inicio"
                value={publishDate}
                onChange={(val) => setPublishDate(val)}
              />
            </LocalizationProvider>

            <Typography variant="h6" color="blue-gray">
              Fecha de Fin del módulo
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Fin"
                value={closeDate}
                onChange={(val) => setCloseDate(val)}
              />
            </LocalizationProvider>

            <Typography variant="h6" color="blue-gray">
              Hora para responder (inicio del día)
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Hora inicio"
                value={startResponseTime}
                onChange={(val) => setStartResponseTime(val)}
                views={["hours", "minutes"]}
              />
            </LocalizationProvider>

            <Typography variant="h6" color="blue-gray">
              Hora para responder (fin del día)
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Hora fin"
                value={endResponseTime}
                onChange={(val) => setEndResponseTime(val)}
                views={["hours", "minutes"]}
              />
            </LocalizationProvider>
          </div>

          <Button
            className="mt-6 bg-[#282424] hover:bg-opacity-80"
            fullWidth
            type="submit"
          >
            Guardar
          </Button>
        </form>
      </Card>

      <Card
        color="transparent"
        shadow={false}
        className="w-1/2 p-5 flex flex-col items-center"
      >
        <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
          Módulo NikoNiko
        </Typography>
        <Typography color="gray" className="font-normal text-center mb-4">
          Expresa tu estado de ánimo diario con el equipo.
        </Typography>
        <div className="grid grid-cols-2 gap-2 w-full">
          {moodIcons.map((icon, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-0.5 p-1"
            >
              <img
                src={icon}
                alt={moodDescriptions[index]}
                className="w-16 h-16"
              />
              <Typography
                color="gray"
                className="font-normal text-center text-sm"
              >
                <strong>{moodDescriptions[index]}</strong>
              </Typography>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

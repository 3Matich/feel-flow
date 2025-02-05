import React from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useMaterialTailwindController } from "@/context";

export function Kudos() {
    const [teamValue, setTeamValue] = React.useState("Team 1");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [selectedDateTime, setSelectedDateTime] = React.useState(null);

    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;

    const kudosIcons = [
        "/icons/Kudos_Energia_Positiva.svg",
        "/icons/Kudos_Resolutor_Estrella.svg",
        "/icons/Kudos_Maestro_Del_Detalle.svg",
        "/icons/Kudos_Manos_Amigas.svg"
    ];

    const kudosDescriptions = [
        "Kudos Energía Positiva: Reconocemos a quienes contagian entusiasmo y motivación al equipo.",
        "Kudos Resolutor Estrella: Celebramos a quienes encuentran soluciones rápidas y efectivas a los problemas.",
        "Kudos Maestro del Detalle: Valoramos a aquellos que prestan atención a cada pequeño detalle para garantizar la calidad.",
        "Kudos Manos Amigas: Apreciamos a quienes siempre están dispuestos a ayudar a sus compañeros de equipo."
    ];

    console.log("Kudos Icons:", kudosIcons);
    console.log("Kudos Descriptions:", kudosDescriptions);

    return (
        <div className="flex gap-7">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Configurar Módulo de Kudos
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Seleccione las opciones para configurar el módulo.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Equipo
                        </Typography>
                        <Select
                            value={teamValue}
                            onChange={(val) => setTeamValue(val)}
                            disabled
                        >
                            <Option value="Team 1">Los Umpalumpas</Option>
                            <Option value="Team 2">Real Alcohólicos</Option>
                            <Option value="Team 3">Funcopops</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Fecha de habilitación del módulo
                        </Typography>
                        <Input type="date" size="lg" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Fecha de Fin del módulo
                        </Typography>
                        <Input type="date" size="lg" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                        <div className="mb-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Seleccionar fecha y hora"
                                    value={selectedDateTime}
                                    onChange={(newDateTime) => setSelectedDateTime(newDateTime)}
                                    format="DD/MM/YYYY HH:mm"
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <Button className="mt-6" fullWidth color={sidenavColor}>
                        Guardar
                    </Button>
                </form>
            </Card>
            <Card color="transparent" shadow={false} className="w-96 p-5 flex flex-col items-center mx-auto">
                <Typography variant="h4" color="blue-gray" className="mb-3 text-center">
                    Módulo de Kudos
                </Typography>
                <Typography color="gray" className="mt-1 font-normal mb-4 text-center">
                    Este módulo permite otorgar kudos para incentivar el reconocimiento y motivación del equipo.
                </Typography>
                <div className="flex flex-col gap-4 w-full">
                    {kudosIcons.map((icon, index) => (
                        <div key={index} className="flex items-center gap-4 w-full p-2">
                            <img src={icon} alt={kudosDescriptions[index].split(':')[0]} className="w-16 h-16" style={{ backgroundColor: 'transparent' }} />
                            <Typography color="gray" className="font-normal flex-1">
                                {kudosDescriptions[index]}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

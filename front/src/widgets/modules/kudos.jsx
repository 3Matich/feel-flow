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

import { useMaterialTailwindController } from "@/context";

export function Kudos() {
    const [teamValue, setTeamValue] = React.useState("Team 1");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [selectedDateTime, setSelectedDateTime] = React.useState(null);

    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;

    const kudosIcons = [
        "/public/icons/Kudos_Energia_Positiva.svg",
        "/public/icons/Kudos_Resolutor_Estrella.svg",
        "/public/icons/Kudos_Maestro_Del_detalle.svg",
        "/public/icons/Kudos_Manos_Amigas.svg"
    ];

    const kudosDescriptions = [
        "Energía Positiva: Para los que contagian entusiasmo y motivación al equipo.",
        "Resolutor Estrella: Para los que encuentran soluciones efectivas a los problemas.",
        "Maestro del Detalle: Para los que prestan atención a cada pequeño detalle.",
        "Manos Amigas: Para los que siempre ayudan a sus compañeros."
    ];

    return (
        <div className="flex gap-7 items-start">
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col justify-start">
                <Typography variant="h4" className="mb-2 text-center">
                    Configurar Módulo de Kudos
                </Typography>
                <Typography className="text-center">
                    Seleccione las opciones para configurar el módulo.
                </Typography>
                <form className="mt-4">
                    <div className="mb-2 flex flex-col gap-4">
                        <Typography variant="h6">
                            Equipo
                        </Typography>
                        <Select disabled>
                            <Option value="Team 1">Los Umpalumpas</Option>
                            <Option value="Team 2">Real Alcohólicos</Option>
                            <Option value="Team 3">Funcopops</Option>
                        </Select>
                        <Typography variant="h6">
                            Fecha de habilitación del módulo
                        </Typography>
                        <Input type="date" size="lg"/>
                        <Typography variant="h6">
                            Fecha de Fin del módulo
                        </Typography>
                        <Input type="date" size="lg" />
                        {/*  
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
                        */}
                    </div>
                    <Button className="mt-6" fullWidth color={sidenavColor}>
                        Guardar
                    </Button>
                </form>
            </Card>
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col items-center">
                <Typography variant="h4" className="mb-2 text-center">
                    Módulo de Kudos
                </Typography>
                <Typography className="text-center mb-4">
                    Incentivamos el reconocimiento y motivación del equipo.
                </Typography>
                <div className="grid grid-cols-2 gap-4 w-full">
                    {kudosIcons.map((icon, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 p-2">
                            <img src={icon} alt={kudosDescriptions[index].split(':')[0]} className="w-24 h-24" />
                            <Typography className="text-center">
                                <strong>{kudosDescriptions[index].split(':')[0]}</strong>: {kudosDescriptions[index].split(':')[1]}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

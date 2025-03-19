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

import { NotFoundPage } from "@/pages/dashboard"

export function NikoNiko() {
    const [teamValue, setTeamValue] = React.useState("Team 1");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [selectedDateTime, setSelectedDateTime] = React.useState(null);

    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;

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
        "Pero que día de m@!%&0."
    ];

    return (
        <div className="flex gap-7 items-start">
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col justify-start">
                <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
                    Configurar Módulo NikoNiko
                </Typography>
                <Typography color="gray" className="font-normal text-center">
                    Seleccione las opciones para configurar el módulo.
                </Typography>
                <form className="mt-4">
                    <div className="mb-2 flex flex-col gap-4">
                        <Typography variant="h6" color="blue-gray">
                            Equipo
                        </Typography>
                        <Select disabled>
                            <Option value="Team 1">Los Umpalumpas</Option>
                            <Option value="Team 2">Real Alcohólicos</Option>
                            <Option value="Team 3">Funcopops</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray">
                            Fecha de habilitación del módulo
                        </Typography>
                        <Input type="date" size="lg" className="!border-t-blue-gray-200 focus:!border-t-gray-900" />
                        <Typography variant="h6" color="blue-gray">
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
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col items-center">
                <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
                    Módulo NikoNiko
                </Typography>
                <Typography color="gray" className="font-normal text-center mb-4">
                    Expresa tu estado de ánimo diario con el equipo.
                </Typography>
                <div className="grid grid-cols-2 gap-2 w-full">
                    {moodIcons.map((icon, index) => (
                        <div key={index} className="flex flex-col items-center gap-0.5 p-1">
                            <img src={icon} alt={moodDescriptions[index]} className="w-16 h-16" />
                            <Typography color="gray" className="font-normal text-center text-sm">
                                <strong>{moodDescriptions[index]}</strong>
                            </Typography>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

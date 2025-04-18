import React, { useState } from "react";
import {
    Card,
    Button,
    Typography,
    Input,
    Select,
    Option
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export function TwelveSteps() {
    const stepsIcons = [
        "/public/icons/12_agradecimiento.svg",
        "/public/icons/12_amable.svg",
        "/public/icons/12_disfrutar.svg",
        "/public/icons/12_risas.svg",
        "/public/icons/12_descanso.svg",
        "/public/icons/12_resilience.svg",
        "/public/icons/12_objetivo.svg",
        "/public/icons/12_aprendizaje.svg",
        "/public/icons/12_servicio.svg",
        "/public/icons/12_social.svg",
        "/public/icons/12_ejercicio.svg",
        "/public/icons/12_meditar.svg"
    ];

    const stepsDescriptions = [
        "Agradece.",
        "Sé amable.",
        "Disfruta.",
        "Ríe más.",
        "Descansa bien.",
        "Sé resiliente.",
        "Fija objetivos.",
        "Aprende.",
        "Ayuda a otros.",
        "Socializa.",
        "Haz ejercicio.",
        "Medita más."
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 4 >= stepsIcons.length ? 0 : prev + 4));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 4 < 0 ? stepsIcons.length - 4 : prev - 4));
    };

    return (
        <div className="flex gap-7 h-screen items-start">
            {/* Formulario a la izquierda */}
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col justify-start">
                <Typography variant="h4" className="mb-2">
                    Configurar Módulo 12 Pasos
                </Typography>
                <Typography>
                    Seleccione las opciones para configurar el módulo.
                </Typography>
                <form className="mt-4">
                    <div className="mb-1 flex flex-col gap-4">
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
                        <Input type="date" size="lg" />
                        <Typography variant="h6">
                            Fecha de Fin del módulo
                        </Typography>
                        <Input type="date" size="lg" />
                    </div>
                    <Button className="mt-6 button-custom" variant="filled" color="none" fullWidth>
                        Guardar
                    </Button>
                </form>
            </Card>

            {/* Carrusel a la derecha */}
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col items-start justify-start h-full">
                <Typography variant="h4" className="mb-2">
                    Los 12 Pasos de la Felicidad
                </Typography>
                <Typography className="text-center mb-4">
                    Practica estos pasos para una vida más plena.
                </Typography>

                {/* Contenedor del carrusel con botones laterales */}
                <div className="flex items-center justify-between w-full relative">
                    <Button 
                        onClick={handlePrev} 
                        className="h-full w-14 flex items-center justify-center bg-[#353535] bg-opacity-10 hover:bg-opacity-30"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                        <span className="ml-1">&lt;</span>
                    </Button>

                    <div className="grid grid-cols-2 gap-2 w-full items-center">
                        {stepsIcons.slice(currentIndex, currentIndex + 4).map((icon, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col items-center justify-between p-1 min-h-[140px]"
                            >
                                <img src={icon} alt={stepsDescriptions[currentIndex + index]} className="w-28 h-28" />
                                <Typography  
                                    className="text-center mt-0 leading-tight"
                                >
                                    <strong>{stepsDescriptions[currentIndex + index]}</strong>
                                </Typography>
                            </div>
                        ))}
                    </div>

                    <Button 
                        onClick={handleNext} 
                        className="h-full w-14 flex items-center justify-center bg-[#353535] bg-opacity-10 hover:bg-opacity-30"
                    >
                        <span className="mr-1">&gt;</span>
                        <ChevronRightIcon className="w-6 h-6" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}

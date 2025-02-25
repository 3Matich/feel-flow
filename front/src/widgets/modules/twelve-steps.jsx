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
<<<<<<< HEAD
        <div className="flex gap-7 h-screen items-start">
            {/* Formulario a la izquierda */}
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col justify-start">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Configurar Módulo 12 Pasos
=======
        <div className="flex gap-7 text-green-500 dark:text-red-500">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Configurar Módulo 12 Pasos de la Felicidad
>>>>>>> 88fe9c91aca80eb348c1ae735e93a742a424fced
                </Typography>
                <Typography color="gray" className="font-normal">
                    Seleccione las opciones para configurar el módulo.
                </Typography>
                <form className="mt-4">
                    <div className="mb-1 flex flex-col gap-4">
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
                    </div>
                    <Button className="mt-4" fullWidth>
                        Guardar
                    </Button>
                </form>
            </Card>
<<<<<<< HEAD

            {/* Carrusel a la derecha */}
            <Card color="transparent" shadow={false} className="w-1/2 p-5 flex flex-col items-start justify-start h-full">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Los 12 Pasos de la Felicidad
=======
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" className="mb-3">
                    Descripción de la técnica
                </Typography>
                <Typography variant="paragraph">
                    La técnica de los 12 Pasos de la Felicidad es un enfoque basado en principios psicológicos y prácticas de bienestar diseñadas para mejorar la 
                    satisfacción y la felicidad en la vida personal y profesional. Aunque no hay un modelo único y universalmente aceptado, muchas metodologías se 
                    basan en los siguientes <span className="font-bold">pilares</span>:
                </Typography> 
                <ul className="list-none list-inside ml-5 mt-1 space-y-2">
                    <li><span className="font-bold">🙏 Expresar Gratitud:</span> Agradecer lo positivo mejora el bienestar emocional.</li>
                    <li><span className="font-bold">🎁 Practicar la Generosidad:</span> Dar sin esperar fortalece las relaciones.</li>
                    <li><span className="font-bold">🥗 Cuidar la Alimentación:</span> Una dieta saludable impacta en el estado de ánimo.</li>
                    <li><span className="font-bold">🏃‍♂️ Hacer Ejercicio Regular:</span> Reduce el estrés y mejora el bienestar.</li>
                    <li><span className="font-bold">👥 Cultivar Relaciones Positivas:</span> Rodearse de personas que suman felicidad.</li>
                    <li><span className="font-bold">⏳ Vivir el Presente:</span> Centrarse en el aquí y ahora evita preocupaciones innecesarias.</li>
                    <li><span className="font-bold">🎯 Tener Propósitos Claros:</span> Establecer metas significativas genera motivación.</li>
                    <li><span className="font-bold">📚 Aprender y Crecer:</span> Mejorar constantemente potencia la felicidad.</li>
                    <li><span className="font-bold">🌿 Manejar el Estrés:</span> Técnicas como la meditación ayudan a equilibrarse.</li>
                    <li><span className="font-bold">😴 Dormir Bien:</span> Un descanso adecuado es clave para la salud mental.</li>
                    <li><span className="font-bold">🎶 Disfrutar del Ocio:</span> La diversión y el descanso son esenciales para el bienestar.</li>
                    <li><span className="font-bold">💪 Practicar la Resiliencia:</span> Aceptar errores y aprender sin autocrítica excesiva.</li>
                </ul>

                <Typography variant="h5" className="mt-3 mb-3">
                    Beneficios
                </Typography>

                <ul className="list-none list-inside ml-5 space-y-2">
                    <li>✅ Mayor bienestar emocional y físico.</li>
                    <li>✅ Mejora en la productividad y rendimiento laboral.</li>
                    <li>✅ Relaciones interpersonales más saludables.</li>
                    <li>✅ Reducción del estrés y la ansiedad.</li>
                    <li>✅ Aumento de la motivación y el sentido de propósito.</li>
                </ul>
                {/* 
                <Typography variant="h4" color="blue-gray" className="mb-3">
                    Preguntas y respuestas del set
>>>>>>> 88fe9c91aca80eb348c1ae735e93a742a424fced
                </Typography>
                <Typography color="gray" className="font-normal text-center mb-4">
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
                                    color="gray" 
                                    className="font-normal text-center mt-0 leading-tight"
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
                 */}
            </Card>
        </div>
    );
}

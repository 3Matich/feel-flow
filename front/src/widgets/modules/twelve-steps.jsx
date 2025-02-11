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

import { questions } from "@/data";
import { useMaterialTailwindController } from "@/context";


export function TwelveSteps() {
    const [teamValue, setTeamValue] = React.useState("Team 1");
    const [questionsValue, setQuestionsValue] = React.useState("set 1");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [startDateError, setStartDateError] = React.useState("");
    const [endDateError, setEndDateError] = React.useState("");
    const [questionSet, setQuestionSet] = React.useState("set 1");
    const [selectedDateTime, setSelectedDateTime] = React.useState(null);

    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(questions[1]);
    return (
        <div className="flex gap-7 text-green-500 dark:text-red-500">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Configurar Módulo 12 Pasos de la Felicidad
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
                            Set de preguntas
                        </Typography>
                        <Select
                            value={questionsValue}
                            onChange={(val) => (setQuestionsValue(val), setQuestionSet(val))}
                        >
                            <Option value="set 1">Preguntero 1</Option>
                            <Option value="set 2">Preguntero 2</Option>
                        </Select>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Fecha de habilitacion del modulo
                        </Typography>
                        <Input
                            type="date"
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        // value={startDate}
                        // onChange={(date) => {inputDate <= today
                        //     ? (setStartDateError("La fecha debe ser mayor a la fecha actual."), setSelectedDate(""))
                        //     : (setStartDateError(""), setSelectedDate(date))}}
                        />
                        {/* {startDateError && <p className="text-red-500 text-sm">{startDateError}</p>} */}

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Fecha de Fin del modulo
                        </Typography>
                        <Input
                            type="date"
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
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
                </Typography>
                <div>
                    {questions[questionSet].map((item, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="font-bold mb-2">
                                {index + 1}. {item.pregunta}
                            </h3>
                            <ul className="list-disc list-inside">
                                {item.respuestas.map((respuesta, idx) => (
                                    <li key={idx} className="ml-4">
                                        {respuesta}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                 */}
            </Card>
        </div>
    );
}

// export default TwelveSteps()
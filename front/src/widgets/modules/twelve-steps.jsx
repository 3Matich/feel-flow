import React from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";

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

    const [controller] = useMaterialTailwindController();
    const { sidenavColor } = controller;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(questions[1]);
    return (
        <div className="flex gap-7">
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
                    </div>
                    <Button className="mt-6" fullWidth color={sidenavColor}>
                        Guardar
                    </Button>
                </form>
            </Card>
            <Card color="transparent" shadow={false}>
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
            </Card>
        </div>
    );
}

// export default TwelveSteps()
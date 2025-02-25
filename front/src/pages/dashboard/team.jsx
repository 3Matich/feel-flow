import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
} from "@material-tailwind/react";

import { authorsTableData, teamMembersData } from "@/data";


export function Team() {
    return (
        <>
            <Card color="transparent" className="mb-9 p-4 mt-4">
                <CardHeader color="transparent" shadow={false} className="p-2 flex items-center gap-3 rounded-full">
                    <img src="/img/scuderia.jpg" alt="" srcset="" className="w-20" />
                    <Typography variant="h4" color="blue">Los Oompa-Loompas</Typography> {/* Nombre del equipo */}
                </CardHeader>
                <CardBody>
                    {/* Descripcion del equipo */}
                    <Typography>En este equipo solo se acpetan personas de baja estatura, aproximadamente 1.60 m, que viven alrededor de 50 años. Su comida favorita tiene que ser los granos de cacao, que eran muy escasos en Loompalandia. </Typography>
                </CardBody>
            </Card>
            <Card color="transparent" className="p-4">
                <CardHeader variant="gradient" color="blue" className="mb-7 p-6">
                    <Typography variant="h6" color="white">
                        Miembros del equipo
                    </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2"> {/* Datos del equipo */}
                    {/* Miembros */}
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Usuario", "Funcion", "Ingreso", ""].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembersData.map(
                                ({ img, name, email, job, online, date }, key) => {
                                    const className = `py-3 px-5 ${key === teamMembersData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={name}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={img} alt={name} size="sm" variant="rounded" />
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {job[0]}
                                                </Typography>
                                                <Typography className="text-xs font-normal text-blue-gray-500">
                                                    {job[1]}
                                                </Typography>
                                            </td>
                                            {/* 
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={online ? "green" : "blue-gray"}
                                                    value={online ? "online" : "offline"}
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                />
                                            </td>
                                            */}
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {date}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    View
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>


        </>
    )
}
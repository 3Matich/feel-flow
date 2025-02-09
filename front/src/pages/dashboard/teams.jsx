import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { teamsData } from "@/data"; // Asegúrate de tener estos datos

export function Teams() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeams = teamsData.filter(({ name, leader }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leader.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Card color="transparent" className="mb-6 p-4 mt-10">
                <CardHeader color="transparent" shadow={false} className="p-2 mb-0">
                    <Typography variant="h4" color="blue">Equipos</Typography>
                </CardHeader>
                <CardBody className="mb-1">
                    <Input
                        icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                        type="text"
                        placeholder="Buscar equipo o Team Leader..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-3 w-full"
                    />
                    <table className="w-full min-w-full table-auto border-collapse mt-5">
                        <thead>
                            <tr className="bg-blue-gray-50">
                                {["Equipo", "Team Leader"].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-100 py-3 px-5 text-left text-blue-gray-600 uppercase text-sm font-bold"
                                    >
                                        {el}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeams.map(({ logo, name, leader }, key) => (
                                <tr key={name} className="hover:bg-blue-gray-50 transition-all">
                                    <td className="py-3 px-5 border-b border-blue-gray-100 flex items-center gap-4">
                                        <Avatar src={logo} alt={name} size="sm" variant="rounded" />
                                        <Typography className="font-semibold text-blue-gray-700">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-100">
                                        <Typography className="text-sm font-semibold text-blue-gray-700">
                                            {leader}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
}

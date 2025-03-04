import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    IconButton,
    Input,
    Textarea,
    Spinner,
    Alert
} from "@material-tailwind/react";
import { teamMembersData } from "@/data";
import { CheckCircleIcon, Pencil } from "lucide-react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export function Team() {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [teamName, setTeamName] = useState("Los Oompa-Loompas");
    const [teamDescription, setTeamDescription] = useState(
        "En este equipo solo se aceptan personas de baja estatura, aproximadamente 1.60 m, que viven alrededor de 50 años. Su comida favorita tiene que ser los granos de cacao, que eran muy escasos en Loompalandia."
    );

    const handleEditToggle = () => {
        if (!isSaving) {
            setIsEditing(!isEditing);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsEditing(false);
            setIsSaving(false);
            setSuccessMessage("¡Equipo actualizado con éxito! ✅");

            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => setSuccessMessage(""), 3000);
        }, 1500);
    };

    return (
        <>
            {/* Mensaje de éxito */}
            {successMessage && (
                <Alert
                    color="green"
                    icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
                    className="mb-4"
                    onClose={() => setSuccessMessage("")}
                >
                    {successMessage}
                </Alert>
            )}

            {/* Tarjeta del Equipo */}
            <Card color="transparent" className="mb-8 p-6 mt-6 shadow-lg rounded-xl border border-gray-200">
                <CardHeader color="transparent" shadow={false} className="p-3 flex justify-between items-center rounded-lg">
                    <div className="flex items-center gap-2">
                        <img
                            src="/img/scuderia.jpg"
                            alt="Equipo"
                            className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg"
                        />

                        {isEditing ? (
                            <Input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 text-lg font-semibold text-gray-900 w-full"
                            />
                        ) : (
                            <Typography variant="h4" color="blue" className="font-semibold leading-tight">
                                {teamName}
                            </Typography>
                        )}
                    </div>
                    <IconButton variant="text" color="blue" onClick={handleEditToggle} className="ml-2">
                        <Pencil size={20} />
                    </IconButton>
                </CardHeader>
                <CardBody className="pt-3">
                    {isEditing ? (
                        <Textarea
                            value={teamDescription}
                            onChange={(e) => setTeamDescription(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-gray-700 w-full resize-none"
                            rows={3}
                        />
                    ) : (
                        <Typography className="text-gray-700 leading-tight">{teamDescription}</Typography>
                    )}

                    {isEditing && (
                        <div className="mt-3 flex gap-2">
                            <Button variant="gradient" color="red" onClick={handleEditToggle} disabled={isSaving}>
                                Cancelar
                            </Button>
                            <Button variant="gradient" color="indigo" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? <Spinner className="h-4 w-4" /> : "Guardar"}
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>


            {/* Tarjeta de Miembros */}
            <Card color="transparent" className="p-2 shadow-lg rounded-xl border border-gray-200">
                <CardHeader variant="gradient" color="blue" className="mb-6 p-6 flex justify-between items-center rounded-lg">
                    <Typography variant="h6" color="white" className="font-medium">Miembros del Equipo</Typography>
                    <Button color="white" className="flex items-center gap-2 shadow-md">
                        <UserPlusIcon className="h-5 w-5" />
                        Invitar Miembro
                    </Button>
                </CardHeader>
                <CardBody className="px-4 pt-0 pb-4">
                    <table className="w-full min-w-[640px] table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                {["Usuario", "Función", "Ingreso", ""].map((el) => (
                                    <th key={el} className="border-b border-gray-300 py-3 px-5 text-left text-gray-700">
                                        <Typography variant="small" className="text-[11px] font-bold uppercase">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembersData.map(({ img, name, email, job, date }, key) => {
                                const className = `py-3 px-5 ${key === teamMembersData.length - 1 ? "" : "border-b border-gray-200"}`;
                                return (
                                    <tr key={name} className="hover:bg-gray-50 transition-colors">
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Avatar src={img} alt={name} size="md" variant="rounded" className="shadow-md" />
                                                <div>
                                                    <Typography variant="small" className="font-semibold text-gray-800">{name}</Typography>
                                                    <Typography className="text-xs text-gray-500">{email}</Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-gray-700">{job[0]}</Typography>
                                            <Typography className="text-xs text-gray-500">{job[1]}</Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-gray-700">{date}</Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography as="a" href="#" className="text-xs font-semibold text-blue-600 hover:underline">Ver</Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
}

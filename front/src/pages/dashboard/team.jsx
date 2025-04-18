import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
    Button,
    IconButton,
    Input,
    Textarea,
    Spinner,
    Alert
} from "@material-tailwind/react";
import { ClipboardCopy, X } from "lucide-react";
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
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [closing, setClosing] = useState(false);
    const teamId = "123456"; // Simulación de ID de equipo
    const inviteLink = `https://localhost:5173/auth/signup?invite=${teamId}`;

    const handleOpen = () => {
        if (closing) return;
        setOpen(!open);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => {
            setClosing(true);
            setTimeout(() => {
                setOpen(false);
                setClosing(false);
            }, 300);
        }, 2000);
    };

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
            <Card color="transparent" className="mb-6 p-6 mt-6 shadow-lg rounded-xl border card">
                <CardHeader color="transparent" shadow={false} className="p-3 flex justify-between items-center rounded-lg">
                    <div className="flex items-center gap-2 text-light-text dark:text-dark-text">
                        <img
                            src="/img/scuderia.jpg"
                            alt="Equipo"
                            className="w-20 h-20 object-cover rounded-full shadow-lg"
                        />

                        {isEditing ? (
                            <Input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="rounded-lg p-2 text-lg w-full text-light-text dark:text-dark-text"
                            />
                        ) : (
                            <Typography variant="h4" className="leading-tight">
                                {teamName}
                            </Typography>
                        )}
                    </div>
                    <IconButton variant="text" color="indigo" onClick={handleEditToggle} className="ml-2">
                        <Pencil size={20} />
                    </IconButton>
                </CardHeader>
                <CardBody className="pt-3 pb-2 text-light-text-secondary dark:text-dark-text-secondary">
                    {isEditing ? (
                        <Textarea
                            value={teamDescription}
                            onChange={(e) => setTeamDescription(e.target.value)}
                            className="rounded-lg p-2 w-full resize-none text-light-text-secondary dark:text-dark-text-secondary"
                            rows={3}
                        />
                    ) : (
                        <Typography className="leading-tight">{teamDescription}</Typography>
                    )}

                    {isEditing && (
                        <div className="flex gap-2">
                            <Button variant="text" onClick={handleEditToggle} disabled={isSaving} className="button-cancel">
                                Cancelar
                            </Button>
                            <Button variant="gradient" onClick={handleSave} disabled={isSaving} className="button-save">
                                {isSaving ? <Spinner className="h-4 w-4" /> : "Guardar"}
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>



            {/* Tarjeta de Miembros */}
            <Card color="transparent" className="p-2 shadow-lg rounded-xl border card-header">
                <CardHeader className="-mt-5 mb-6 p-6 flex justify-between items-center rounded-lg card">
                    <Typography variant="h6" className="font-medium">Miembros del quipo</Typography>
                    <Button onClick={handleOpen} color="none" variant="filled" className="flex items-center gap-2 hover:shadow-lg button-custom">
                        <UserPlusIcon className="h-5 w-5" />
                        Invitar Miembro
                    </Button>
                </CardHeader>
                <CardBody className="px-4 pt-0 pb-4">
                    <table className="w-full min-w-[640px] table-auto border-collapse">
                        <thead>
                            <tr className="table-header">
                                {["Usuario", "Función", "Ingreso", ""].map((el) => (
                                    <th key={el} className="py-3 px-5 text-left table-header-cell">
                                        <Typography variant="small" className="text-[11px] font-bold uppercase">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembersData.map(({ img, name, email, job, date }, key) => {
                                const className = `py-3 px-5 table-body-cell ${key === teamMembersData.length - 1 ? "" : "border-b border-gray-200"}`;
                                return (
                                    <tr key={name} className="hover:dark:bg-blue-gray-900 hover:bg-blue-gray-50 transition-colors table-body">
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Avatar src={img} alt={name} size="md" variant="rounded" className="shadow-md" />
                                                <div>
                                                    <Typography variant="small" className="font-semibold">{name}</Typography>
                                                    <Typography className="text-xs">{email}</Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold">{job[0]}</Typography>
                                            <Typography className="text-xs">{job[1]}</Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold">{date}</Typography>
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

            {/* Modal para invitar miembros */}

            <Dialog open={open} handler={handleOpen} size="sm" className={`transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}>
                <DialogHeader className="flex justify-between items-center">
                    <Typography variant="h5">Invitar a un nuevo miembro</Typography>
                    <IconButton variant="text" color="gray" onClick={handleOpen}>
                        <X size={20} />
                    </IconButton>
                </DialogHeader>
                <DialogBody>
                    <div className="mt-4 flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                        <Typography className="text-sm text-blue-500 truncate w-full">
                            {inviteLink}
                        </Typography>
                        <IconButton onClick={copyToClipboard} color={copied ? "green" : "indigo"} className={`transition-transform duration-200 ${copied ? 'scale-110' : ''}`}>
                            <ClipboardCopy size={20} />
                        </IconButton>
                    </div>
                    {copied && (
                        <Typography className="mt-2 text-green-500 text-sm animate-bounce">¡Link copiado!</Typography>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="red" onClick={handleOpen} className="mr-2">Cancelar</Button>
                    <Button variant="gradient" color="indigo" onClick={copyToClipboard}>Copiar Link</Button>
                </DialogFooter>
            </Dialog>

        </>
    );
}

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton
} from "@material-tailwind/react";
import { teamMembersData } from "@/data";
import { ClipboardCopy, X } from "lucide-react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export function Team() {
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

    return (
        <>
            <Card color="transparent" className="mb-9 p-4 mt-4">
                <CardHeader color="transparent" shadow={false} className="p-2 flex items-center gap-3 rounded-full">
                    <img src="/img/scuderia.jpg" alt="" className="w-20" />
                    <Typography variant="h4" color="blue">Los Oompa-Loompas</Typography>
                </CardHeader>
                <CardBody>
                    <Typography>En este equipo solo se aceptan personas de baja estatura...</Typography>
                </CardBody>
            </Card>
            <Card color="transparent" className="p-4">
                <CardHeader variant="gradient" color="blue" className="mb-7 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">Miembros del equipo</Typography>
                    <Button color="white" onClick={handleOpen} className="flex items-center gap-2">
                        <UserPlusIcon className="h-5 w-5" />
                        Invitar Miembro
                    </Button>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Usuario", "Función", "Ingreso", ""].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembersData.map(({ img, name, email, job, date }, key) => {
                                const className = `py-3 px-5 ${key === teamMembersData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                return (
                                    <tr key={name}>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Avatar src={img} alt={name} size="sm" variant="rounded" />
                                                <div>
                                                    <Typography variant="small" color="blue-gray" className="font-semibold">{name}</Typography>
                                                    <Typography className="text-xs font-normal text-blue-gray-500">{email}</Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">{job[0]}</Typography>
                                            <Typography className="text-xs font-normal text-blue-gray-500">{job[1]}</Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">{date}</Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">View</Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            {/* Modal para invitar miembros */}
            <Dialog open={open} handler={handleOpen} size="sm" className={`transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}` }>
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
                        <IconButton onClick={copyToClipboard} color={copied ? "green" : "indigo1"} className={`transition-transform duration-200 ${copied ? 'scale-110' : ''}`}>
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

import React, { useState, useEffect } from "react";
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
import { CheckCircleIcon, Pencil } from "lucide-react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { getAvailableTeams } from "@/services/modulos/getAvailableTeams";

export function Team() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [teamData, setTeamData] = useState(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [closing, setClosing] = useState(false);

  const inviteLink = teamData ? `https://localhost:5173/auth/signup?invite=${teamData.uuid}` : "";

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

      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const allTeams = await getAvailableTeams();
        console.log("📦 Equipos disponibles:", allTeams);
        if (allTeams.length > 0) {
          setTeamData(allTeams[0]);
        } else {
          console.warn("⚠️ No hay equipos disponibles");
        }
      } catch (error) {
        console.error("❌ Error al obtener equipos:", error);
      }
    };

    fetchTeam();
  }, []);

  if (!teamData) {
    return (
      <Typography variant="h6" className="p-6 text-center text-gray-700">
        Cargando datos del equipo...
      </Typography>
    );
  }

  const teamName = teamData.nameTeam;
  const teamDescription = teamData.descriptionTeam;
  const teamMembers = teamData.regularUsers || [];

  return (
    <>
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

      <Card color="transparent" className="mb-6 p-6 mt-6 shadow-lg rounded-xl border border-gray-200">
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
                className="border border-gray-300 rounded-lg p-2 text-lg font-semibold text-gray-900 w-full"
                disabled
              />
            ) : (
              <Typography variant="h4" color="blue" className="font-semibold leading-tight">
                {teamName}
              </Typography>
            )}
          </div>
          <IconButton variant="text" color="indigo" onClick={handleEditToggle} className="ml-2">
            <Pencil size={20} />
          </IconButton>
        </CardHeader>
        <CardBody className="pt-3 pb-2">
          {isEditing ? (
            <Textarea
              value={teamDescription}
              onChange={() => {}}
              className="border border-gray-300 rounded-lg p-2 text-gray-700 w-full resize-none"
              rows={3}
              disabled
            />
          ) : (
            <Typography className="text-gray-700 leading-tight">{teamDescription}</Typography>
          )}

          {isEditing && (
            <div className="flex gap-2">
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

      <Card color="transparent" className="p-2 shadow-lg rounded-xl border border-gray-200">
        <CardHeader variant="gradient" color="blue" className="-mt-5 mb-6 p-6 flex justify-between items-center rounded-lg">
          <Typography variant="h6" color="white" className="font-medium">Miembros del equipo</Typography>
          <Button color="white" onClick={handleOpen} className="flex items-center gap-2">
            <UserPlusIcon className="h-5 w-5" />
            Invitar Miembro
          </Button>
        </CardHeader>
        <CardBody className="px-4 pt-0 pb-4">
          {teamMembers.length === 0 ? (
            <Typography className="text-center text-gray-500">Este equipo aún no tiene miembros asignados.</Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {"Usuario,Descripción,Empresa,Teléfono".split(",").map((el) => (
                    <th key={el} className="border-b border-gray-300 py-3 px-5 text-left text-gray-700">
                      <Typography variant="small" className="text-[11px] font-bold uppercase">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.uuid} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5 border-b border-gray-200">
                      <Typography className="font-semibold text-gray-800">
                        {member.name} {member.surname}
                      </Typography>
                      <Typography className="text-xs text-gray-500">{member.username}</Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-gray-200">
                      <Typography className="text-sm text-gray-700">{member.description}</Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-gray-200">
                      <Typography className="text-sm text-gray-700">{member.enterpriseInfoHomeDTO?.name || '-'}</Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-gray-200">
                      <Typography className="text-sm text-gray-700">{member.phoneNumber}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

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

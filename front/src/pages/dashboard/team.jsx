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
import { GetTeam } from "@/api/teams/getTeams";

import { FeelFlowSpinner } from "@/components";

import { EditTeam, ViewTeam } from "@/widgets/pages/team";
import { NotFoundPage } from ".";

export function Team() {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [teamData, setTeamData] = useState(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = () => {
    setIsEditing(!isEditing);
    fetchTeam();
  }

  const fetchTeam = async () => {
    try {
      setLoading(true); // 👈 importante para que aparezca el spinner si querés
      const allTeams = await GetTeam();

      if (allTeams.length > 0) {
        setTeamData(allTeams[0]);
      } else {
        // console.warn("⚠️ No hay equipos disponibles");
        setTeamData(null); // o un valor vacío
      }
    } catch (error) {
      console.error("❌ Error al obtener equipos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  if (loading) {
    return <FeelFlowSpinner />;
  }

  if (!teamData && !loading) {
    return <NotFoundPage />;
  }

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

      {isEditing
        ? (<EditTeam uuid={teamData.uuid} teamName={teamData.nameTeam} teamDescription={teamData.descriptionTeam} handleEdit={handleEdit} />)
        : (<ViewTeam teamName={teamData.nameTeam} teamDescription={teamData.descriptionTeam} handleEdit={handleEdit} />)
      }

      {/* Tabla de miembros */}
      <Card color="transparent" className="p-2 shadow-lg rounded-xl border card-header">
        <CardHeader variant="gradient" className="-mt-5 mb-6 p-6 flex justify-between items-center rounded-lg card">
          <Typography variant="h6" className="font-medium">Miembros del equipo</Typography>
          <Button onClick={handleOpen} variant="filled" className="flex items-center gap-2 hover:shadow-lg button-custom">
            <UserPlusIcon className="h-5 w-5" />
            Invitar Miembro
          </Button>
        </CardHeader>
        <CardBody className="px-4 pt-0 pb-4">
          {teamMembers.length === 0 ? (
            <Typography className="text-center">Este equipo aún no tiene miembros asignados.</Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto card">
              <thead>
                <tr className="table-header">
                  {"Usuario,Descripción,Empresa,Teléfono".split(",").map((el) => (
                    <th key={el} className="border table-header-cell py-3 px-5 text-left">
                      <Typography variant="small" className="font-bold card-header">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.uuid} className="table-body hover:dark:bg-blue-gray-900 hover:bg-blue-gray-50 transition-colors">
                    <td className="py-3 px-5 table-body-cell">
                      <Typography>
                        {member.name} {member.surname}
                      </Typography>
                      <Typography className="text-xs">{member.username}</Typography>
                    </td>
                    <td className="py-3 px-5 table-body-cell">
                      <Typography className="text-sm">{member.description}</Typography>
                    </td>
                    <td className="py-3 px-5 table-body-cell">
                      <Typography className="text-sm">{member.enterpriseInfoHomeDTO?.name || '-'}</Typography>
                    </td>
                    <td className="py-3 px-5 table-body-cell">
                      <Typography className="text-sm">{member.phoneNumber}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      {/* Invitar miembro */}
      <Dialog open={open} handler={handleOpen} size="sm" className={`card transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}>
        <DialogHeader className="flex justify-between items-center">
          <Typography variant="h5">Invitar a un nuevo miembro</Typography>
          <IconButton variant="text" color="pink" onClick={handleOpen}>
            <X size={20} />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <div className="mt-4 flex items-center gap-2 border rounded-lg p-2">
            <Typography className="text-sm truncate w-full">
              {inviteLink}
            </Typography>
            <IconButton onClick={copyToClipboard} color={copied ? "green" : "indigo"} className={`transition-transform duration-200 ${copied ? 'scale-110' : ''}`}>
              <ClipboardCopy size={20} />
            </IconButton>
          </div>
          {copied && (
            <Typography className="mt-2 text-sm animate-bounce">¡Link copiado!</Typography>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="filled" className="button-cancel mr-2" onClick={handleOpen}>Cancelar</Button>
          <Button variant="filled" className="button-custom" onClick={copyToClipboard}>Copiar Link</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
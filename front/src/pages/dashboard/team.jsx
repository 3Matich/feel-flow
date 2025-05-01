import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Alert
} from "@material-tailwind/react";
import { CheckCircleIcon, Pencil } from "lucide-react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { GetTeam } from "@/api/teams/getTeams";

import { FeelFlowSpinner } from "@/components";

import { EditTeam, ViewTeam, InviteMember } from "@/widgets/pages/team";
import { NotFoundPage } from ".";


export function Team() {
  const [isEditing, setIsEditing] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // const inviteLink = teamData ? `https://localhost:5173/auth/signup?invite=${teamData.uuid}` : "";

  const handleOpenInvite = () => setOpen(!open);

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
        setLoading(false);
      } else {
        // console.warn("⚠️ No hay equipos disponibles");
        setTeamData(null); // o un valor vacío
        setLoading(false);
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
      {isEditing
        ? (<EditTeam uuid={teamData.uuid} teamName={teamData.nameTeam} teamDescription={teamData.descriptionTeam} handleEdit={handleEdit} />)
        : (<ViewTeam teamName={teamData.nameTeam} teamDescription={teamData.descriptionTeam} handleEdit={handleEdit} />)
      }

      {/* Tabla de miembros */}
      <Card color="transparent" className="p-2 shadow-lg rounded-xl border card-header">
        <CardHeader variant="gradient" className="-mt-5 mb-6 p-6 flex justify-between items-center rounded-lg card">
          <Typography variant="h6" className="font-medium">Miembros del equipo</Typography>
          <Button onClick={handleOpenInvite} variant="filled" className="flex items-center gap-2 hover:shadow-lg button-custom">
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
      <InviteMember
        uuid={teamData.uuid}
        open={open}
        handleOpen={handleOpenInvite}
      />
    </>
  );
}
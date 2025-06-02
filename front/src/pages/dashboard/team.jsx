// src/widgets/Team.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { 
  GetTeam, 
  GetEquipobyID, 
  getTeamImageById 
} from "@/api";
import { FeelFlowSpinner } from "@/components";
import { ViewTeam, InviteMember } from "@/widgets";
import { NotFoundPage } from ".";
import { useLocation } from "react-router-dom";
import EditTeamDialog from "@/widgets/dialogs/EditTeamDialog";
import EditTeamImageDialog from "@/widgets/dialogs/EditTeamImageDialog";

export function Team() {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editDataOpen, setEditDataOpen] = useState(false);
  const [editImageOpen, setEditImageOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const { pathname } = useLocation();
  const seg = pathname.split("/").filter(Boolean);
  const teamID =
    seg.length >= 2 && seg[seg.length - 2] === "equipos"
      ? seg[seg.length - 1]
      : null;

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const all = teamID
        ? [await GetEquipobyID(token, teamID)]
        : await GetTeam();
      setTeamData(all[0] || null);
    } catch (e) {
      console.error(e);
      setTeamData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true);
      fetchTeam();
    }
  }, [hasFetched]);

  useEffect(() => {
    if (teamData) {
      getTeamImageById(teamData.uuid)
        .then((r) =>
          setImageSrc(`data:${r.fileType};base64,${r.fileData}`)
        )
        .catch(() => setImageSrc("/img/avatar/0000.png"));
    }
  }, [teamData]);

  if (loading) return <FeelFlowSpinner />;
  if (!teamData) return <NotFoundPage />;

  const members = teamData.regularUsers || [];

  return (
    <>
      {/*—— Encabezado único con imagen, datos y lápiz ——*/}
      <Card color="transparent" className="mb-6 p-6 shadow-lg rounded-xl border">
        <CardHeader
          color="transparent"
          shadow={false}
          className="p-4 flex items-center justify-between rounded-lg"
        >
          <div className="flex items-center gap-4">
            <img
              src={imageSrc || "/img/avatar/0000.png"}
              alt="Equipo"
              className="w-24 h-24 object-cover rounded-full border-4 shadow-lg cursor-pointer"
              onClick={() => setEditImageOpen(true)}
            />
            <div>
              <Typography variant="h5">
                {teamData.nameTeam}
              </Typography>
              <Typography variant="small" className="text-gray-600">
                {teamData.descriptionTeam}
              </Typography>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="text"
              className="p-2"
              onClick={() => setEditDataOpen(true)}
            >
              <PencilIcon className="h-5 w-5 text-pink-500" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/*—— Mantengo aquí EXACTAMENTE tu bloque original de miembros ——*/}
      <Card color="transparent" className="p-2 shadow-lg rounded-xl border card-header">
        <CardHeader variant="gradient" className="-mt-5 mb-6 p-6 flex justify-between items-center rounded-lg card">
          <Typography variant="h6" className="font-medium">
            Miembros del equipo
          </Typography>
          <Button
            onClick={() => setInviteOpen((o) => !o)}
            variant="filled"
            className="flex items-center gap-2 hover:shadow-lg button-custom"
          >
            <UserPlusIcon className="h-5 w-5" /> Invitar Miembro
          </Button>
        </CardHeader>
        <CardBody className="px-4 pt-0 pb-4">
          {members.length === 0 ? (
            <Typography className="text-center">
              Este equipo aún no tiene miembros asignados.
            </Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto card">
              <thead>
                <tr className="table-header">
                  {["Usuario","Descripción","Teléfono"].map(h => (
                    <th key={h} className="border table-header-cell py-3 px-5 text-left">
                      <Typography variant="small" className="font-bold card-header">
                        {h}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr
                    key={m.uuid}
                    className="table-body hover:dark:bg-blue-gray-900 hover:bg-blue-gray-50 transition-colors"
                  >
                    <td className="py-3 px-5 table-body-cell">
                      <Typography>
                        {m.name} {m.surname}
                      </Typography>
                      <Typography className="text-xs">
                        {m.username}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 table-body-cell">
                      <Typography className="text-sm">
                        {m.description}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 table-body-cell">
                      <Typography className="text-sm">
                        {m.phoneNumber}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      {/*—— Invitar miembro y modales ——*/}
      <InviteMember
        uuid={teamData.uuid}
        open={inviteOpen}
        handleOpen={() => setInviteOpen(o => !o)}
      />

      <EditTeamDialog
        uuid={teamData.uuid}
        teamName={teamData.nameTeam}
        teamDescription={teamData.descriptionTeam}
        open={editDataOpen}
        onClose={() => {
          setEditDataOpen(false);
          setHasFetched(false);
        }}
      />

      <EditTeamImageDialog
        uuid={teamData.uuid}
        open={editImageOpen}
        onClose={() => {
          setEditImageOpen(false);
          setHasFetched(false);
        }}
      />
    </>
  );
}

export default Team;

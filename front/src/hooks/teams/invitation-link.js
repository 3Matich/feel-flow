import { frontHost } from "@/configs";

import { InviteMember } from "@/api";

export async function GenerateInvitation( idTeam ) {
    // console.log("ID del equipo proporcionado: ", idTeam)
    const response = await InviteMember(idTeam);
    // console.log(response.uuid);
    
    let invitationLink = `${frontHost}/auth/sign-up?inviteToken=${response.uuid}`

    return invitationLink;
}

export default GenerateInvitation;
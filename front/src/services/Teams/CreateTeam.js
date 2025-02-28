import { getAuthData } from "../session";
export async function createTeam(nameTeam, descriptionTeam, nameTeamLeader, surnameTeamLeader, usernameTL, passwordTL) {
    const { token } = getAuthData();
    const body = {
        nameTeam: nameTeam,
        descriptionTeam: descriptionTeam,
        teamLeaderDTO: {
            name: nameTeamLeader,
            surname: surnameTeamLeader,
            username: usernameTL,
            password: passwordTL
        }
    };

    try {
        const response = await fetch('http://localhost:8080/api/v1/team', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.status !== 201) {
            const errorData = await response.json();
            // Access the "message" field from the response
            return { errors: errorData };
        }
    } catch (error) {
        return { errors: { general: "Error de red o servidor." } };
    }
}

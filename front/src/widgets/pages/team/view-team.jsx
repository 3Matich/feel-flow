import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { Pencil } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getTeamImage } from "@/api";
import { getTeamImageById } from "@/api";


export function ViewTeam({ teamName, teamDescription, handleEdit }) {
    const [teamImage, setTeamImage] =  React.useState();
    const [fetch, setFetch] = React.useState(false);
    // Estados para obtener la página y ejecutar los llamados al backend necesarios
      const { pathname } = useLocation();
      const segments = pathname.split("/").filter((el) => el !== "");
    
      let page = null;
      let teamID = null;
    
      if (segments.length >= 3 && segments[segments.length - 2] === "equipos") {
        page = segments[segments.length - 2];
        teamID = segments[segments.length - 1];
    }

    const fetchImage = async() => {
        const res = teamID === null ? await getTeamImage() : await getTeamImageById(teamID);
        setTeamImage(`data:${res.fileType};base64,${res.fileData}`)

    }
    React.useEffect(() => {
        if (!fetch) {
            setFetch(true);
            fetchImage();
        }

    }, [fetch])

    return (
        <Card color="transparent" className="mb-6 p-6 mt-6 shadow-lg rounded-xl border">
            <CardHeader color="transparent" shadow={false} className="p-3 flex justify-between items-center rounded-lg">
                <div className="flex items-center gap-2">
                    <img
                        src={teamImage} //"/img/scuderia.jpg"
                        alt="Equipo"
                        className="w-20 h-20 object-cover rounded-full border-4 shadow-lg"
                    />
                    <Typography variant="h4" className="leading-tight">
                        {teamName}
                    </Typography>
                </div>
                <IconButton variant="text" color="pink" onClick={handleEdit} className="ml-2">
                    <Pencil size={20} />
                </IconButton>
            </CardHeader>
            <CardBody className="pt-3 pb-2">
                <Typography className="leading-tight">{teamDescription}</Typography>
            </CardBody>
        </Card>
    )
}
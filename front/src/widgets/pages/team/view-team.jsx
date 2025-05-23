import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { Pencil } from "lucide-react";

import { getTeamImage } from "@/api";


export function ViewTeam({ teamName, teamDescription, handleEdit }) {
    const [teamImage, setTeamImage] =  React.useState();
    const [fetch, setFetch] = React.useState(false);

    const fetchImage = async() => {
        const res = await getTeamImage();
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
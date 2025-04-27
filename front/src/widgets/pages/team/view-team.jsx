import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { Pencil } from "lucide-react";


export function ViewTeam({ teamName, teamDescription, handleEdit }) {

    return (
        <Card color="transparent" className="mb-6 p-6 mt-6 shadow-lg rounded-xl border">
            <CardHeader color="transparent" shadow={false} className="p-3 flex justify-between items-center rounded-lg">
                <div className="flex items-center gap-2">
                    <img
                        src="/img/scuderia.jpg"
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
import React from "react";

// Components
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Textarea,
    IconButton,
} from "@material-tailwind/react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";


// Functions
import { UpdateTeam } from "@/api";

export function EditTeam( {uuid, teamName, teamDescription, handleEdit} ) {
    const [newTeamName, setNewTeamName] = React.useState(teamName);
    const [newTeamDescription, setNewTeamDescription] = React.useState(teamDescription);
    
    const handleSave = async () => {
        try {
            const updatedData = {
                nameTeam: newTeamName,
                descriptionTeam: newTeamDescription,
            };

            await UpdateTeam(uuid, updatedData);

            handleEdit();
        } catch (error) {
            console.error("❌ Error al guardar el equipo:", error);
        }
    };

    return (
        <Card color="transparent" className="mb-6 p-6 mt-6 shadow-lg rounded-xl border">
            <CardHeader color="transparent" shadow={false} className="p-3 flex justify-between items-center rounded-lg">
                <div className="flex items-center gap-2">
                    <img
                        src="/img/scuderia.jpg"
                        alt="Equipo"
                        className="w-20 h-20 object-cover rounded-full border-4 shadow-lg"
                    />
                    <Input
                        type="text"
                        placeholder={newTeamName}
                        value={newTeamName}
                        className="border rounded-lg p-2 text-lg w-full card"
                        onChange={(e) => setNewTeamName(e.target.value)}
                    />
                </div>
                <div>
                    <IconButton variant="text" color="pink" onClick={handleEdit} className="ml-2">
                        <XMarkIcon class="h-6 w-6" />
                    </IconButton>
                    <IconButton variant="text" color="pink" onClick={handleSave} className="ml-2">
                        <CheckIcon class="h-6 w-6" />
                    </IconButton>
                </div>
            </CardHeader>
            <CardBody className="pt-3 pb-2">
                <Textarea
                    rows={3}
                    resize={true}
                    size="md"
                    variant="standard"
                    placeholder={newTeamDescription}
                    value={newTeamDescription}
                    onChange={(e) => setNewTeamDescription(e.target.value)}
                    name="description"
                    className="border rounded-lg p-2 w-full resize-none card"
                />
            </CardBody>
        </Card>
    )
}
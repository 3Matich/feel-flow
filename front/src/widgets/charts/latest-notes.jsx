import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { GetNotificationsNikoNiko } from "@/api";
import { FeelFlowSpinner } from "@/components";

export const LatestNotes = () => {
    const [notifications, setNotifications] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const data = await GetNotificationsNikoNiko();
            if (data) {
                setNotifications(data);
                setEnterpriseLogo(`data:${fileType};base64,${fileData}`)
                setLoading(false);
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <Card className="border card shadow-sm">
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
                <Typography variant="h6" className="mb-2">
                    Últimas Notas de Niko Niko
                </Typography>
            </CardHeader>
            <CardBody className="pt-0">
                {loading && <FeelFlowSpinner />}
                {notifications.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 italic">
                        No hay actividad reciente en el módulo.
                    </div>
                ) : (

                    notifications.map(({ regularUser, message, imagesDto }, key) => {
                        const imgSrc = imagesDto?.fileData
                            ? `data:${imagesDto.fileType};base64,${imagesDto.fileData}`
                            : "/public/avatar/0000.png"; // O una imagen por defecto si no hay

                        return (<div key={key} className="flex items-start gap-4 py-3">
                            <Avatar size="lg" alt={regularUser} src={imgSrc} />
                            <div>
                                <Typography variant="small" className="block">
                                    {regularUser}
                                </Typography>
                                <Typography variant="small" className="text-xs">
                                    {message}
                                </Typography>
                            </div>
                        </div>
                        )
                    })
                )}
            </CardBody>
        </Card>
    )
} 
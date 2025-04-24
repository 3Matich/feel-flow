import { Card, CardBody } from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";

const events = [
    { user: "Pedro", action: "actualizó el estado de Kudos", time: "Hace 2 horas" },
    { user: "María", action: "completó la encuesta de 12 Pasos", time: "Hace 4 horas" },
    { user: "Carlos", action: "agregó un comentario en Niko Niko", time: "Ayer" },
    { user: "Ana", action: "marcó Niko Niko como revisado", time: "Hace 1 día" },
];

export function ActivityFeed() {
    return (
        <Card className="p-4 h-[350px] card">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <BellIcon className="w-5 h-5 text-pink-500" /> Últimos Eventos
            </h2>
            <CardBody className="overflow-y-auto max-h-[280px]">
                {events.length === 0 ? (
                    <p className="italic">No hay actividad reciente.</p>
                ) : (
                    <ul className="space-y-3 w-full">
                        {events.map((event, index) => (
                            <li key={index} className="border-b pb-2">
                                <span className="font-bold">{event.user}</span> {event.action}
                                <span className="text-sm block">{event.time}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </CardBody>
        </Card>
    );
};

export default ActivityFeed;

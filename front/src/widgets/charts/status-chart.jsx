import {
    Card,
    CardBody,
    Tooltip,
} from "@material-tailwind/react";

export function StatusChart() {
    const modules = [
        { name: "12 Pasos de la Felicidad", status: "Activo", color: "bg-green-500" },
        { name: "Niko Niko", status: "No Iniciado", color: "bg-gray-500" },
        { name: "Kudos", status: "Finalizado", color: "bg-blue-500" },
    ];

    return (
        <>
            {modules.map((module) => (
                <Card key={module.name} className="p-4 card">
                    <CardBody className="flex justify-between items-center">
                        <h2 className="text-lg">{module.name}</h2>
                        <Tooltip content={module.status} >
                            <span className={`w-8 h-8 rounded-full ${module.color}`} />
                        </Tooltip>
                    </CardBody>
                </Card>
            ))}
        </>
    );
};

export default StatusChart;
import {
    Card,
    CardBody,
    Tooltip,
} from "@material-tailwind/react";

import {
    ActivityFeed,
    CompletionChart,
    ParticipationChart,
    StatusChart,
    Recommendations
} from "@/widgets"


export function Dashboard() {
    const modules = [
        { name: "12 Pasos de la Felicidad", status: "Activo", color: "bg-green-500" },
        { name: "Niko Niko", status: "No Iniciado", color: "bg-gray-500" },
        { name: "Kudos", status: "Finalizado", color: "bg-blue-500" },
    ];

    return (
        <>
            <div className="text-center">
                <h1 className="text-2xl font-bold">Actividad en los Módulos</h1>
                <p>Visualiza rápidamente el estado y la actividad de los modulos.</p>
            </div>
            <div className="grid grid-cols-3 gap-5 p-4">
                <StatusChart />
                {/* 
                <ActivityFeed />
                <CompletionChart />
                <ParticipationChart /> 
                */}
            </div>
            <Recommendations />
        </>
    );
};

export default Dashboard;
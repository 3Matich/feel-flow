import {
    StatusChart,
    Recommendations
} from "@/widgets"


export function Dashboard() {
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
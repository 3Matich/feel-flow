import { 
    Card,
    CardBody,
} from "@material-tailwind/react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const participationData = [
    { name: "Participaron", value: 20, color: "#2196F3" },
    { name: "No participaron", value: 10, color: "#FFC107" },
];

export function ParticipationChart() {
    return (
        <Card className="p-4 h-[350px] flex flex-col items-center justify-center card">
            <h2 className="text-lg">Participación en Encuestas</h2>
            <CardBody className="flex justify-center">
                {participationData.length === 0 ? (
                    <p className="text-gray-500 italic">No hay respuestas aún.</p>
                ) : (
                    <PieChart width={250} height={250}>
                        <Pie
                            data={participationData}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            dataKey="value"
                        >
                            {participationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </CardBody>
        </Card>
    );
};

export default ParticipationChart;
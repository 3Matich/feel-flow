import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardBody } from "@material-tailwind/react";

const completionData = [
    { name: "Completado", value: 17, color: "#4CAF50" },
    { name: "Pendiente", value: 10, color: "#F44336" },
];

export function CompletionChart() {
    return (
        <Card className="p-4 h-[350px] flex flex-col items-center justify-center card">
            <h2 className="text-lg">Progreso de los Módulos</h2>
            <CardBody className="flex justify-center">
                {completionData.length === 0 ? (
                    <p className="text-red-500 italic">No hay datos disponibles para mostrar.</p>
                ) : (
                    <PieChart width={250} height={250}>
                        <Pie
                            data={completionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            dataKey="value"
                        >
                            {completionData.map((entry, index) => (
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

export default CompletionChart;
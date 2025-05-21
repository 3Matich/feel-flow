import React from "react";
import { Typography, Card, CardHeader, CardBody, IconButton, Avatar, Tooltip, Progress } from "@material-tailwind/react";
import { EllipsisVerticalIcon, CheckCircleIcon, ArrowUpIcon, FaceSmileIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { StatisticsChart } from "@/widgets";
import { StatisticsCard } from "@/widgets/cards";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const happinessData = [
  { name: "Paso 1", felicidad: 70 },
  { name: "Paso 2", felicidad: 75 },
  { name: "Paso 3", felicidad: 80 },
  { name: "Paso 4", felicidad: 85 },
  { name: "Paso 5", felicidad: 90 },
  { name: "Paso 6", felicidad: 95 },
  { name: "Paso 7", felicidad: 100 },
];

const productivityData = [
  { name: "Ene", productividad: 80 },
  { name: "Feb", productividad: 85 },
  { name: "Mar", productividad: 90 },
  { name: "Abr", productividad: 88 },
  { name: "May", productividad: 92 },
];

const moodData = [
  { name: "Lunes", niko: 3 },
  { name: "Martes", niko: 4 },
  { name: "Miércoles", niko: 5 },
  { name: "Jueves", niko: 4 },
  { name: "Viernes", niko: 5 },
];

export function Resumenes() {

  return (
    <div className="mt-12">
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatisticsCard
          title="Felicidad del Equipo"
          value="95%"
          icon={<FaceSmileIcon className="w-6 h-6 text-white" />}
          footer={<Typography className="text-blue-gray-600">Basado en los 12 pasos de la felicidad</Typography>}
        />
        <StatisticsCard
          title="Kudos Otorgados"
          value="45"
          icon={<HandThumbUpIcon className="w-6 h-6 text-white" />}
          footer={<Typography className="text-blue-gray-600">Esta semana</Typography>}
        />
      </div>

      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader className="p-6">
            <Typography variant="h6" color="blue-gray">Evolución de la Felicidad</Typography>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={happinessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="felicidad" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader className="p-6">
            <Typography variant="h6" color="blue-gray">Productividad Mensual</Typography>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="productividad" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <div className="mb-12">
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader className="p-6">
            <Typography variant="h6" color="blue-gray">Estado de Ánimo (Niko Niko)</Typography>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="niko" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Resumenes;

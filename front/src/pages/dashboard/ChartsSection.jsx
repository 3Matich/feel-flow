import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/solid";
import Chart from "react-apexcharts";

const tendenciaEmocionalData = [2, 1, "personal", -1, 0, "personal", -2];
const diasSemana = ["L", "M", "Mi", "J", "V", "L", "M"];

const processedTendenciaEmocional = tendenciaEmocionalData.map(value =>
  value === "personal" ? -1 : value
);

const tendenciaEmocionalMarkers = tendenciaEmocionalData.map((value, index) =>
  value === "personal" || value === -1
    ? { seriesIndex: 0, dataPointIndex: index, fillColor: "#D0021B", strokeColor: "#D0021B", size: 7 }
    : null
).filter(Boolean);

const tendenciaEmocionalChartOptions = {
  chart: { type: "line", background: "#f3f3f3" },
  colors: ["#4A90E2"],
  stroke: {
    width: 2,
    dashArray: processedTendenciaEmocional.map(value => (value === -1 ? 5 : 0)),
  },
  markers: {
    size: 5,
    discrete: tendenciaEmocionalMarkers,
  },
  xaxis: {
    categories: diasSemana,
  },
};

const tendenciaEmocionalChartSeries = [
  { name: "Emoción", data: processedTendenciaEmocional }
];

const felicidadData = [
  { category: "Ejercicio", value: 80 },
  { category: "Relaciones", value: 70 },
  { category: "Altruismo", value: 60 },
  { category: "Propósito", value: 75 },
  { category: "Resiliencia", value: 65 },
  { category: "Mindfulness", value: 85 },
  { category: "Gratitud", value: 90 },
  { category: "Optimismo", value: 55 },
  { category: "Creatividad", value: 78 },
  { category: "Salud", value: 88 },
  { category: "Diversión", value: 73 },
  { category: "Crecimiento Personal", value: 82 },
];

const felicidadChartOptions = {
  chart: { type: "radar", background: "#f3f3f3" },
  colors: ["#4A90E2"],
  xaxis: { categories: felicidadData.map(item => item.category) },
};

const felicidadChartSeries = [
  { name: "Felicidad", data: felicidadData.map(item => item.value) }
];

const kudosData = [
  { name: "Carlos", kudos: 15, highlight: true },
  { name: "Ana", kudos: 20, highlight: false },
  { name: "Luis", kudos: 10, highlight: false },
  { name: "María", kudos: 25, highlight: true },
  { name: "Pedro", kudos: 5, highlight: false },
];

const defaultBubbleColor = "#F5A623";

const kudosChartOptions = {
  chart: { type: "bubble", background: "#f3f3f3" },
  dataLabels: {
    enabled: true,
    formatter: function (val, { dataPointIndex }) {
      return kudosData[dataPointIndex].name; // Solo muestra el nombre
    },
    style: {
      colors: ["#000000"],
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    min: -1, // Ajuste para evitar que las burbujas se recorten
    max: kudosData.length, // Extiende el rango del eje X
  },
  yaxis: {
    labels: { show: false },
    axisBorder: { show: false },
  },
  grid: {
    padding: { left: -20, right: -20 }, // Reduce espacios laterales
  },
  tooltip: {
    enabled: true,
    custom: function({ series, seriesIndex, dataPointIndex }) {
      const kudosValue = series[seriesIndex][dataPointIndex]; 
      return `<div style="padding: 5px; font-size: 12px; font-weight: bold; color: black;">
                Kudos: ${kudosValue}
              </div>`;
    },
  },
  plotOptions: {
    bubble: {
      zScaling: true, // Ajusta el tamaño de la burbuja para que sea visible
    },
  },
};

const kudosChartSeries = [
  {
    name: "Kudos",
    data: kudosData.map(({ name, kudos, highlight }, index) => ({
      x: index, // Usa índices para mejorar la distribución
      y: kudos,
      z: kudos, // Se asegura que la burbuja tenga un tamaño acorde
      fillColor: highlight ? "#4CAF50" : defaultBubbleColor,
      borderColor: highlight ? "#000000" : "#FFFFFF",
      strokeWidth: highlight ? 3 : 1,
    })),
  },
];

export function ChartsSection() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      {/* Tendencia Emocional - Gráfico de Línea */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Tendencia Emocional</Typography>
          <Chart options={tendenciaEmocionalChartOptions} series={tendenciaEmocionalChartSeries} type="line" height={300} />
        </CardBody>
      </Card>

      {/* Distribución de Felicidad - Radar Chart */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Distribución de Felicidad</Typography>
          <Chart options={felicidadChartOptions} series={felicidadChartSeries} type="radar" height={300} />
        </CardBody>
      </Card>

      {/* Tipos de Kudos por Miembro - Bubble Chart */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Tipos de Kudos por Miembro</Typography>
          <Chart options={kudosChartOptions} series={kudosChartSeries} type="bubble" height={300} />
        </CardBody>
      </Card>
    </div>
  );
}

export default ChartsSection;
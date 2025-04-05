import React, { useEffect, useState } from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import Chart from "react-apexcharts";

import { getAuthData } from "../../services/session";
import { getTwelveStepsSummary } from "../../services/Dashboard/TwelveStepsSummary";
import { getKudosDashboardData } from "../../services/Dashboard/KudosDashboard";
import { getNikoNikoTendencias } from "../../services/Dashboard/NikoNikoDashboard";

export function ChartsSection() {
  const [felicidadSeries, setFelicidadSeries] = useState([]);
  const [felicidadOptions, setFelicidadOptions] = useState({
    chart: { type: "radar", background: "#f3f3f3" },
    colors: ["#4A90E2"],
    xaxis: { categories: [] },
  });

  const [kudosSeries, setKudosSeries] = useState([]);
  const [kudosOptions, setKudosOptions] = useState({
    chart: { type: "bubble", background: "#f3f3f3" },
    dataLabels: {
      enabled: true,
      formatter: function (val, { dataPointIndex, w }) {
        return w.config.series[0].data[dataPointIndex].label;
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
      min: -1,
      max: 5, // 👈 Zoom-out más sutil
    },
    yaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      min: 0,
      max: 5, // 👈 También más compacto
    },
    grid: {
      padding: { left: -20, right: -20 },
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const label = w.config.series[seriesIndex].data[dataPointIndex].label;
        const kudos = w.config.series[seriesIndex].data[dataPointIndex].z;
        return `<div style="padding: 5px; font-size: 12px; font-weight: bold; color: black;">
                  ${label}<br/>Kudos: ${kudos}
                </div>`;
      },
    },
    plotOptions: {
      bubble: {
        zScaling: true,
        minBubbleRadius: 5,
      },
    },
  });

  const [tendenciaSeries, setTendenciaSeries] = useState([]);
  const [tendenciaOptions, setTendenciaOptions] = useState({
    chart: { type: "line", background: "#f3f3f3" },
    colors: ["#4A90E2", "#F5A623"],
    stroke: { width: 2 },
    markers: { size: 5 },
    xaxis: {
      categories: [], // ["L", "M", "Mi", "J", "V"]
    },
    yaxis: {
      min: -2,
      max: 2,
      tickAmount: 4,
      labels: {
        formatter: function (value) {
          switch (value) {
            case 2: return "Muy buena";
            case 1: return "Buena";
            case 0: return "Neutral";
            case -1: return "Mala";
            case -2: return "Muy mala";
            default: return value;
          }
        },
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: "#333",
        }
      },
      title: {
        text: "Estado emocional",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      }
    },
    legend: {
      position: "top",
    },
  });

  useEffect(() => {
    const { token } = getAuthData();

    async function fetchFelicidad() {
      const data = await getTwelveStepsSummary(token);
      const categories = data.map(item => item.categoryName);
      const values = data.map(item => item.average);
      setFelicidadOptions(prev => ({ ...prev, xaxis: { categories } }));
      setFelicidadSeries([{ name: "Felicidad", data: values }]);
    }

    async function fetchKudos() {
      const data = await getKudosDashboardData(token);
      const formatted = data.map((item, index) => ({
        x: index,
        y: item.cantBadges,
        z: item.cantBadges,
        label: item.username,
        fillColor: item.highlight ? "#4CAF50" : "#F5A623",
        borderColor: item.highlight ? "#000000" : "#FFFFFF",
        strokeWidth: item.highlight ? 3 : 1,
      }));
      setKudosSeries([{ name: "Kudos", data: formatted }]);
    }

    async function fetchTendenciaEmocional() {
      const data = await getNikoNikoTendencias(token);
      setTendenciaOptions(prev => ({
        ...prev,
        xaxis: { categories: data.labels }
      }));
      setTendenciaSeries([
        { name: "Inicio del día", data: data.startOfDay },
        { name: "Fin del día", data: data.endOfDay },
      ]);
    }

    fetchFelicidad();
    fetchKudos();
    fetchTendenciaEmocional();
  }, []);

  return (
    <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      {/* 📈 Tendencia Emocional */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Tendencia Emocional</Typography>
          <Chart
            options={tendenciaOptions}
            series={tendenciaSeries}
            type="line"
            height={300}
          />
        </CardBody>
      </Card>

      {/* 🧠 Distribución de Felicidad */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Distribución de Felicidad</Typography>
          <Chart
            options={felicidadOptions}
            series={felicidadSeries}
            type="radar"
            height={300}
          />
        </CardBody>
      </Card>

      {/* 🫧 Kudos por miembro */}
      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Tipos de Kudos por Miembro</Typography>
          <Chart
            options={kudosOptions}
            series={kudosSeries}
            type="bubble"
            height={300}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default ChartsSection;

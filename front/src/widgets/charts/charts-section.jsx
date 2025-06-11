import React, { useEffect, useState } from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import Chart from "react-apexcharts";

import {
  getAuthData,
  getTwelveStepsSummary,
  getKudosDashboardData,
  getNikoNikoTendencias,
} from "@/api";

export function ChartsSection() {
  const [felicidadSeries, setFelicidadSeries] = useState([]);
  const [felicidadOptions, setFelicidadOptions] = useState({
    chart: { type: "radar", background: "#f3f3f3" },
    colors: ["#4A90E2"],
    xaxis: { categories: [] },
  });

  const [kudosSeries, setKudosSeries] = useState([]);
  const [kudosOptions, setKudosOptions] = useState({
    chart: {
      type: "bubble",
      background: "#f3f3f3",
      zoom: {
        enabled: false,  // ❌ sin zoom
      },
      toolbar: {
        show: true, // ✅ Mostrar toolbar
        tools: {
          download: true,  // ✅ Activar botón de descarga
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
        },
        animations: { enabled: false }, // opcional: sin animaciones para rendimiento
      },
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
        axisTicks: { show: false },
        min: 0,   
        max: 5,  // cantidad de miembros
      },
      yaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
        min: 0,   
        max: 10,
      },
      grid: {
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
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
      const data = await getTwelveStepsSummary();
      // Parche: transformar average -> |average - 100|
      const transformedData = data.map(item => ({
        ...item,
        average: Math.abs(item.average - 100),
      }));

      const categories = transformedData.map(item => item.categoryName);
      const values = transformedData.map(item => item.average);

      setFelicidadOptions(prev => ({
        ...prev,
        xaxis: { categories },
        yaxis: {
          show: false,
          stepSize: 20,
          forceNiceScale: true,
          min: 10,
          max: 100,
        }
      }));

      setFelicidadSeries([{ name: "Felicidad", data: values }]);
    }

    async function fetchKudos() {
      const data = await getKudosDashboardData(token);
      const formatted = data.map((item, index) => ({
        x: index,
        y: item.cantBadges,
        z: item.cantBadges,
        label: item.name, // ####################### Se cambia username por name #######################
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
      {/* Tendencia Emocional - Gráfico de Línea */}
      <Card className="card">
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

      {/* Distribución de Felicidad - Radar Chart */}
      <Card className="card">
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

      {/* Tipos de Kudos por Miembro - Bubble Chart */}
      <Card className="card">
        <CardBody>
          <Typography variant="h6" className="mb-4">Cantidad de Kudos por Miembro</Typography>
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

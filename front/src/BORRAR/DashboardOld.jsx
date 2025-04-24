import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

function EnhancedDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("kudos");
  const [selectedMonth, setSelectedMonth] = useState("Enero");
  const [selectedTeam, setSelectedTeam] = useState("Manos Amigas");

  // Datos de ejemplo para gráficos
  const sampleData = [
    { name: "Enero", satisfacción: 80, productividad: 70 },
    { name: "Febrero", satisfacción: 85, productividad: 75 },
    { name: "Marzo", satisfacción: 90, productividad: 80 },
    { name: "Abril", satisfacción: 70, productividad: 65 },
    { name: "Mayo", satisfacción: 75, productividad: 70 },
  ];

  const pieDataKudos = [
    { name: "Manos Amigas", value: 8 },
    { name: "Resolutor Estrella", value: 5 },
    { name: "Energía Positiva", value: 7 },
    { name: "Maestro del Detalle", value: 6 },
  ];

  const pieDataNikoNiko = [
    { name: "Feliz", value: 15 },
    { name: "Neutral", value: 8 },
    { name: "Triste", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    // Simula una llamada a la API
    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  const renderSelectedChart = () => {
    if (selectedChart === "kudos") {
      return (
        <PieChart>
          <Pie
            data={pieDataKudos}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieDataKudos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    } else if (selectedChart === "niko") {
      return (
        <PieChart>
          <Pie
            data={pieDataNikoNiko}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieDataNikoNiko.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    }
  };

  if (loading) {
    return <p className="text-center text-blue-500 font-bold">Cargando datos...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 py-6 px-8">
      <Helmet>
        <title>Power BI Style Dashboard</title>
      </Helmet>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard estilo Power BI</h1>
          

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gráfico de barras */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Satisfacción vs Productividad</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="satisfacción" fill="#8884d8" />
                <Bar dataKey="productividad" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico dinámico */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">
              {selectedChart === "kudos" ? "Distribución de Kudos" : "Niko Niko"}
            </h2>
            <div className="mb-4 text-center">
              <label htmlFor="chart-select" className="mr-2">
                Seleccione un gráfico:
              </label>
              <select
                id="chart-select"
                className="border rounded px-2 py-1"
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
              >
                <option value="kudos">Distribución de Kudos</option>
                <option value="niko">Niko Niko</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {renderSelectedChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de líneas */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center mb-4">Tendencia Mensual</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="satisfacción" stroke="#8884d8" />
              <Line type="monotone" dataKey="productividad" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EnhancedDashboard;

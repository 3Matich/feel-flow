import React, { useState } from "react";
import {
  Card,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";

import { getModuleStatus } from "@/api";
import { FeelFlowSpinner } from "@/components";

export function StatusChart(view) {
  const [modules, setModules] = useState([]);
  const [fetchModules, setFetchModules] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchModulesStatus() {
    try {
      const [ts, nn, kd] = await Promise.all([
        getModuleStatus("TWELVE_STEPS"),
        getModuleStatus("NIKO_NIKO"),
        getModuleStatus("KUDOS"),
      ]);

      // console.log("🚀 Datos de TWELVE_STEPS:", ts);
      // console.log("🚀 Datos de NIKO_NIKO:", nn);
      // console.log("🚀 Datos de KUDOS:", kd);

      const buildModule = (name, data) => {
        if (!data || !data[0]) {
          console.warn(`⚠️ No se encontró información para el módulo: ${name}`);
          return {
            name,
            status: "Sin datos",
            color: "bg-gray-400",
          };
        }

        const estado = data[0].moduleDto?.moduleState ?? "NO_STATE";
        // console.log(`📌 Estado del módulo ${name}:`, estado);

        const isActive = estado === "ACTIVE";

        return {
          name,
          status: isActive ? "Activo" : "Inactivo",
          color: isActive ? "bg-green-500" : "bg-gray-500",
        };
      };

      setModules([
        buildModule("12 Pasos", ts),
        buildModule("Niko Niko", nn),
        buildModule("Kudos", kd),
      ]);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error al obtener el estado de los módulos:", err);
    }
  }

  if (view && !fetchModules) {
    setFetchModules(true);
    fetchModulesStatus();
  }

  if (loading) {
    return <FeelFlowSpinner />
  }


  return (
    <>
      {modules.map((module) => (
        <Card key={module.name} className="p-4 card">
          <CardBody className="flex justify-between items-center">
            <h2 className="text-lg">{module.name}</h2>
            <Tooltip content={module.status}>
              <span className={`w-8 h-8 rounded-full ${module.color}`} />
            </Tooltip>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default StatusChart;

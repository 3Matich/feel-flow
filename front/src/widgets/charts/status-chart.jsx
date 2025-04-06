import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";

import { getAuthData } from "@/services/session";
import { getModuleStatus } from "@/services/modulos/getModuleStatus";

export function StatusChart() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const { token } = getAuthData();

    async function fetchModulesStatus() {
      try {
        const [ts, nn, kd] = await Promise.all([
          getModuleStatus(token, "TWELVE_STEPS"),
          getModuleStatus(token, "NIKO_NIKO"),
          getModuleStatus(token, "KUDOS"),
        ]);

        console.log("🚀 Datos de TWELVE_STEPS:", ts);
        console.log("🚀 Datos de NIKO_NIKO:", nn);
        console.log("🚀 Datos de KUDOS:", kd);

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
          console.log(`📌 Estado del módulo ${name}:`, estado);

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
      } catch (err) {
        console.error("❌ Error al obtener el estado de los módulos:", err);
      }
    }

    fetchModulesStatus();
  }, []);

  return (
    <>
      {modules.map((module) => (
        <Card key={module.name} className="p-4">
          <CardBody className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{module.name}</h2>
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

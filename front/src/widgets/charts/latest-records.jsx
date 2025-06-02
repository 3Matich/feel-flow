import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { GetNotificationsKudos } from "@/api";
import { FeelFlowSpinner } from "@/components";

/* ||| DATOS DE PRUEBA ||| Hay que reemplazar los nombres entre notifications y kudosData
const kudosData = [
  { from: "Carlos", to: "María", badgeName: "Manos Amigas", creationDate: "2024-03-04" },
  { from: "Ana", to: "Pedro", badgeName: "Energía Positiva", creationDate: "2024-03-03" },
];
*/

export const LatestRecords = () => {
  const [notifications, setNotifications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await GetNotificationsKudos();
      if (data) {
        setNotifications(data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Card className="overflow-hidden xl:col-span-2 border card shadow-sm">
      <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
        <Typography variant="h6" className="mb-1">
          Últimos Kudos
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2">
        {loading && <FeelFlowSpinner />}
        {notifications.length === 0 ? ( // Cambiar notifications por kudosData para los datos de prueba
          <div className="text-center py-4 text-gray-500 italic">
            No hay actividad reciente en el módulo.
          </div>
        ) : (
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="table-header">
                {["Remitente", "Receptor", "Tipo", "Fecha"].map((el) => (
                  <th key={el} className="border table-header-cell text-left">
                    {el}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notifications.map(({ from, to, badgeName, creationDate }, key) => (
                <tr key={key} className="border table-body">
                  <td className="py-3 px-5 table-body-cell font-bold">{from}</td>
                  <td className="py-3 px-5 table-body-cell">{to}</td>
                  <td className="py-3 px-5 table-body-cell">{badgeName}</td>
                  <td className="py-3 px-5 table-body-cell">{creationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>

  );
}

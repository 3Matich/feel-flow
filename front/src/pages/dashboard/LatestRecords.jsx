import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const kudosData = [
  { sender: "Carlos", receiver: "María", type: "Manos Amigas", date: "2024-03-04" },
  { sender: "Ana", receiver: "Pedro", type: "Energía Positiva", date: "2024-03-03" },
];

const nikoNikoNotes = [
  { member: "Juan Pérez", note: "Día productivo" },
  { member: "Ana López", note: "Un poco estresado, pero bien" },
];

export function LatestRecords() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Últimos Kudos
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Remitente", "Receptor", "Tipo", "Fecha"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kudosData.map(({ sender, receiver, type, date }, key) => (
                <tr key={key} className="border-b border-blue-gray-50">
                  <td className="py-3 px-5 font-bold">{sender}</td>
                  <td className="py-3 px-5">{receiver}</td>
                  <td className="py-3 px-5">{type}</td>
                  <td className="py-3 px-5">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Últimas Notas de Niko Niko
          </Typography>
        </CardHeader>
        <CardBody className="pt-0">
          {nikoNikoNotes.map(({ member, note }, key) => (
            <div key={key} className="flex items-start gap-4 py-3">
              <Avatar size="lg" alt={member} />
              <div>
                <Typography variant="small" className="block font-medium">{member}</Typography>
                <Typography variant="small" className="text-xs font-medium text-blue-gray-500">{note}</Typography>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

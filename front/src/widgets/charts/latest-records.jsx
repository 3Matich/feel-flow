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
  { member: "Juan Pérez", note: "Día productivo", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { member: "Ana López", note: "Un poco estresado, pero bien", img: "https://randomuser.me/api/portraits/women/1.jpg" },
];

export function LatestRecords() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-2 border card shadow-sm">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
          <Typography variant="h6" className="mb-1">
            Últimos Kudos
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
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
              {kudosData.map(({ sender, receiver, type, date }, key) => (
                <tr key={key} className="border table-body">
                  <td className="py-3 px-5 table-body-cell font-bold">{sender}</td>
                  <td className="py-3 px-5 table-body-cell">{receiver}</td>
                  <td className="py-3 px-5 table-body-cell">{type}</td>
                  <td className="py-3 px-5 table-body-cell">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card className="border card shadow-sm">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
          <Typography variant="h6" className="mb-2">
            Últimas Notas de Niko Niko
          </Typography>
        </CardHeader>
        <CardBody className="pt-0">
          {nikoNikoNotes.map(({ member, note, img }, key) => (
            <div key={key} className="flex items-start gap-4 py-3">
              <Avatar size="lg" alt={member} src={img} />
              <div>
                <Typography variant="small" className="block">
                  {member}
                </Typography>
                <Typography variant="small" className="text-xs">
                  {note}
                </Typography>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

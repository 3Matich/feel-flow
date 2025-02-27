import React from "react";

function NikoNikoTable({ teamMembers, nikoData }) {
  const getFaceWithColor = (value) => {
    const bgColor = value === 1 ? "bg-red-500" : value === 2 ? "bg-yellow-500" : "bg-green-500";
    return (
      <div className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white`}>
        {value === 1 ? "😢" : value === 2 ? "😐" : "😊"}
      </div>
    );
  };

  return (
    <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow-lg p-6">
      <table className="min-w-full text-sm table-auto border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-gray-600 font-semibold text-center">Miembro / Día</th>
            {Array.from({ length: 30 }, (_, i) => (
              <th key={i} className="px-4 py-2 text-gray-600 text-center">{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member} className="border-b">
              <td className="px-6 py-4 font-medium text-gray-700 text-center">{member}</td>
              {nikoData[member]?.map((value, i) => (
                <td key={i} className="px-4 py-2 text-center">{getFaceWithColor(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NikoNikoTable;

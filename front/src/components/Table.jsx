import React from "react";

function Table({
    columns,
    data,
    noDataText = "No hay datos disponibles",
    showIcon = false,
    onIconClick = () => {},
}) {
    return (
        <div className="mt-8">
            {/* Contenedor adicional para aplicar overflow-hidden */}
            <div className="overflow-hidden rounded-lg border-2 border-secondary">
                <table className="min-w-full table-auto shadow-lg border-collapse">
                    {/* Encabezado modificado */}
                    <thead>
                        <tr className="bg-light text-primary">
                            {columns.map((col, index) => (
                                <th key={index} className="px-4 py-2 border-b border-light text-center">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`${
                                        rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } transition duration-300 hover:bg-gray-100`}
                                >
                                    <td className="px-4 py-2 border-b border-light text-center"> 
                                        {showIcon && (
                                            <div className="flex items-center justify-center"> {/* Contenedor para centrar */}
                                                <button onClick={() => onIconClick(row)} className="flex items-center">
                                                    <img
                                                        src={row.iconUrl}
                                                        alt="icono del equipo"
                                                        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500"
                                                    />
                                                    <span className="ml-2 text-black">{row.teamName}</span> {/* Nombre del equipo a la derecha del icono */}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b border-light text-center">
                                        {row.leaderName}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-2 text-center border-b border-light">
                                    {noDataText}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;

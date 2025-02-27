import React from "react";
import Button from "./Button";

const Modulo = ({
    mostrarSinEncuestas = false,
    sinEncuestasMensaje = "",
    tituloModulo = "",
    imagenHeader = "",
    imagenBody = "",
    imagenFooter = "",
    imagenContent = "", 
    descripcionModulo = "",
    botones = [],
}) => {
    return (
        <div className="max-h-screen overflow-hidden mt-10 mr-8 ml-2"> {/* Limitar el tamaño del contenedor principal */}
            {/* Mensaje Sin Encuestas */}
            {mostrarSinEncuestas && (
                <div className="text-center text-gray-700 p-4">{sinEncuestasMensaje}</div>
            )}

            {/* Modulo de Encuestas */}
            {!mostrarSinEncuestas && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden max-h-full">
                    {/* Contenedor para permitir hover sobre el header */}
                    <div className="group">
                        {/* Encabezado */}
                        {tituloModulo && (
                            <div className="relative bg-blue-500 text-white p-4">
                                {imagenHeader && (
                                    <img
                                        src={imagenHeader}
                                        alt="Encabezado"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                )}
                                <h3 className="font-sans text-3xl text-textWhite font-bold text-center relative z-10">{tituloModulo}</h3>
                            </div>
                        )}

                        {/* Contenido que se despliega */}
                        <div className="group-hover:block hidden overflow-hidden transition-all duration-500 ease-in-out">
                            <div className="relative flex flex-col items-center text-white w-full">
                                {imagenBody && (
                                    <div className="relative w-full max-h-[calc(70vh-70px)] mb-0">
                                        <img
                                            src={imagenBody}
                                            alt="Cuerpo"
                                            className="w-full h-full object-cover filter blur-sm m-0 p-0"
                                        />
                                        {imagenContent && (
                                            <img
                                                src={imagenContent}
                                                alt="Content"
                                                className="absolute inset-0 w-full h-full mt-5 object-contain z-10 m-0 p-0"
                                            />

                                        )}
                                    </div>

                                )}
                            </div>
                            <div className="relative flex flex-col items-center text-white w-full mt-5">
                                {descripcionModulo && (
                                    <p className="text-center p-4">{descripcionModulo}</p>
                                )}
                            </div>
                            <div className="relative flex flex-col items-center text-white w-full">
                                {imagenFooter && (
                                    <div className="bottom-0 w-full mt-3">
                                        <img
                                            src={imagenFooter}
                                            alt="Footer"
                                            className="w-full h-20 object-cover"
                                        />
                                        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4 z-20">
                                            {botones.map((boton, index) => (
                                                <Button
                                                    key={index}
                                                    label={boton.texto} 
                                                    onClick={boton.onClick} 
                                                    color= {boton.color}	
                                                    size="md" 
                                                    className=""
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modulo;

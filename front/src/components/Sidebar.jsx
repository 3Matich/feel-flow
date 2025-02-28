// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartPie, FaUserCircle, FaUsers, FaPuzzlePiece, FaIdCard, FaCog, FaTrophy } from "react-icons/fa";
import { canAccess } from "../hooks/auth/authorization";
import { getUserData } from "../services/session";
// Resources
import menuData from '../assets/data/modulos.json';


function Sidebar() {
    const modules = Object.values(menuData);

    const iconMapping = {
        "fa-home": <FaHome />, // Home
        "fa-trophy": <FaTrophy />,
        "fa-pie-chart": <FaChartPie />, // Dashboard
        "fa-user-circle": <FaUserCircle />, // Lideres, Usuarios
        "fa-users": <FaUsers />, // Equipos
        "fa-puzzle-piece": <FaPuzzlePiece />, // Modulos
        "fa-id-card": <FaIdCard />, // Perfil
        "fa-cog": <FaCog />, // Configuración
    };
    const { authority } = getUserData();
    

    return (
        <div className="relative min-h-screen flex flex-col py-3 transition-all duration-300">
            {/* Modules
            <ul className="navbar-nav group flex flex-col space-y-3 text-xl px-2">
                {modules.map((modulo, index) => (
                    <li className="nav-item" key={index}>
                        <Link
                            to={modulo.link}
                            className="nav-link flex items-center p-2 rounded hover:bg-bgBlueSecondary hover:text-black transition-colors duration-200 text-textPrimary"
                        >
                            <div className="icon icon-shape icon-sm shadow border-radius-md flex items-center justify-center mr-4">
                                {iconMapping[modulo.logo] || <span className="text-textPrimary">N/A</span>}
                            </div>
                            <span className="nav-link-text opacity-0 whitespace-nowrap hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                                {modulo.nombre}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
             */}
            <ul className="navbar-nav group flex flex-col space-y-3 text-xl px-2">
                {modules.map((modulo, index) => {
                    if (!canAccess(modulo.name, authority)) {
                        return null; // No renderizar si no tiene acceso
                    }

                    return (
                        <li className="nav-item" key={index}>
                            <Link
                                to={modulo.link}
                                className={`nav-link flex items-center p-2 rounded hover:bg-bgBlueSecondary hover:text-black transition-colors duration-200 text-textPrimary ${modulo.name === document.title ? "bg-blue-600" : ""
                                    }`}
                            >
                                <div className="icon icon-shape icon-sm shadow border-radius-md flex items-center justify-center mr-4">
                                    {iconMapping[modulo.logo] || <span className="text-gray-500">N/A</span>}
                                </div>
                                <span className="nav-link-text opacity-0 whitespace-nowrap hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 text-sm">{modulo.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;

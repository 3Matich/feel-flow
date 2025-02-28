import React, { useState } from "react";
import { Link } from "react-router-dom";
import modulosData from '../assets/data/modulos.json';
import FeelFlow from "../assets/img/FeelFlow.png";
import { FaHome, FaChartPie, FaUserCircle, FaUsers, FaPuzzlePiece, FaIdCard, FaCog, FaTrophy} from "react-icons/fa";

import { canAccess } from "../hooks/auth/authorization";
import { getUserData } from "../services/session";


function VerticalMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { authority } = getUserData();
    const modulos = Object.values(modulosData);
    var module = "";

    const iconMapping = {
        "fa-home": <FaHome className="text-gray-500" />, // Home
        "fa-pie-chart": <FaChartPie className="text-gray-500" />, // Dashboard
        "fa-trophy": <FaTrophy className="text-gray-500" />, // Resultados
        "fa-user-circle": <FaUserCircle className="text-gray-500" />, // Lideres, Usuarios
        "fa-users": <FaUsers className="text-gray-500" />, // Equipos
        "fa-puzzle-piece": <FaPuzzlePiece className="text-gray-500" />, // Modulos
        "fa-id-card": <FaIdCard className="text-gray-500" />, // Perfil
        "fa-cog": <FaCog className="text-gray-500" /> // Configuración
    };

    console.log(canAccess("dashboard", authority));


    return (
        <div className="relative min-h-screen flex textPrimary">
            {/* Botón para abrir/cerrar el menú (hamburguesa) en dispositivos móviles */}
            <button
                onClick={toggleMenu}
                className="fixed top-4 left-4 bg-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 z-20 lg:hidden"
            >
                {isOpen ? "Cerrar menú" : "☰"}
            </button>

            {/* Barra lateral */}
            <aside
                className={`sidenav navbar navbar-vertical bg-bgPrimary w-64 p-4 fixed top-0 left-0 h-screen z-10 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:relative lg:flex-shrink-0`}
                id="sidenav-main"
            >
                {/* Header */}
                <div className="sidenav-header mb-6">
                    <a className="navbar-brand flex items-center" href="/home">
                        <img
                            src={FeelFlow}
                            alt="main_logo"
                            className="navbar-brand-img h-10 w-auto"
                        />
                        <span className="ml-2 font-bold text-lg">Feel Flow</span>
                    </a>
                </div>

                <hr className="horizontal dark my-4 border-gray-600" />

                {/* Modulos */}
                <ul className="navbar-nav space-y-2">
                    {modulos.map((modulo, index) => {
                        if (!canAccess(modulo.nombre, authority)) {
                            return null; // No renderizar si no tiene acceso
                        } 
                        
                        return (
                            <li className="nav-item" key={index}>
                                <Link
                                    to={modulo.link}
                                    className={`nav-link flex items-center p-2 rounded hover:bg-blue-500 hover:text-white ${modulo.nombre === document.title ? "bg-blue-600" : ""
                                        }`}
                                >
                                    <div className="icon icon-shape icon-sm shadow border-radius-md flex items-center justify-center mr-2">
                                        {iconMapping[modulo.logo] || <span className="text-gray-500">N/A</span>}
                                    </div>
                                    <span className="nav-link-text">{modulo.nombre}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

            </aside>
        </div>
    );
}

export default VerticalMenu;

import { useState } from "react";
import { Link } from "react-router-dom";

function HamburgerMenu({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ padding: "10px" }}>
      <button onClick={toggleMenu}>
        {isOpen ? "Cerrar menú" : "Abrir menú"}
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li>
              <Link to="/users">Gestión de usuarios</Link>
            </li>
            <li>
              <Link to="/profile">Mi perfil</Link>
            </li>
            <li>
                <button onClick={onLogout} style={{ backgroundColor: "#dc3545" }}>
                    Cerrar sesión 
                </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;

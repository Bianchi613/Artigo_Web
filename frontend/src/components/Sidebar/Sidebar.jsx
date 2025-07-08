import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Acadêmica</h2>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link" end>
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </NavLink>

        <NavLink to="/configuracoes" className="sidebar-link">
          <FaCog className="sidebar-icon" /> Configurações
        </NavLink>

        <NavLink to="/login" className="sidebar-link sidebar-logout">
          <FaSignOutAlt className="sidebar-icon" /> Sair
        </NavLink>
      </nav>
    </aside>
  );
}

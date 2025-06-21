import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserPlus,
  FaCalendarCheck,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaRegCalendarAlt,
  FaUsers
} from 'react-icons/fa';

import logo from '../../Assests/newLogo.png'

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/add-employee', label: 'Add Employee', icon: <FaUserPlus /> },
    { path: '/mark-attendance', label: 'Mark Attendance', icon: <FaCalendarCheck /> },
    { path: '/view-attendance', label: 'View Attendance', icon: <FaClipboardList /> },
    { path: '/leave-plan', label: 'Leave Plan', icon: <FaRegCalendarAlt /> },
    { path: '/reports', label: 'Reports', icon: <FaChartBar /> },
    { path: '/employees-list', label: "Employees's List", icon: <FaUsers /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3 shadow"
      style={{
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
        <img src={logo} alt="logo" />
      <ul className="nav nav-pills flex-column gap-2 flex-grow-1 mt-2">
        {links.map((link, index) => (
          <li className="nav-item" key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive ? 'bg-light text-dark fw-bold' : 'text-white'
                }`
              }
              style={{ textDecoration: 'none' }}
            >
              <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Sun, Moon } from 'lucide-react';
import authService from '../Api/auth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await authService.logout();
      // Perbarui context agar status autentikasi menjadi false dan data user dikosongkan
      setIsAuthenticated(false);
      setUser(null);
      toast.success(data.message);
      navigate('/');
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
      console.error('Logout error:', error);
    }
  };

  return (
    <nav
      className={`navbar py-2 px-4 flex justify-between items-center ${
        darkMode ? 'navbar-dark bg-gray-800' : 'navbar-light bg-white shadow-sm'
      }`}
    >
      <div className="navbar-brand">
        <Link to="/dashboard" className="text-xl font-bold">
          Dashboard
        </Link>
      </div>
      <div className="navbar-actions flex items-center">
        <ul className="navbar-nav flex items-center">
          <li className="nav-item mr-4">
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </li>
          {/* Tambahkan link lain jika diperlukan */}
        </ul>
        <div className="form-check form-switch ml-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            {darkMode ? <Sun size={20} color="#3e9392" /> : <Moon size={20} color="#3e9392" />}
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

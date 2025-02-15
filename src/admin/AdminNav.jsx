import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Sun, Moon, Settings, Users, Palette, BookOpen, LogOut } from 'lucide-react';
import adminService from '../Api/admin';
import { toast } from 'react-toastify';

const AdminNavbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Memanggil fungsi adminLogout dari adminService
      const data = await adminService.adminLogout();
      // Mengubah state autentikasi di context
      setIsAuthenticated(false);
      setUser(null);
      toast.success(data.message);
      // Setelah logout, arahkan ke halaman login admin (/adm)
      navigate('/adm');
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
      console.error('Logout error:', error);
    }
  };

  return (
    <nav
      className={`navbar py-3 flex items-center justify-between ${
        darkMode 
          ? 'bg-gray-800 border-b border-gray-700' 
          : 'bg-white border-b border-gray-200 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-8 md:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center pr-10">
          <Link 
            to="#" 
            className={`text-xl font-bold flex items-center ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            <h2 className="text-3xl font-bold dashboard-header">Dashboard Admin</h2>
            <Settings className="ml-3" size={24} />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4">
          <Link 
            to="#" 
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Users className="mr-2" size={18} />
            <span className="hidden sm:inline">Users</span>
          </Link>

          <Link 
            to="#" 
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Palette className="mr-2" size={18} />
            <span className="hidden sm:inline">Art</span>
          </Link>

          <Link 
            to="#" 
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <BookOpen className="mr-2" size={18} />
            <span className="hidden sm:inline">Tutorial</span>
          </Link>

          <button
            onClick={handleLogout}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <LogOut className="mr-2" size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
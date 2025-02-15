// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Pastikan Link diimpor
import { Home, BarChart, Clipboard } from 'lucide-react'; // Import ikon dari lucide-react

const Sidebar = () => {
  return (
    <aside className="sidebar  p-6  ">
      <ul className="space-y-2">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
          >
            <Home className="mr-2" size={20} />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
          >
            <BarChart className="mr-2" size={20} />
            Statistics
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
          >
            <Clipboard className="mr-2" size={20} />
            Actions
          </Link>
        </li>
        {/* Tambahkan link lain jika diperlukan */}
      </ul>
    </aside>
  );
};

export default Sidebar;
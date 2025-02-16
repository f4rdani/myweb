// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import DashboardLayout from "./components/DashboardLayout";
import Welcome from './pages/welcome';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './admin/AdminDashboard';
import DashboardLayoutAdm from './admin/DashboardAdminLay';
import AdminLogin from './admin/AdminLogin';
import LoginLumen from './lumen/lumenlogin';
import LumenDashboard from './lumen/lumendashbord';
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/lumen" element={<LoginLumen />} />
            <Route path="/lumendashboard" element={<LumenDashboard />} />
            <Route path="/adm" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <DashboardLayoutAdm />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
            </Route>
            {/* Rute dashboard dilindungi */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="user">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
            </Route>
            {/* Jika route tidak ditemukan */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

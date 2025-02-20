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
import ConfirmEmail from './pages/ConfirmEmail';
import ResetPassword from './pages/ResetPassword';
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
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Jika route tidak ditemukan */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

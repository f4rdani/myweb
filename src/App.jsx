import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import Home from './pages/Home';
// import NotFound from './pages/NotFound';
// import LoginForm from './components/LoginForm';
// import Dashboard from './pages/Dashboard';
// import UserList from './components/UserList';
import Welcome from './pages/welcome';
import './App.css';
import { User, Map, Code, PenTool, Palette, Server } from 'lucide-react';
function App() {

  return (
      <div >
        <Welcome />
      </div>
  );
}

export default App;

import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userId");  // Hapus cookie saat logout
    navigate("/");  // Arahkan kembali ke halaman login
  };

  return (
    <div>
      <h1>Welcome to Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;

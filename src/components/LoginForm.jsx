import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message sebelum request baru

    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });

      // Simpan token jika tersedia
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 }); // Token disimpan 1 hari
      }

      setMessage(response.data.message);
      onLogin(); // Panggil fungsi onLogin setelah berhasil login
      navigate("/dashboard"); // Arahkan ke dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || "Login gagal. Periksa kembali email dan password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Login</h2>
        
        {message && <div className="alert alert-warning">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Email"
              value={email}
              required
              aria-label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              required
              aria-label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

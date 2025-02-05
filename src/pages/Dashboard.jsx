import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";  // Import library untuk cookies

function Dashboard() {
  const [userId, setUserId] = useState(null);

  // Gunakan useEffect untuk mengambil userId dari cookie setelah halaman di-load
  useEffect(() => {
    const storedUserId = Cookies.get("userId");  // Ambil data userId dari cookie
    setUserId(storedUserId);  // Set data userId ke state
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userId ? (
        <p>Welcome, User ID: {userId}</p>  // Menampilkan User ID dari cookie
      ) : (
        <p>Please log in first.</p>  // Jika tidak ada userId, minta login
      )}
    </div>
  );
}

export default Dashboard;

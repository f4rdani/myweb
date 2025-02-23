import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-100">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}

export default NotFound;

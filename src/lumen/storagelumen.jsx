import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function StorageLumen() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [tahun, setTahun] = useState('');
  const [filenameLama, setFilenameLama] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGetBukti = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiKey = localStorage.getItem('apiKey');

      const response = await fetch(`http://localhost:8000/komplensoal/${filename}/${tahun}`, {
        headers: {
          'X-API-KEY': apiKey,
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        toast.success('Berhasil mengambil bukti');
      } else {
        toast.error('Gagal mengambil bukti');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan');
    }
    setLoading(false);
  };

  const handleStoreBukti = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiKey = localStorage.getItem('apiKey');
      
      const formData = new FormData();
      formData.append('bukti', file);

      const response = await fetch('http://localhost:8000/komplensoal', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        toast.success('Berhasil menyimpan bukti');
      } else {
        toast.error('Gagal menyimpan bukti');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan');
    }
    setLoading(false);
  };

  const handleUpdateBukti = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiKey = '123';
      
      const formData = new FormData();
      formData.append('bukti', file);

      const response = await fetch(`http://localhost:8000/komplensoal/${filenameLama}/${tahun}`, {
        method: 'PUT',
        headers: {
          'X-API-KEY': apiKey,
        },
        body: formData
      });

      if (response.ok) {
        toast.success('Berhasil mengupdate bukti');
      } else {
        toast.error('Gagal mengupdate bukti');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan');
    }
    setLoading(false);
  };

  const handleDeleteBukti = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiKey = localStorage.getItem('apiKey');

      const response = await fetch(`http://localhost:8000/komplensoal/${filename}/${tahun}`, {
        method: 'DELETE',
        headers: {
          'X-API-KEY': apiKey,
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Berhasil menghapus bukti');
      } else {
        toast.error('Gagal menghapus bukti');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Manajemen Bukti</h2>

        {/* Form Store Bukti */}
        <form onSubmit={handleStoreBukti} className="mb-6">
          <h3 className="text-xl text-white mb-4">Upload Bukti Baru</h3>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan Bukti'}
          </button>
        </form>

        {/* Form Get & Delete Bukti */}
        <form className="mb-6">
          <h3 className="text-xl text-white mb-4">Ambil/Hapus Bukti</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nama File"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
              required
            />
            <input
              type="text"
              placeholder="Tahun"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleGetBukti}
              className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Mengambil...' : 'Ambil Bukti'}
            </button>
            <button
              onClick={handleDeleteBukti}
              className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Menghapus...' : 'Hapus Bukti'}
            </button>
          </div>
        </form>

        {/* Form Update Bukti */}
        <form onSubmit={handleUpdateBukti}>
          <h3 className="text-xl text-white mb-4">Update Bukti</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nama File Lama"
              value={filenameLama}
              onChange={(e) => setFilenameLama(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
              required
            />
            <input
              type="text"
              placeholder="Tahun"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Mengupdate...' : 'Update Bukti'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StorageLumen;



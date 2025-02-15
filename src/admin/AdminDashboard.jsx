// src/admin/AdminDashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import adminService from '../Api/admin';
import AdminForm from './AdminForm';
import UserList from './UserList';
import { Trash2, Plus, Image, AlertCircle, Edit2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const BACKEND_URL = 'http://localhost:5000';

function AdminDashboard() {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    document.title = "Dashboard - Admin";
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    setIsLoading(true);
    try {
      const response = await adminService.getArtworks();
      // Pastikan response.data adalah array karya
      setArtworks(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
      toast.error(`Gagal mengambil data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addArtwork = async (formData) => {
    const toastId = toast.loading("Mengirim data...");
    try {
      await adminService.addArtwork(formData);
      toast.update(toastId, {
        render: "Karya berhasil ditambahkan",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchArtworks();
      setShowForm(false);
    } catch (error) {
      console.error("Gagal menambahkan karya:", error.message);
      toast.update(toastId, {
        render: `Gagal menambahkan karya: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const updateArtworkHandler = async (id, formData) => {
    const toastId = toast.loading("Memperbarui karya...");
    try {
      await adminService.updateArtwork(id, formData);
      toast.update(toastId, {
        render: "Karya berhasil diperbarui",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchArtworks();
      // Hapus mode edit dan tutup form
      setEditingArtwork(null);
      setShowForm(false);
    } catch (error) {
      console.error("Gagal memperbarui karya:", error.message);
      toast.update(toastId, {
        render: `Gagal memperbarui karya: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const deleteArtwork = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus karya ini?')) {
      const toastId = toast.loading("Menghapus karya...");
      try {
        await adminService.deleteArtwork(id);
        toast.update(toastId, {
          render: "Karya berhasil dihapus",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchArtworks();
      } catch (error) {
        console.error("Gagal menghapus karya:", error.message);
        toast.update(toastId, {
          render: `Gagal menghapus karya: ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const handleEditArtwork = (art) => {
    setEditingArtwork(art);
    setShowForm(true);
  };

  // Jika menekan tombol "Tambah Karya", pastikan mode edit dihapus
  const toggleForm = () => {
    if (editingArtwork) {
      setEditingArtwork(null);
    }
    setShowForm(!showForm);
  };

  const customCSS = `
        .dashboard-header {
            background: linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .artwork-card {
            transition: all 0.3s ease;
        }
        .artwork-card:hover {
            transform: translateY(-2px);
        }
        .delete-btn {
            transition: all 0.2s ease;
        }
        .delete-btn:hover {
            background-color: #dc3545;
            color: white;
        }
        .edit-btn {
            transition: all 0.2s ease;
        }
        .edit-btn:hover {
            background-color: #198754;
            color: white;
        }
    `;

  return (
    <div>
      <style>{customCSS}</style>
      <div className={`min-h-screen py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold dashboard-header">Art Galery</h2>
              <button 
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={toggleForm}
              >
                <Plus size={20} />
                {showForm ? 'Tutup Form' : 'Tambah Karya'}
              </button>
            </div>

            {/* Form Section */}
            {showForm && (
              <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <AdminForm 
                  addArtwork={addArtwork} 
                  updateArtwork={updateArtworkHandler} 
                  initialData={editingArtwork} 
                />
              </div>
            )}

            {/* Table Section */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Memuat data...</p>
                </div>
              ) : artworks.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Belum ada karya yang ditambahkan</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>#</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Judul</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Deskripsi</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Media</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                    {artworks.map((art, index) => (
                      <tr key={art.id} className="artwork-card">
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{art.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{art.desc}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {art.image ? (
                            <img 
                              crossOrigin="anonymous"
                              src={`${BACKEND_URL}${art.image}`} 
                              alt={art.title} 
                              className="h-20 w-20 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="flex items-center text-gray-400">
                              <Image size={20} className="mr-2" />
                              <span className="text-sm">No Image</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button 
                              className="edit-btn flex items-center gap-2 px-3 py-2 rounded-lg border border-green-500 text-green-500 hover:text-white"
                              onClick={() => handleEditArtwork(art)}
                            >
                              <Edit2 size={16} />
                              Edit
                            </button>
                            <button 
                              className="delete-btn flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500 text-red-500 hover:text-white"
                              onClick={() => deleteArtwork(art.id)}
                            >
                              <Trash2 size={16} />
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <UserList/>
      </div>
    </div>
  );
}

export default AdminDashboard;

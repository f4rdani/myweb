// src/admin/UserList.js
import React, { useState, useEffect, useContext } from 'react';
import adminService from '../Api/admin';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';

// Komponen form untuk menambah/memperbarui user
function UserForm({ addUser, updateUser, initialData }) {
const { darkMode } = useContext(ThemeContext);
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [email, setEmail] = useState(initialData ? initialData.email : '');
  const [password, setPassword] = useState('');

  // Update nilai field saat initialData berubah (ketika mengedit)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
    } else {
      setName('');
      setEmail('');
    }
    setPassword('');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data user yang akan dikirimkan
    const userData = { name, email };
    // Jika password diisi, sertakan password (untuk penambahan wajib, untuk update opsional)
    if (password.trim() !== '') {
      userData.password = password;
    }
    if (initialData) {
      updateUser(initialData.id, userData);
    } else {
      addUser(userData);
    }
  };
  const inputClassName = `mt-1 block w-full rounded-md shadow-sm p-2 ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500'
      : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
  }`;
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Nama</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClassName}
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClassName}
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          {initialData ? 'Password (kosongkan jika tidak ingin diubah)' : 'Password'}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClassName}
          // Jika menambah user, password wajib diisi
          required={!initialData}
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        {initialData ? 'Perbarui User' : 'Tambah User'}
      </button>
    </form>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await adminService.getUsers();
      // Asumsikan server mengembalikan: { success: true, data: [...] }
      setUsers(response.data);
    } catch (error) {
      toast.error(`Gagal mengambil data user: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (userData) => {
    const toastId = toast.loading("Mengirim data user...");
    try {
      await adminService.addUser(userData);
      toast.update(toastId, {
        render: "User berhasil ditambahkan",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchUsers();
      setShowForm(false);
    } catch (error) {
      toast.update(toastId, {
        render: `Gagal menambahkan user: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const updateUserHandler = async (id, userData) => {
    const toastId = toast.loading("Memperbarui data user...");
    try {
      await adminService.updateUser(id, userData);
      toast.update(toastId, {
        render: "User berhasil diperbarui",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchUsers();
      setEditingUser(null);
      setShowForm(false);
    } catch (error) {
      toast.update(toastId, {
        render: `Gagal memperbarui user: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      const toastId = toast.loading("Menghapus user...");
      try {
        await adminService.deleteUser(id);
        toast.update(toastId, {
          render: "User berhasil dihapus",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchUsers();
      } catch (error) {
        toast.update(toastId, {
          render: `Gagal menghapus user: ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const toggleForm = () => {
    if (editingUser) {
      setEditingUser(null);
    }
    setShowForm(!showForm);
  };

  return (
    <div className={`min-h-screen py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold dashboard-header">User List</h2>
            <button
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={toggleForm}
            >
              <Plus size={20} />
              {showForm ? 'Tutup Form' : 'Tambah User'}
            </button>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="mb-8 p-6 rounded-lg border border-gray-300">
              <UserForm
                addUser={addUser}
                updateUser={updateUserHandler}
                initialData={editingUser}
              />
            </div>
          )}

          {/* Table Section */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Memuat data user...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tidak ada user ditemukan</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>#</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Nama</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Aksi</th>
                </tr>
              </thead>
              <tbody className={darkMode ? 'bg-gray-800 divide-y divide-gray-700' : 'bg-white divide-y divide-gray-200'}>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{index + 1}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.name}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.email}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-green-500 text-green-500 hover:bg-green-500 hover:text-white "
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
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
  );
}

export default UserList;

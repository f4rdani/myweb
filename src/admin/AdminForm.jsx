// src/admin/AdminForm.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Upload, X, Save, FileImage, FileVideo } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

// Pastikan URL backend sesuai dengan konfigurasi Anda
const BACKEND_URL = 'http://localhost:5000';

function AdminForm({ addArtwork, updateArtwork, initialData }) {
  const { darkMode } = useContext(ThemeContext);

  // Jika mode edit, prefill data (kecuali file image, yang akan diunggah ulang jika diubah)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    desc: initialData?.desc || '',
    tool: initialData?.tool || '',
    year: initialData?.year || new Date().getFullYear().toString(),
    image: null, // Untuk file baru yang diunggah; jika tidak diubah, image lama tetap digunakan
  });

  // Untuk preview, jika mode edit dan ada URL image dari server, gunakan itu
  const [preview, setPreview] = useState(initialData?.image || null);
  const [isDragging, setIsDragging] = useState(false);

  // Jika initialData berubah (misalnya, berpindah mode edit), perbarui state
  useEffect(() => {
    setFormData({
      title: initialData?.title || '',
      desc: initialData?.desc || '',
      tool: initialData?.tool || '',
      year: initialData?.year || new Date().getFullYear().toString(),
      image: null,
    });
    setPreview(initialData?.image || null);
  }, [initialData]);

  // Fungsi untuk menentukan URL preview yang benar:
  // Jika tidak ada file baru (formData.image === null) dan initialData.image ada,
  // maka tambahkan BACKEND_URL jika preview belum berupa URL absolut.
  const getPreviewSrc = () => {
    if (!preview) return null;
    if (!formData.image && initialData?.image) {
      // Jika preview belum berupa URL absolut (misal: "/uploads/Art/xxx.jpg"), tambahkan BACKEND_URL
      return preview.startsWith('http') ? preview : `${BACKEND_URL}${preview}`;
    }
    return preview;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file) => {
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Buat objek FormData untuk mengirim data form (file diunggah juga)
    const data = new FormData();
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("tool", formData.tool);
    data.append("year", formData.year);
    // Jika ada file baru, lampirkan file tersebut
    if (formData.image) {
      data.append("image", formData.image);
    }

    // Jika properti initialData ada, panggil fungsi update (edit mode)
    if (initialData && updateArtwork) {
      updateArtwork(initialData.id, data);
    } else if (addArtwork) {
      // Mode add
      addArtwork(data);
      // Setelah penambahan, reset form (opsional)
      setFormData({
        title: '',
        desc: '',
        tool: '',
        year: new Date().getFullYear().toString(),
        image: null,
      });
      setPreview(null);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg transition-colors
    ${darkMode 
      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
      : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    }`;

  return (
    <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Input Text */}
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Judul Karya
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Masukkan judul karya"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Deskripsi
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className={inputClasses}
                rows="4"
                placeholder="Deskripsikan karya Anda"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Software/Alat
                </label>
                <input
                  type="text"
                  name="tool"
                  value={formData.tool}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Contoh: Clip Studio"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Tahun
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={inputClasses}
                  min="2000"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column - File Upload */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Image
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors
                ${isDragging 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : darkMode 
                    ? 'border-gray-600 hover:border-gray-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!preview ? (
                <div className="space-y-2">
                  <Upload className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Drag & drop file atau{' '}
                    <label className="mx-1 text-blue-500 hover:text-blue-400 cursor-pointer">
                      pilih file
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*, video/*"
                        onChange={handleFileChange}
                        // Jika dalam mode add, file wajib; untuk edit, bisa tidak diubah
                        required={!initialData && !formData.image}
                      />
                    </label>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Mendukung format gambar dan video
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={clearPreview}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  {((formData.image && formData.image.type?.startsWith('image')) ||
                    (initialData?.image && !formData.image)) ? (
                    <div className="relative">
                      <FileImage className="absolute top-2 left-2 text-white drop-shadow-lg" size={24} />
                      <img
                        crossOrigin="anonymous"
                        src={getPreviewSrc()}
                        alt="Preview"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <FileVideo className="absolute top-2 left-2 text-white drop-shadow-lg" size={24} />
                      <video controls className="max-w-full rounded-lg">
                        <source src={getPreviewSrc()} type={formData.image?.type} />
                        Browser tidak mendukung pemutaran video.
                      </video>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save size={20} />
            {/* Ubah label button sesuai mode */}
            {initialData ? 'Simpan Perubahan' : 'Simpan Karya'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;

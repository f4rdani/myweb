import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BuktiViewer, Pagination, LoadingSpinner } from './components/SharedComponents';

const LumenKomUji = () => {
    const [examComplaints, setExamComplaints] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [formData, setFormData] = useState({
        nim: '',
        kd_mtk: '',
        paket: '',
        kel_ujian: '',
        alasan: '',
        bukti: null
    });
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchComplaints();
        const intervalId = setInterval(fetchComplaints, 5 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleUnauthorized = () => {
        toast.error('Sesi anda telah berakhir, silahkan login kembali');
        localStorage.removeItem('token');
        localStorage.removeItem('apiKey');
        navigate('/lumen');
    };

    const fetchComplaints = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const apiKey = localStorage.getItem('apiKey');

        if (!token) {
            toast.error('Silahkan login terlebih dahulu');
            navigate('/lumen');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/komplenujian', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (!response.ok) {
                throw new Error('Gagal mengambil data');
            }

            const data = await response.json();
            setExamComplaints(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error('Terjadi kesalahan saat mengambil data');
            console.error('Error:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                bukti: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'bukti' && formData[key] instanceof File) {
                formDataToSend.append(key, formData[key]);
            } else if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        });

        const token = localStorage.getItem('token');
        const apiKey = localStorage.getItem('apiKey');

        try {
            let url = 'http://localhost:8000/komplenujian';
            let method = 'POST';

            if (modalMode === 'update') {
                url = `http://localhost:8000/komplenujian/${selectedComplaint.nim}/${selectedComplaint.kd_mtk}/${selectedComplaint.paket}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'X-API-KEY': apiKey,
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            const data = await response.json();

            if (response.ok) {
                toast.success(modalMode === 'create' ? 'Komplain ujian berhasil ditambahkan' : 'Komplain ujian berhasil diupdate');
                setIsModalOpen(false);
                fetchComplaints();
            } else {
                toast.error(data.message || `Gagal ${modalMode === 'create' ? 'menambahkan' : 'mengupdate'} komplain ujian`);
            }
        } catch (error) {
            toast.error('Terjadi kesalahan');
            console.error('Error:', error);
        }
    };

    const deleteComplaint = async (nim, kd_mtk, paket) => {
        const token = localStorage.getItem('token');
        const apiKey = localStorage.getItem('apiKey');

        try {
            const response = await fetch(`http://localhost:8000/komplenujian/${nim}/${kd_mtk}/${paket}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleUnauthorized();
                return;
            }

            if (response.ok) {
                toast.success('Komplain berhasil dihapus');
                fetchComplaints();
            } else {
                toast.error('Gagal menghapus komplain');
            }
        } catch (error) {
            toast.error('Terjadi kesalahan');
            console.error('Error:', error);
        }
    };

    // Sort dan get current complaints
    const indexOfLastComplaint = currentPage * itemsPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - itemsPerPage;
    const sortedComplaints = [...examComplaints].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });
    const currentComplaints = sortedComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

    // Tambahkan fungsi untuk membuka modal update
    const openUpdateModal = (complaint) => {
        setModalMode('update');
        setSelectedComplaint(complaint);
        setFormData({
            nim: complaint.nim,
            kd_mtk: complaint.kd_mtk,
            paket: complaint.paket,
            kel_ujian: complaint.kel_ujian,
            alasan: complaint.alasan,
            bukti: complaint.bukti
        });
        setPreviewUrl(complaint.bukti ? `http://localhost:8000/storage/${complaint.bukti}` : null);
        setIsModalOpen(true);
    };

    // Tambahkan fungsi untuk membuka modal create
    const openCreateModal = () => {
        setModalMode('create');
        setSelectedComplaint(null);
        setFormData({
            nim: '',
            kd_mtk: '',
            paket: '',
            kel_ujian: '',
            alasan: '',
            bukti: null
        });
        setPreviewUrl(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            nim: '',
            kd_mtk: '',
            paket: '',
            kel_ujian: '',
            alasan: '',
            bukti: null
        });
        setPreviewUrl(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Update bagian tombol update di tabel
    const renderActionButtons = (complaint) => (
        <>
            <button 
                onClick={() => openUpdateModal(complaint)}
                className="btn btn-sm btn-warning me-2"
            >
                Update
            </button>
            <button 
                onClick={() => {
                    if(window.confirm('Apakah Anda yakin ingin menghapus komplain ini?')) {
                        deleteComplaint(complaint.nim, complaint.kd_mtk, complaint.paket);
                    }
                }}
                className="btn btn-sm btn-danger"
            >
                Hapus
            </button>
        </>
    );

    return (
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Komplain Ujian</h5>
                <button 
                    onClick={openCreateModal}
                    className="btn btn-primary"
                >
                    Tambah Komplain Ujian
                </button>
            </div>
            <div className="card-body">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>NIM</th>
                                        <th>Kode MTK</th>
                                        <th>Paket</th>
                                        <th>Kelompok Ujian</th>
                                        <th>Alasan</th>
                                        <th>Bukti</th>
                                        <th>Dibuat</th>
                                        <th>Diperbarui</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentComplaints.map((complaint) => (
                                        <tr key={`${complaint.nim}-${complaint.kd_mtk}-${complaint.paket}`}>
                                            <td>{complaint.nim}</td>
                                            <td>{complaint.kd_mtk}</td>
                                            <td>{complaint.paket}</td>
                                            <td>{complaint.kel_ujian}</td>
                                            <td>{complaint.alasan}</td>
                                            <td>
                                                <BuktiViewer buktiPath={complaint.bukti} />
                                            </td>
                                            <td>{new Date(complaint.created_at).toLocaleString('id-ID')}</td>
                                            <td>{new Date(complaint.updated_at).toLocaleString('id-ID')}</td>
                                            <td>
                                                {renderActionButtons(complaint)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            totalItems={examComplaints.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            paginate={setCurrentPage}
                        />
                    </>
                )}
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalMode === 'create' ? 'Tambah Komplain Ujian' : 'Update Komplain Ujian'}
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setFormData({
                                            nim: '',
                                            kd_mtk: '',
                                            paket: '',
                                            kel_ujian: '',
                                            alasan: '',
                                            bukti: null
                                        });
                                        setPreviewUrl(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Form fields untuk komplain ujian */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">NIM</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nim"
                                                value={formData.nim}
                                                onChange={handleInputChange}
                                                required
                                                disabled={modalMode === 'update'}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Kode MTK</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="kd_mtk"
                                                value={formData.kd_mtk}
                                                onChange={handleInputChange}
                                                required
                                                disabled={modalMode === 'update'}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Paket</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="paket"
                                                value={formData.paket}
                                                onChange={handleInputChange}
                                                required
                                                disabled={modalMode === 'update'}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Kelompok Ujian</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="kel_ujian"
                                                value={formData.kel_ujian}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Alasan</label>
                                        <textarea
                                            className="form-control"
                                            name="alasan"
                                            value={formData.alasan}
                                            onChange={handleInputChange}
                                            required
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Bukti</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="bukti"
                                            onChange={handleFileChange}
                                            accept=".pdf,.jpg,.jpeg,.png"
                                        />
                                        {previewUrl && (
                                            <div className="mt-2">
                                                {formData.bukti instanceof File ? (
                                                    formData.bukti.type.startsWith('image/') ? (
                                                        <img 
                                                            src={previewUrl} 
                                                            alt="Preview" 
                                                            className="img-thumbnail"
                                                            style={{ maxHeight: '200px' }}
                                                        />
                                                    ) : (
                                                        <div className="alert alert-info">
                                                            File baru terpilih: {formData.bukti.name}
                                                        </div>
                                                    )
                                                ) : (
                                                    formData.bukti && formData.bukti.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
                                                        <img 
                                                            src={previewUrl}
                                                            alt="Bukti sebelumnya" 
                                                            className="img-thumbnail"
                                                            style={{ maxHeight: '200px' }}
                                                        />
                                                    ) : (
                                                        <div className="alert alert-info">
                                                            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                                                                Lihat bukti sebelumnya
                                                            </a>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={closeModal}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            {modalMode === 'create' ? 'Simpan' : 'Update'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LumenKomUji; 
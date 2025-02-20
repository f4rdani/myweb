import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../Api/auth';

const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        const confirmEmail = async () => {
            if (!token) {
                toast.error('Token tidak valid');
                navigate('/');
                return;
            }

            try {
                const response = await auth.confirmEmail(token);
                if (response.success) {
                    setIsSuccess(true);
                    toast.success('Email berhasil dikonfirmasi');
                } else {
                    toast.error(response.message || 'Gagal mengkonfirmasi email');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Terjadi kesalahan saat mengkonfirmasi email');
            } finally {
                setIsLoading(false);
            }
        };

        confirmEmail();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Konfirmasi Email
                </h2>
                
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Sedang memproses konfirmasi email...</p>
                    </div>
                ) : isSuccess ? (
                    <div className="text-center">
                        <div className="text-green-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Email Berhasil Dikonfirmasi!</h3>
                        <p className="text-gray-600 mb-4">
                            Akun Anda telah diaktifkan. Sekarang Anda dapat login menggunakan akun Anda.
                        </p>
                        <button
                            onClick={() => navigate('/lumen')}
                            className="btn btn-primary"
                        >
                            Login Sekarang
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="text-red-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Gagal Mengkonfirmasi Email</h3>
                        <p className="text-gray-600 mb-4">
                            Terjadi kesalahan saat mengkonfirmasi email Anda. Silakan coba lagi atau hubungi support.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="btn btn-secondary"
                        >
                            Kembali ke Beranda
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmEmail; 
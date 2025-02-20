import React from 'react';

// Komponen yang digunakan bersama seperti BuktiViewer, Pagination, LoadingSpinner
export const BuktiViewer = ({ buktiPath }) => {
    if (!buktiPath) return null;

    return isBuktiImage(buktiPath) ? (
        <div className="d-flex justify-content-center">
            <img 
                src={getBuktiUrl(buktiPath)} 
                alt="Bukti"
                className="img-thumbnail"
                style={{ height: '50px', cursor: 'pointer' }}
                onClick={() => window.open(getBuktiUrl(buktiPath), '_blank')}
            />
        </div>
    ) : (
        <a 
            href={getBuktiUrl(buktiPath)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-info"
        >
            Lihat PDF
        </a>
    );
};

export const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Fungsi untuk menentukan nomor halaman yang akan ditampilkan
    const getPageNumbers = () => {
        const delta = 2; // Jumlah halaman yang ditampilkan di sekitar halaman aktif
        const range = [];
        const rangeWithDots = [];

        // Selalu tampilkan halaman pertama
        range.push(1);

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i > 1 && i < totalPages) {
                range.push(i);
            }
        }

        // Selalu tampilkan halaman terakhir
        if (totalPages > 1) {
            range.push(totalPages);
        }

        // Tambahkan dots jika ada gap
        let l;
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                {getPageNumbers().map((number, index) => (
                    <li 
                        key={index} 
                        className={`page-item ${number === currentPage ? 'active' : ''} ${number === '...' ? 'disabled' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => number !== '...' && paginate(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export const LoadingSpinner = () => (
    <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

// Fungsi utility
export const getBuktiUrl = (buktiPath) => {
    if (!buktiPath) return null;
    return `http://localhost:8000/storage/${buktiPath}`;
};

export const isBuktiImage = (buktiPath) => {
    if (!buktiPath) return false;
    const ext = buktiPath.toLowerCase().split('.').pop();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
}; 
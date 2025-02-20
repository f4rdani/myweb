import React from 'react';
import LumenKomUji from './lumenkomuji';
import LumenKomSol from './lumenkomsol';

const LumenDashboard = () => {
    return (
        <div className="container-fluid py-4 bg-white">
            <h1 className="mb-4">Dashboard Komplain</h1>
            <LumenKomUji />
            <LumenKomSol />
        </div>
    );
};

export default LumenDashboard;
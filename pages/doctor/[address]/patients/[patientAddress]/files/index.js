// pages/doctor/[address]/patients/[patientAddress]/profile.js
import React from 'react';
import { useRouter } from 'next/router';
import FileListComponent from '../../../../../../components/PatientFileList';
import DynamicSidebar from '../../../../../../components/Menu';

import { Button } from 'semantic-ui-react';

const PatientProfile = () => {
    const router = useRouter();
    const { address, patientAddress } = router.query;

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <DynamicSidebar userType="doctor" />
            <div style={{ flexGrow: 1, padding: "20px", overflowY: 'auto' }}>
                <h2>Archivos del paciente: {patientAddress}</h2>
                <FileListComponent patientAddress={patientAddress} />
                <br></br>
                <Button onClick={() => router.back()}>Regresar</Button>
            </div>
            <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" />

        </div>
    );
};

export default PatientProfile;
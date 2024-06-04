// pages/patient/[address]/files/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DynamicSidebar from '../../../../components/Menu';
import FileUploadComponent from '../../../../components/PatientFileForm';
import FileListComponent from '../../../../components/PatientFileList';
import { getEHRInstance } from '../../../../ethereum/ehr';

const FilesPage = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();
    const { address } = router.query;

    const loadFiles = async () => {
        if (!address) {
            setError('La dirección del paciente no está proporcionada.');
            return;
        }
        const contract = getEHRInstance();
        try {
            const filesFromBlockchain = await contract.methods.getFilesFromPatient(address).call();
            setFiles(filesFromBlockchain.map(f => ({ ...f, key: f.file_hash })));
        } catch (error) {
            console.error('Error loading files:', error);
            setError(`Failed to load files: ${error.message}`);
        }
    };

    useEffect(() => {
        if (router.isReady && address) {
            console.log("Router is ready and address is available:", address);
            loadFiles(address);
        }
    }, [router.isReady, address]);



    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <DynamicSidebar userType="patient" />
            <div style={{ flexGrow: 1, padding: "20px", overflowY: 'auto' }}>
                <h1>Mis archivos</h1>
                {address ? (
                    <>
                        <FileUploadComponent patientAddress={address} refreshFiles={() => loadFiles()} />
                        <FileListComponent patientAddress={address} />
                    </>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
            <link
                async
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
        </div>
    );
};

export default FilesPage;

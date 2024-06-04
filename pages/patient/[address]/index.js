// pages/patient/[address].js
// Asumiendo que tienes un export de web3 desde 'ethereum/ehr.js'
// Importing necessary libraries and components from their respective modules
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from '../../../contexts/Web3Context';
import { getEHRInstance } from '../../../ethereum/ehr';
import DynamicSidebar from '../../../components/Menu';

const hexToAscii = (hex) => {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var code = parseInt(hex.substr(i, 2), 16);
        if (code === 0) {
            break;
        }
        str += String.fromCharCode(code);
    }
    return str;
};

const PatientDashboard = () => {
    const { account, isMetaMaskInstalled } = useWeb3();
    const router = useRouter();
    const { address } = router.query;
    const [patientInfo, setPatientInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const fetchPatientInfo = async () => {
            if (!address) {
                setError("No se ha proporcionado dirección del paciente.");
                setIsLoading(false);
                return;
            }

            try {
                const contract = getEHRInstance();
                const info = await contract.methods.getPatientInformation(address).call();
                console.log("Patient information received:", info);

                if (info) {
                    const phoneNumber = hexToAscii(info[3]);
                    const email = hexToAscii(info[4]);
                    const age = info[2].toString(); 

                    setPatientInfo({
                        account: info[0],
                        name: info[1],
                        age: age,
                        phone: phoneNumber,
                        email: email
                    });
                } else {
                    setError("Datos recibidos no son válidos o incompletos.");
                }
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("Error al cargar la información del paciente desde la blockchain.");
            }
            setIsLoading(false);
        };

        fetchPatientInfo();
    }, [address, router.isReady]); // Añadir router.isReady a las dependencias

    if (isLoading) return <p>Cargando información del paciente...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        patientInfo ? (
            <div style={{ display: 'flex', height: '100vh' }}>
                <DynamicSidebar userType="patient" />
                <div style={{ flexGrow: 1, padding: "20px", overflowY: 'auto' }}>
                    <h1>Dashboard del Paciente</h1>
                    <p>Cuenta: {patientInfo.account}</p>
                    <p>Nombre: {patientInfo.name}</p>
                    <p>Edad: {patientInfo.age}</p>
                    <p>Teléfono: {patientInfo.phone}</p>
                    <p>Correo electrónico: {patientInfo.email}</p>
                </div>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
            </div>
        ) : <p>No se encontró información del paciente en la dirección proporcionada.</p>
    );
};

export default PatientDashboard;

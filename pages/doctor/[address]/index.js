// pages/doctor/[address].js
import DynamicSidebar from '../../../components/Menu';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useMemo } from 'react';
import { getEHRInstance } from '../../../ethereum/ehr';

const DoctorDashboard = () => {
    const router = useRouter();
    const { address } = router.query;
    const [patientCount, setPatientCount] = useState(0);
    const [consultationCount, setConsultationCount] = useState(0);
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!address || address.trim() === "") {
            setError("No se ha proporcionado dirección del doctor.");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(''); // Limpia cualquier error previo
        const fetchDoctorInfo = async () => {
            try {
                if (typeof window !== 'undefined') {  // Asegura que se ejecute solo en el cliente
                    const contract = getEHRInstance();
                    const info = await contract.methods.getDoctorInformation(address).call();
                    let patients = await contract.methods.getPatientNumber(address).call();
                    const patientsToString = patients.toString()
                    console.log("Doctor information received:", info);
                    if (info && typeof info[2] === "string" && info[2] && typeof info[3] === "string" && info[3] && typeof info[4] === "string" && info[4]) {
                        setPatientCount(patientsToString);
                        const doctorData = {
                            id: info[0],
                            index: info[1],
                            name: info[2],
                            phone: info[3],
                            specialization: info[4],
                            patientList: info[5]
                        }
                        setDoctorInfo(doctorData);
                    } else {
                        setError("Datos recibidos no son válidos o incompletos.");
                        console.log("Validation failed for data:", info);
                    }
                }
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("Error al cargar la información del doctor desde la blockchain.");
            }
            setIsLoading(false);
        };
        fetchDoctorInfo();
    }, [address]);

    const doctorDetails = useMemo(() => {
        if (!doctorInfo) return null;
        return (
            <div style={{ display: 'flex' }}>
                <DynamicSidebar userType="doctor" />
                <div style={{ flexGrow: 1, padding: "33px" }}>
                {/* Content specific to the doctor dashboard */}
                    <h1>Dashboard del Doctor</h1>
                    <p>Cuenta: {doctorInfo.id}</p>
                    <p>Nombre: {doctorInfo.name}</p>
                    <p>Teléfono: {doctorInfo.phone}</p>
                    <p>Especialización: {doctorInfo.specialization}</p>
                    <p>Número de pacientes: {patientCount}</p>
                </div>

                <link
                async
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
            </div>
        );
    }, [doctorInfo]);

    if (isLoading) return <p>Cargando información del doctor...</p>;
    if (error) return <p>Error: {error}</p>;
    return doctorDetails || <p>No se encontró información del doctor en la dirección proporcionada.</p>;
};

export default DoctorDashboard;

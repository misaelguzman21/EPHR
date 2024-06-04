// pages/doctor/[address]/patients/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DynamicSidebar from '../../../../components/Menu';
import AddPatientForm from '../../../../components/DoctorAddPatient';
import PatientTable from '../../../../components/DoctorPatientList';
import { getEHRInstance } from '../../../../ethereum/ehr';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const router = useRouter();
    const { address } = router.query;

    useEffect(() => {
      if (router.isReady && address) {
        fetchPatients();
      }
    }, [router.isReady, address]);

    const fetchPatients = async () => {
      const contract = getEHRInstance();
      try {
        const patientList = await contract.methods.getAllPatients().call({ from: address });
        setPatients(patientList.map(patientAddress => ({ address: patientAddress })));
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    const handleAddPatient = async (patientAddress) => {
      const contract = getEHRInstance();
      try {
        await contract.methods.DoctorAddPatientToList(patientAddress).send({ from: address, gas: 400000 });
        fetchPatients();  // Refresh the list after adding
      } catch (error) {
        console.error('Failed to add patient:', error);
      }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <DynamicSidebar userType="doctor" />
            <div style={{ flexGrow: 1, padding: "20px", overflowY: 'auto' }}>
                <h1>Mis Pacientes</h1>
                <AddPatientForm onAddPatient={handleAddPatient} />
                <PatientTable patients={patients} />
            </div>
            <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" />
        </div>
    );
};

export default PatientsPage;
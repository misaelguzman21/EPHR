// pages/doctor/[address]/consultations/index.js
import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import DynamicSidebar from '../../../../components/Menu';
import { AddConsultationModal } from '../../../../components/AddConsultationModal';
import { ConsultationTable } from '../../../../components/ConsultationTable';
import { PatientCard } from '../../../../components/PatientCard';
import { getEHRInstance } from '../../../../ethereum/ehr';
import { useRouter } from 'next/router';

const ConsultationsPage = () => {
  const router = useRouter();
  const { address } = router.query; // Doctor's address from URL
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    if (address) {
      const contract = getEHRInstance();
      try {
        const doctorInfo = await contract.methods.getDoctorInformation(address).call();
        const patientList = doctorInfo[5]; // Assuming index 5 contains patient list

        const patientDetails = await Promise.all(patientList.map(async (patientAddress) => {
          const patientInfo = await contract.methods.getPatientInformation(patientAddress).call();
          return {
            address: patientAddress,
            name: patientInfo[1], // Assuming name is at index 1
          };
        }));

        setPatients(patientDetails);

        const consultationsData = await Promise.all(patientList.map(async (patientAddress) => {
          const consults = await contract.methods.getConsultationDoctor(patientAddress).call();
          return consults.map(consult => ({
            patientName: patientDetails.find(p => p.address === patientAddress)?.name || 'Unknown',
            ...consult
          }));
        }));

        setConsultations(consultationsData.flat());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [address, fetchData]);

  const handleAddConsultation = async (consultationData) => {
    const contract = getEHRInstance();
    console.log("Sending consultation data:", consultationData);
    if (!consultationData.patientAddress || !consultationData.consultationAdvice || !consultationData.medicine || !consultationData.timePeriod) {
      console.error("Missing fields in consultation data", consultationData);
      return;
    }
  
    try {
      await contract.methods.offerMedicalConsultation(
        consultationData.patientAddress,
        consultationData.consultationAdvice,
        consultationData.medicine,
        consultationData.timePeriod
      ).send({ from: address });
  
      // Refresh consultations list after adding new consultation
      await fetchData();
    } catch (error) {
      console.error('Failed to add consultation:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <DynamicSidebar userType="doctor" />
      <div style={{ flexGrow: 1, padding: "20px", overflowY: 'auto' }}>
        <Container>
          <Grid>
            <Grid.Row>
              {patients.map(patient => (
                <Grid.Column key={patient.address} width={4}>
                  <PatientCard patient={patient} onViewDetails={() => {}} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <br />
          <Button onClick={() => setModalOpen(true)}>Añadir Consulta</Button>
          <br />
          <ConsultationTable consultations={consultations} />
          <AddConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddConsultation} />
        </Container>
      </div>
      <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" />
    </div>
  );
};

export default ConsultationsPage;
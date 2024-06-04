// pages/patient/[address]/doctors/index.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CardGroup, Card, Button, Image } from 'semantic-ui-react';
import { getEHRInstance } from '../../../../ethereum/ehr';
import DynamicSidebar from '../../../../components/Menu';
import DoctorListTable from '../../../../components/PatientTable';
import ScheduleAppointmentModal from '../../../../components/PatientAppointmentModal'
const DoctorsList = () => {
    const router = useRouter();
    const { address } = router.query; // Patient's address
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const contract = getEHRInstance();
                const doctorAddresses = await contract.methods.getAllDoctors().call();
                // Fetch each doctor's details
                const doctorDetails = await Promise.all(
                    doctorAddresses.map(async (doctorAddress) => {
                        const doctorInfo = await contract.methods.getDoctorInformation(doctorAddress).call();
                        return {
                            address: doctorAddress,
                            name: doctorInfo[2],
                            phone: doctorInfo[3],
                            specialization: doctorInfo[4]
                        };
                    })
                );
                setDoctors(doctorDetails);
            } catch (error) {
                console.error('Error fetching doctors', error);
            }
            setLoading(false);
        };

        if (address) {
            fetchDoctors();
        }
    }, [address]);

    const handleOpenModal = (doctorId) => {
        setSelectedDoctor(doctorId);
        setModalOpen(true);
      };
      
      const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDoctor(null);
      };
      
      const handleScheduleAppointment = async (doctorId, reason, date) => {
        try {
            const contract = getEHRInstance();
            setLoading(true);
            await contract.methods.scheduleAppointmentFromPatient(doctorId, `${reason} - Fecha: ${date.format('DD/MM/YYYY')}`).send({
            from: address // Asegúrate de tener la dirección del paciente actual
            });
            // Actualiza la lista de doctores después de agendar la cita
            fetchDoctors();
        } catch (error) {
            console.error("Error scheduling appointment", error);
        }
        setLoading(false);
      };

    return (
        <div>


            <div style={{ display: 'flex', height: '100vh' }}>
                    <DynamicSidebar userType="patient" />
                <div style={{ flexGrow: 1, padding: "20px", overflowY: 'auto' }}>
                    <h1>Doctores Disponibles</h1>
                    <CardGroup>
                        {doctors.map((doctor, index) => (
                            <Card key={index}>
                            <Card.Content>
                                <Image floated='right' size='mini' src='/images/avatar/small/doctor.png' />
                                <Card.Header>{doctor.name}</Card.Header>
                                <Card.Meta>{doctor.specialization}</Card.Meta>
                                <Card.Description>
                                Dr. {doctor.name} está especializado en {doctor.specialization}.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button basic color='green' onClick={() => handleOpenModal(doctor.address)}>
                                Agendar cita
                                </Button>
                            </Card.Content>
                            </Card>
                        ))}
                        </CardGroup>
                        {selectedDoctor && (
                        <ScheduleAppointmentModal
                            doctorId={selectedDoctor}
                            open={modalOpen}
                            onClose={handleCloseModal}
                            onSchedule={handleScheduleAppointment}
                        />
                        )}
                    <br></br>
                    <h3>Lista de Doctores</h3>
                    <DoctorListTable patientAddress={address} />

                    </div>
    
                    <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                    />
                </div>

        </div>
    );
};

export default DoctorsList;

/* const DoctorsList = () => {
    const router = useRouter();
    const { address } = router.query;
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const fetchDoctors = async () => {
        if (!address) return;
        setLoading(true);
        try {
            const contract = getEHRInstance();
            const doctorAddresses = await contract.methods.getAllDoctors().call();
            const patientInfo = await contract.methods.getPatientInformation(address).call();
            const doctorList = patientInfo[5];

            const filteredDoctors = doctorAddresses.filter(address => doctorList.includes(address));

            const doctorDetails = await Promise.all(
                filteredDoctors.map(async (doctorAddress) => {
                    const doctorInfo = await contract.methods.getDoctorInformation(doctorAddress).call();
                    return {
                        address: doctorAddress,
                        name: doctorInfo[2],
                        phone: doctorInfo[3],
                        specialization: doctorInfo[4]
                    };
                })
            );
            setDoctors(doctorDetails);
        } catch (error) {
            console.error('Error fetching doctors', error);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        if (address) {
            fetchDoctors();
        }
    }, [address]);

    // Funciones para manejar los eventos del modal
    const handleOpenModal = (doctorId) => {
        setSelectedDoctor(doctorId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDoctor(null);
    };

    const handleScheduleAppointment = async (doctorId, reason, date) => {
        try {
            const contract = getEHRInstance();
            await contract.methods.scheduleAppointmentFromPatient(doctorId, `${reason} - Fecha: ${date.format('DD/MM/YYYY')}`).send({
                from: address
            });
            fetchDoctors();  // Refrescar la lista de doctores
        } catch (error) {
            console.error("Error scheduling appointment", error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <DynamicSidebar userType="patient" />
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <h1>Doctores Disponibles</h1>
                <CardGroup>
                    {doctors.map((doctor, index) => (
                        <Card key={index}>
                            <Card.Content>
                                <Image floated='right' size='mini' src='/images/avatar/small/doctor.png' />
                                <Card.Header>{doctor.name}</Card.Header>
                                <Card.Meta>{doctor.specialization}</Card.Meta>
                                <Card.Description>
                                    Dr. {doctor.name} está especializado en {doctor.specialization}.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button basic color='green' onClick={() => handleOpenModal(doctor.address)}>
                                    Agendar cita
                                </Button>
                            </Card.Content>
                        </Card>
                    ))}
                </CardGroup>
                {selectedDoctor && (
                    <ScheduleAppointmentModal
                        doctorId={selectedDoctor}
                        open={modalOpen}
                        onClose={handleCloseModal}
                        onSchedule={handleScheduleAppointment}
                    />
                )}
                <br />
                <h3>Lista de Doctores</h3>
                <DoctorListTable patientAddress={address} />
            </div>
            <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
        </div>
    );
};

export default DoctorsList; */
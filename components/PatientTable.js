// components/PatientTable.js
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { getEHRInstance } from '../ethereum/ehr';
import { useRouter } from 'next/router';


const DoctorListTable = ({ patientAddress }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { address } = router.query; // Patient's address


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
                    const access = await contract.methods.checkAccess(patientAddress, doctorAddress).call();
                    return {
                        address: doctorAddress,
                        name: doctorInfo[2],
                        phone: doctorInfo[3],
                        specialization: doctorInfo[4],
                        access: access
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
            //setLoading(true)
            fetchDoctors();
        }
    }, []);

    const handleFiles = async (doctorAddress) => {
        // Implementación de la lógica para agendar una cita
    };

    const handleAccess = async (doctorAddress) => {
        const contract = getEHRInstance();
        try {
            setLoading(true);
            const currentAccess = doctors.find(doc => doc.address === doctorAddress).access;
            if (currentAccess) {
                await contract.methods.revokeAccessFromDoctor(patientAddress, doctorAddress).send({ from: patientAddress });
            } else {
                await contract.methods.grantAccessToDoctor(patientAddress, doctorAddress).send({ from: patientAddress });
            }
            // Update doctor access state locally
            setDoctors(doctors.map(doc => {
                if (doc.address === doctorAddress) {
                    return { ...doc, access: !currentAccess };
                }
                return doc;
            }));
        } catch (error) {
            console.error('Error toggling access', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Especialización</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {doctors.map((doctor, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{doctor.name}</Table.Cell>
                        <Table.Cell>{doctor.specialization}</Table.Cell>
                        <Table.Cell>
                            <Button onClick={() => handleSchedule(doctor.address)}>Compartir archivos</Button>
                            <Button onClick={() => handleAccess(doctor.address)}>
                                {doctor.access ? 'Revocar Acceso' : 'Otorgar Acceso'}
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default DoctorListTable;

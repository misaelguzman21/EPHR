// components/DoctorPatientList.js
import React, { useEffect, useState } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
import { getEHRInstance } from '../ethereum/ehr';
import { useRouter } from 'next/router';

const PatientTable = () => {
    const [patients, setPatients] = useState([]);
    const router = useRouter();
    const { address } = router.query; // Doctor's address

    useEffect(() => {
        const fetchPatients = async () => {
            if (!address) return; // Early return if the address is not defined

            const contract = getEHRInstance();
            try {
                const doctorInfo = await contract.methods.getDoctorInformation(address).call();
                const patientList = doctorInfo[5]; // Assuming index 5 holds patient list

                const patientDetails = await Promise.all(patientList.map(async (patientAddress) => {
                    const patientInfo = await contract.methods.getPatientInformation(patientAddress).call();
                    const access = await contract.methods.checkAccess(patientAddress, address).call(); // Corrected parameter order
                    console.log(`Access for patient ${patientAddress} by doctor ${address}: ${access}`);

                    return {
                        address: patientAddress,
                        name: patientInfo[1], // Assuming index 1 is name
                        access: access
                    };
                }));

                setPatients(patientDetails);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, [address]);

    const handleViewFiles = (patientAddress) => {
        const patient = patients.find(p => p.address === patientAddress);
        if (!patient.access) {
            alert('Access Denied');
            return;
        }
        router.push(`/doctor/${address}/patients/${patientAddress}/files`);
    };


    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre del paciente</Table.HeaderCell>
                    <Table.HeaderCell>Ver archivos</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {patients.map((patient, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{patient.name}</Table.Cell>
                        <Table.Cell>
                            <Button onClick={() => handleViewFiles(patient.address)}>
                                <Icon name="eye" /> </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default PatientTable;

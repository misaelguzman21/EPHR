// components/PatientFileList.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Icon, Segment, Header, Message } from 'semantic-ui-react';
import { getEHRInstance } from '../ethereum/ehr';

const FileListComponent = ({ patientAddress }) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("Patient address:", patientAddress);
        if (patientAddress) {
            loadFiles(patientAddress);
        }
    }, [patientAddress]);

    const loadFiles = async (patientAddress) => {
        if (!patientAddress) {
            setError('La dirección del paciente no está proporcionada.');
            return;
        }
        const contract = getEHRInstance();
        try {
            const filesFromBlockchain = await contract.methods.getFilesFromPatient(patientAddress).call();
            if (filesFromBlockchain && filesFromBlockchain.length > 0) {
                setFiles(filesFromBlockchain.map(f => ({ ...f, key: f.file_hash })));
            } else {
                setError("No has subido archivos aún.");
            }
        } catch (error) {
            console.error('Error loading files:', error);
            setError(`Failed to load files: ${error.message}`);
        }
    };

    return (
        <div>
            {error && (
                <Segment>
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{error}</p>
                    </Message>
                </Segment>
            )}
            {files.length > 0 ? (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>File Name</Table.HeaderCell>
                            <Table.HeaderCell>File Type</Table.HeaderCell>
                            <Table.HeaderCell>View</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {files.map(file => (
                            <Table.Row key={file.key}>
                                <Table.Cell>{file.file_name}</Table.Cell>
                                <Table.Cell>{file.file_type}</Table.Cell>
                                <Table.Cell>
                                    <a href={`http://localhost:1633/bzz/${file.file_hash}`} target="_blank" rel="noopener noreferrer">
                                        Ver Archivo
                                    </a>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button icon onClick={() => console.log('Deleting', file.file_hash)}>
                                        <Icon name='delete' />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <Segment placeholder>
                    <Header icon>
                        <Icon name='file outline' />
                        No has subido archivos aún.
                    </Header>
                </Segment>
            )}
        </div>
    );
};

export default FileListComponent;
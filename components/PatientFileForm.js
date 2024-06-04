// components/PatientFileForm.js
import React, { useState } from 'react';
import { Button, Input, Segment, Form, Message } from 'semantic-ui-react';
import { Bee, BeeDebug } from '@ethersphere/bee-js';
import { getEHRInstance } from '../ethereum/ehr';

const bee = new Bee("http://localhost:1633");
const beeDebug = new BeeDebug('http://localhost:1635');

// Asegúrate de recibir refreshFiles como prop
const FileUploadComponent = ({ patientAddress, refreshFiles }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFileToSwarmAndBlockchain = async () => {
        if (!file) {
            setError('Por favor selecciona un archivo para subir.');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const postageBatchId = '74b2592ac081ca0173040b30442a58b51ccafd3db1475b7071660099b5dc81a5';
            const response = await bee.uploadFile(postageBatchId, file, file.name);
            const fileHash = response.reference;

            const contract = getEHRInstance();
            await contract.methods.addFileFromPatient(file.name, file.type, fileHash).send({ from: patientAddress, gas: 3000000 });
            await refreshFiles(); // Llama a refreshFiles que pasa como prop
            alert("Archivo subido con éxito!"); // Notificación al usuario
        } catch (err) {
            console.error('Error durante la carga de archivos o la interacción con el contrato inteligente:', err);
            setError(`Error al subir el archivo: ${err.message || 'Error desconocido'}`);
            if (err.message.includes('revert')) {
                setError('La transacción ha sido revertida por la blockchain.');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <Segment>
            <Form error={!!error}>
                <Form.Field>
                    <label>Subir Archivo</label>
                    <Input type="file" onChange={handleFileChange} />
                </Form.Field>
                <Message error content={error} />
                <Button onClick={uploadFileToSwarmAndBlockchain} loading={uploading} primary>Subir</Button>
            </Form>
        </Segment>
    );
};


export default FileUploadComponent;

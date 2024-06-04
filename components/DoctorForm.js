// components/DoctorForm.js
import React, { useState } from 'react';
import { Form, FormField, Button, Input, Message } from 'semantic-ui-react';
import { getEHRInstance } from '../ethereum/ehr';
import { getWeb3 } from '../ethereum/ehr';
import { useRouter } from 'next/router';


const DoctorForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const validateForm = () => {
        if (!name || !phone || !specialization) {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        if (!/^[\d+]{10,}$/.test(phone)) {
            setError("El teléfono debe tener al menos 10 dígitos numéricos.");
            return false;
        }
        if (!/^[a-zA-Z ]{2,50}$/.test(specialization)) {
            setError("La especialización debe contener solo letras y tener entre 2 y 50 caracteres.");
            return false;
        }
        return true;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
    
        const web3 = getWeb3();
        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                setError('No se encontraron cuentas de Ethereum.');
                setIsLoading(false);
                return;
            }
    
            const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');
            const gasPrice = await web3.eth.getGasPrice();
            const increasedGasPrice = BigInt(gasPrice) * BigInt(200); // Incrementa el precio del gas en un 100%
    
            const contract = getEHRInstance();
            const result = await contract.methods.registerDoctor(
                accounts[0],
                name, 
                phone, 
                specialization
            ).send({ 
                from: accounts[0], 
                gas: 10000000, 
                nonce: nonce, 
                gasPrice: increasedGasPrice.toString() // Convertir a string para evitar errores
            });
    
            console.log('Doctor registrado:', result);
            router.push(`/doctor/${accounts[0]}`);
        } catch (error) {
            console.error('Error al registrar doctor:', error);
            setError('Error al registrar el doctor. Por favor, inténtelo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };
    
    

    return (
        <Form onSubmit={handleSubmit} error={!!error}>
            <FormField>
                <label>Nombre completo</label>
                <Input placeholder='Mario González' value={name} onChange={e => setName(e.target.value)} />
            </FormField>
            <FormField>
                <label>Teléfono</label>
                <Input placeholder='442*******' value={phone} onChange={e => setPhone(e.target.value)} />
            </FormField>
            <FormField>
                <label>Especialización</label>
                <Input placeholder='Cirujano plástico' value={specialization} onChange={e => setSpecialization(e.target.value)} />
            </FormField>
            {error && <Message error header='Error en la operación' content={error} />}
            <Button type='submit' color='green' loading={isLoading}>Registrarse</Button>
        </Form>
    );
};

export default DoctorForm;
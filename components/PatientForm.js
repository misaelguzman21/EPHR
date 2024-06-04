import React, { useState } from 'react';
import { Form, FormField, Button, Input, Message } from 'semantic-ui-react';
import { getEHRInstance } from '../ethereum/ehr';
import { getWeb3 } from '../ethereum/web3';
import { useRouter } from 'next/router';

const PatientForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const validateForm = () => {
        if (!name || !age || !phone || !email) {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        if (!/^[\d+]{10,}$/.test(phone)) {
            setError("El teléfono debe tener al menos 10 dígitos numéricos.");
            return false;
        }
        if (!/^\d{1,3}$/.test(age) || age < 0 || age > 120) {
            setError("La edad debe ser un número válido entre 0 y 120.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("El correo electrónico debe ser válido.");
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

            const contract = getEHRInstance();  

            // Fetch the current gas price
            const gasPrice = await web3.eth.getGasPrice();

            const result = await contract.methods.registerPatient(
                name, 
                age, 
                web3.utils.asciiToHex(phone), 
                web3.utils.asciiToHex(email)
            ).send({ from: accounts[0], gas: 3000000, gasPrice });

            console.log('Patient registered:', result);
            router.push(`/patient/${accounts[0]}`);
        } catch (error) {
            console.error('Error al registrar paciente:', error);
            setError('Error al registrar el paciente. Por favor, inténtelo de nuevo.');
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
                <label>Edad</label>
                <Input type='number' placeholder='25' value={age} onChange={e => setAge(e.target.value)} />
            </FormField>
            <FormField>
                <label>Teléfono</label>
                <Input placeholder='442*******' value={phone} onChange={e => setPhone(e.target.value)} />
            </FormField>
            <FormField>
                <label>Correo electrónico</label>
                <Input type='email' placeholder='example@example.com' value={email} onChange={e => setEmail(e.target.value)} />
            </FormField>
            {error && <Message error header='Error en la operación' content={error} />}
            <Button type='submit' color='green' loading={isLoading}>Registrarse</Button>
        </Form>
    );
};

export default PatientForm;
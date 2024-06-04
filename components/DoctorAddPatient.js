// components/DoctorAddPatient.js
import React, { useState } from 'react';
import { Button, Input, Form } from 'semantic-ui-react';

const AddPatientForm = ({ onAddPatient }) => {
  const [patientAddress, setPatientAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientAddress) {
      onAddPatient(patientAddress);
      setPatientAddress(''); // Clear input after submission
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Input
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          placeholder="0x..."
        />
      </Form.Field>
      <Button type='submit' primary>Agregar paciente</Button>
    </Form>
  );
};

export default AddPatientForm;

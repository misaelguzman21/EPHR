//components/AddConsultationModal.js

// components/AddConsultationModal.js

import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react';

const AddConsultationModal = ({ open, onClose, onSubmit, patientAddress }) => {
  const [consultation, setConsultation] = useState({
    patientAddress: patientAddress || '', // Initialize from props or default to empty if not provided
    consultationAdvice: '',
    medicine: '',
    timePeriod: ''
  });

  const handleChange = (e, { name, value }) => setConsultation(prev => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Consultation to submit:", consultation);
    if (!consultation.patientAddress || !consultation.consultationAdvice || !consultation.medicine || !consultation.timePeriod) {
      console.error("Cannot submit, some fields are missing:", consultation);
      return;
    }
    onSubmit(consultation);
    onClose(); // Close modal after submission
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Agregar consulta</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Dirección del paciente</label>
            <Input name="patientAddress" value={consultation.patientAddress} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Detalles de la consulta</label>
            <Input name="consultationAdvice" value={consultation.consultationAdvice} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Medicina</label>
            <Input name="medicine" value={consultation.medicine} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Periodo de tiempo</label>
            <Input name="timePeriod" value={consultation.timePeriod} onChange={handleChange} />
          </Form.Field>
          <Button type='submit' primary>Enviar</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export {AddConsultationModal};

// components/PatientAppointmentModal.js
import React, { useState } from 'react';
import { Button, Modal, Form, TextArea, Message } from 'semantic-ui-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';  

const ScheduleAppointmentModal = ({ doctorId, open, onClose, onSchedule }) => {
  const [date, setDate] = useState(dayjs());
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSchedule = async () => {
    if (!reason.trim()) {
      setError('Por favor, proporciona un motivo para la consulta.');
      return;
    }
    setError('');
    await onSchedule(doctorId, reason, date);
    onClose(); // Cerrar modal después de agendar
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Agendar Cita</Modal.Header>
      <Modal.Content>
        <Form error={!!error}>
          <Form.Field>
            <label>Motivo de la consulta</label>
            <TextArea placeholder='Describe el motivo de tu consulta' value={reason} onChange={(e, { value }) => setReason(value)} />
          </Form.Field>
          <Form.Field>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de la cita"
                value={date}
                onChange={setDate}
                renderInput={(params) => <Form.Input {...params} />}
              />
            </LocalizationProvider>
          </Form.Field>
          {error && <Message error content={error} />}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSchedule} positive>Agendar</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ScheduleAppointmentModal;

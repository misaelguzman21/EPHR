// components/ConsultationTable.js
import React from 'react';
import { Table } from 'semantic-ui-react';

const ConsultationTable = ({ consultations }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Paciente</Table.HeaderCell>
          <Table.HeaderCell>Descripción de consulta</Table.HeaderCell>
          <Table.HeaderCell>Medicamento</Table.HeaderCell>
          <Table.HeaderCell>Periodo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {consultations.map((consult, index) => (
          <Table.Row key={index}>
            <Table.Cell>{consult.patientName}</Table.Cell>
            <Table.Cell>Consulta general. Tomar medicamentos por 15 días</Table.Cell>
            <Table.Cell>{consult.medicine}</Table.Cell>
            <Table.Cell>2 meses</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export {ConsultationTable};

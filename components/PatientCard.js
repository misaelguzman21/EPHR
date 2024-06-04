// components/PatientCard.js
import React from 'react';
import { Card, Button } from 'semantic-ui-react';

const PatientCard = ({ patient, onViewDetails }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{patient.name}</Card.Header>
        <Card.Description>
          <p>Address: {patient.address}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={() => onViewDetails(patient.address)}>View Details</Button>
      </Card.Content>
    </Card>
  );
};

export {PatientCard};

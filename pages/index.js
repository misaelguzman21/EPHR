// pages/index.js
import React from 'react';
import { Button, Modal, Header, Icon, Grid, Message, Segment } from 'semantic-ui-react';
import { useWeb3 } from '../contexts/Web3Context';
import DoctorForm from '../components/DoctorForm';
import PatientForm from '../components/PatientForm';

function Signup() {
  const { account, isMetaMaskInstalled } = useWeb3();
  const [doctorModalOpen, setDoctorModalOpen] = React.useState(false);
  const [patientModalOpen, setPatientModalOpen] = React.useState(false);

  const handleConnectClick = async () => {
    if (!isMetaMaskInstalled) {
      alert('Please install MetaMask to use this feature.');
      return;
    }
    // Additional logic to handle MetaMask connection could be placed here
    const web3 = getWeb3();
    try {
      const accounts = await web3.eth.requestAccounts(); // Aquí puede ser necesario ajustar cómo obtienes las cuentas
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask', error);
    }
  };

  return (
      <div style={{ backgroundColor: '#7db9d3', minHeight: '100vh' }}>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='white' textAlign='center'>
              <Icon name='heart' size='large' color='red' /> Bienvenido a MediHeart
            </Header>
            <Segment stacked>
              {account ? (
                <div>
                  Cuenta Conectada: {account}
                </div>
              ) : (
                <Button onClick={handleConnectClick} color="blue">Conectar a MetaMask</Button>
              )}
              <br></br>
              <Button onClick={() => setDoctorModalOpen(true)} color="green">
                Registrarse como Doctor
              </Button>
              <br></br>
              <Button onClick={() => setPatientModalOpen(true)} color="orange">
                Registrarse como Paciente
              </Button>
              <br></br>
            </Segment>
            <Message>
              ¿Ya tienes cuenta? <a href='#'>Ingresa ahora</a>
            </Message>
            <Modal open={doctorModalOpen} onClose={() => setDoctorModalOpen(false)}>
              <Modal.Header>Registro Doctor</Modal.Header>
              <Modal.Content>
                <DoctorForm />
              </Modal.Content>
            </Modal>

            <Modal open={patientModalOpen} onClose={() => setPatientModalOpen(false)}>
              <Modal.Header>Registro Paciente</Modal.Header>
              <Modal.Content>
                <PatientForm />
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>
            <link
              async
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
      </div>
  );
}

export default Signup;

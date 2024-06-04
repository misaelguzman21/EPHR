// pages/patient/[address].js
import React from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './DynamicSidebar.module.css'; // Asegúrate de que la ruta relativa es correcta

const DynamicSidebar = ({ userType }) => {
  const router = useRouter();
  const { address } = router.query;

  const isActive = (route) => {
    return router.pathname === route;
  }

  return (
    <Menu pointing secondary vertical className={`${styles.customMenu} ${styles.dynamicSidebar}`}>
      <br></br>
      <Menu.Item>
            <Header as='h2' style={{ color: 'white', fontFamily: 'Arial, sans-serif', marginTop: '10px' }}>
              <Icon name='heart' color='red' />
              <Header.Content>
                MediHeart
                <Header.Subheader style={{ color: '#ddd' }}>Cuida tu salud</Header.Subheader>
              </Header.Content>
            </Header>
        </Menu.Item>
        <br /><br />
      <Link href={`/${userType}/${address}`} passHref>
        <Menu.Item
          name='dashboard'
          active={isActive(`/${userType}/${address}`)}
          className={isActive(`/${userType}/${address}`) ? styles.activeMenuItem : styles.menuItem}
        >
          Dashboard
        </Menu.Item>
      </Link>
      {userType === 'doctor' && (
        <>
          <Link href={`/doctor/${address}/patients`} passHref>
            <Menu.Item
              name='patients'
              active={isActive(`/doctor/${address}/patients`)}
              className={isActive(`/doctor/${address}/patients`) ? styles.activeMenuItem : styles.menuItem}
            >
              Pacientes
            </Menu.Item>
          </Link>
          <Link href={`/doctor/${address}/consultations`} passHref>
            <Menu.Item
              name='consultations'
              active={isActive(`/doctor/${address}/consultations`)}
              className={isActive(`/doctor/${address}/consultations`) ? styles.activeMenuItem : styles.menuItem}
            >
              Consultas
            </Menu.Item>
          </Link>
        </>
      )}
      {userType === 'patient' && (
        <>
          <Link href={`/patient/${address}/doctors`} passHref>
            <Menu.Item
              name='doctors'
              active={isActive(`/patient/${address}/doctors`)}
              className={isActive(`/patient/${address}/doctors`) ? styles.activeMenuItem : styles.menuItem}
            >
              Doctores
            </Menu.Item>
          </Link>
          <Link href={`/patient/${address}/files`} passHref>
            <Menu.Item
              name='files'
              active={isActive(`/patient/${address}/files`)}
              className={isActive(`/patient/${address}/files`) ? styles.activeMenuItem : styles.menuItem}
            >
              Archivos
            </Menu.Item>
          </Link>
          <Link href={`/patient/${address}/consultations`} passHref>
            <Menu.Item
              name='consultations'
              active={isActive(`/patient/${address}/consultations`)}
              className={isActive(`/patient/${address}/consultations`) ? styles.activeMenuItem : styles.menuItem}
            >
              Consultas
            </Menu.Item>
          </Link>
        </>
      )}
    </Menu>
  );
};

export default DynamicSidebar;

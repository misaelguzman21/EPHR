# EPHR - Sistema de Registros Electrónicos Personales de Salud en Blockchain

Este repositorio contiene el código fuente y la documentación del proyecto de tesina titulado "Sistema de registros electrónicos personales de salud para su distribución en Blockchain", desarrollado por Misael Guzmán Gutiérrez como parte del Proyecto Integrador para el Desarrollo de Soluciones Empresariales en el Instituto Tecnológico y de Estudios Superiores de Monterrey, Campus Querétaro.

## Descripción

En el contexto actual, la seguridad y privacidad de los datos de salud son una constante inquietud para la industria tecnológica de salud o healthcare 4.0. Este proyecto propone una solución web basada en tecnología blockchain para la gestión de registros electrónicos de salud (EHR), empleando Swarm para el almacenamiento de datos. El objetivo es evaluar la trazabilidad, seguridad y transparencia de las transacciones de datos entre pacientes y médicos, mejorando la digitalización del sector salud.

## Objetivos

- Desarrollar una plataforma web que permita a los pacientes subir sus archivos a una red de almacenamiento descentralizado y gestionar los permisos de acceso para los doctores.
- Implementar la solución utilizando contratos inteligentes (smart contracts) en la red de prueba de Ethereum Sepolia.
- Evaluar la eficiencia y el rendimiento de Swarm dentro del marco de blockchain.

## Hipótesis

La implementación de una plataforma de registros electrónicos personales de salud (EPHR) utilizando tecnología blockchain permitirá una gestión más segura y eficiente de los datos de salud del paciente, mejorando la privacidad y el control de acceso a la información, y reduciendo los costos operativos en comparación con los sistemas tradicionales de EHR.

## Tecnologías Utilizadas

- **Frontend:** Next.js 12.0, Semantic UI React
- **Backend:** Contratos inteligentes en Solidity 0.8.9 desplegados en Ethereum Sepolia usando Truffle (HDWalletProvider) 2.1.15
- **Almacenamiento Descentralizado:** Swarm
- **Interacción con Blockchain:** Web3.js, MetaMask

## Estructura del Proyecto

- `contracts/`: Contiene los contratos inteligentes en Solidity.
- `frontend/`: Contiene el código del frontend desarrollado con Next.js.
- `scripts/`: Scripts para desplegar los contratos inteligentes.
- `test/`: Pruebas automatizadas para los contratos inteligentes.

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/misaelguzman21/EPHR.git
    cd EPHR
    ```

2. Instalar las dependencias del frontend:

    ```bash
    cd frontend
    npm install
    ```

3. Configurar las variables de entorno para la conexión a Ethereum y Swarm en un archivo `.env` en el directorio `frontend`:

    ```plaintext
    NEXT_PUBLIC_INFURA_PROJECT_ID=<tu_infura_project_id>
    NEXT_PUBLIC_SWARM_API=<tu_swarm_api_url>
    ```

4. Desplegar los contratos inteligentes:

    ```bash
    cd ../scripts
    truffle migrate --network sepolia
    ```

5. Iniciar la aplicación frontend:

    ```bash
    cd ../frontend
    npm run dev
    ```

## Uso

1. Abrir la aplicación en el navegador en `http://localhost:3000`.
2. Registrar un nuevo paciente o doctor.
3. Subir archivos médicos y gestionar los permisos de acceso.

## Tesina

Para más detalles sobre el proyecto, puedes consultar la tesina completa [aquí](/TESINA FINAL A01209455.pdf).

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cualquier cambio importante antes de realizarlo.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Autor

Misael Guzmán Gutiérrez

## Agradecimientos

- Dr. José Antonio Cantoral Ceballos, Asesor del proyecto
- Instituto Tecnológico y de Estudios Superiores de Monterrey, Campus Querétaro



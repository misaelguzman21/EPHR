const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');
const contracts = require('../ethereum/compile');
const web3 = new Web3(ganache.provider())

Number.MAX_SAFE_INTEGER;
let accounts;
let doctorContract;
let patientContract;
let ehrContract;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts(30);

    // Access the compiled Doctor contract
    doctorContract = await new web3.eth.Contract(contracts['Doctor'].abi)
        .deploy({ data: contracts['Doctor'].bytecode })
        .send({ from: accounts[0], gas: '2000000' });

    // Access the compiled Patient contract
    patientContract = await new web3.eth.Contract(contracts['Patient'].abi)
        .deploy({ data: contracts['Patient'].bytecode })
        .send({ from: accounts[0], gas: '2000000' });

    // Access the compiled EHR contract
    ehrContract = await new web3.eth.Contract(contracts['EHR'].abi)
        .deploy({ 
            data: contracts['EHR'].bytecode,
            arguments: [doctorContract.options.address, patientContract.options.address]
        })
        .send({ from: accounts[0], gas: '2000000' });
});

describe('EHR Contract', () => {
    it('deploys all 3 contracts', () => {
        assert.ok(doctorContract.options.address);
        assert.ok(patientContract.options.address);
        assert.ok(ehrContract.options.address);
    });

    it('allows one doctor to register', async () => {
        
        try {
            // Asegúrate de tener acceso al ABI de Doctor.sol
            const doctorABI = contracts.Doctor.abi;
            const ehrABI = contracts.EHR.abi;

            // Después de enviar la transacción y obtener el recibo
                const result = await ehrContract.methods.registerDoctor(accounts[0],"Michelle Guzman", "4451054390", "Ginecologist")
                    .send({ from: accounts[0], gas: 3000000 });

            // Decodificar todos los eventos usando el ABI de Doctor.sol
            const decodedEvents = result.logs.map(log => {
                // Intenta decodificar cada log con el ABI de Doctor, ignorando los que no coincidan
                try {
                    return web3.eth.abi.decodeLog(
                        doctorABI.find(abiItem => abiItem.name === 'doctorSignup' && abiItem.type === 'event').inputs,
                        log.data,
                        log.topics.slice(1) // El primer topic es la firma del evento, los siguientes son los indexed parameters
                    );
                } catch (error) {
                    return null;
                }
            }).filter(event => event !== null); // Elimina los logs no decodificados

            if (decodedEvents.length > 0) {
                console.log('Evento doctorSignup decodificado:', decodedEvents);
            } else {
                console.log('No se encontraron eventos doctorSignup.');
            }
            const decodedEvents1 = result.logs.map(log => {
                // Intenta decodificar cada log con el ABI de Doctor, ignorando los que no coincidan
                try {
                    return web3.eth.abi.decodeLog(
                        ehrABI.find(abiItem => abiItem.name === 'doctorRegister' && abiItem.type === 'event').inputs,
                        log.data,
                        log.topics.slice(1) // El primer topic es la firma del evento, los siguientes son los indexed parameters
                    );
                } catch (error) {
                    return null;
                }
            }).filter(event => event !== null); // Elimina los logs no decodificados

            if (decodedEvents1.length > 0) {
                console.log('Evento doctorRegister decodificado:', decodedEvents1);
            } else {
                console.log('No se encontraron eventos doctorRegister.');
            }

            // Continúa con la verificación de la información del doctor registrado
            const created_doctor = await ehrContract.methods.getDoctorInformation(accounts[0]).call({from: accounts[0]});

            // Directly access the values returned by the function
            const doctorName = created_doctor[2];
            const doctorPhone = created_doctor[3];
            const doctorSpecialization = created_doctor[4];
            console.log(created_doctor);

            assert.equal(doctorName, "Michelle Guzman", "The doctor's name does not match.");
            assert.equal(doctorPhone, "4451054390", "The doctor's phone does not match.");
            assert.equal(doctorSpecialization, "Ginecologist", "The doctor's specialization does not match.");
    
            
        } catch (error) {
            assert.fail(`El registro del doctor falló: ${error.message}`);
        }
    });

   it('allows multiple doctors to register', async () => {
        
        try {

             await ehrContract.methods.registerDoctor(accounts[0],"Michelle Guzman", "4451054390", "Ginecologist")
                .send({ from: accounts[0], gas: 3000000 });
            created_doctor1 = await ehrContract.methods.getDoctorInformation(accounts[0]).call({from: accounts[0]});


            await ehrContract.methods.registerDoctor(accounts[1],"Misael Guzman", "4451064619", "Cardiologist")
                .send({ from: accounts[1], gas: 3000000 });
            created_doctor2 = await ehrContract.methods.getDoctorInformation(accounts[1]).call({from: accounts[1]});

            await ehrContract.methods.registerDoctor(accounts[2],"Roberto Guzman", "4451138330", "Psychiatrist")
                .send({ from: accounts[2], gas: 3000000 });
            created_doctor3 = await ehrContract.methods.getDoctorInformation(accounts[2]).call({from: accounts[2]});

            console.log(created_doctor1);
            console.log(created_doctor2);
            console.log(created_doctor3);

            assert.equal(created_doctor1[2], "Michelle Guzman", "The doctor's name does not match.");
            assert.equal(created_doctor1[3], "4451054390", "The doctor's phone does not match.");
            assert.equal(created_doctor1[4], "Ginecologist", "The doctor's specialization does not match.");
            assert.equal(created_doctor2[2], "Misael Guzman", "The doctor's name does not match.");
            assert.equal(created_doctor2[3], "4451064619", "The doctor's phone does not match.");
            assert.equal(created_doctor2[4], "Cardiologist", "The doctor's specialization does not match.");
            assert.equal(created_doctor3[2], "Roberto Guzman", "The doctor's name does not match.");
            assert.equal(created_doctor3[3], "4451138330", "The doctor's phone does not match.");
            assert.equal(created_doctor3[4], "Psychiatrist", "The doctor's specialization does not match.");

            
        } catch (error) {
            assert.fail(`El registro del doctor falló: ${error.message}`);
        }
    }); 


   it('allows one patient to register', async () => {
        try {
            // Intenta registrar un doctor pasando los argumentos individualmente
            await ehrContract.methods.registerPatient(accounts[0],"Erick Calderon", Number(24),  web3.utils.asciiToHex("4454558549"), web3.utils.asciiToHex("biggiesmalls@gmail.com"))
                .send({ from: accounts[0], gas: 3000000 });

            // Recupera la información del doctor registrado
            const created_patient = await ehrContract.methods.getPatientInformation(accounts[0]).call({from: accounts[0]});
            const phoneNumberHex = created_patient['3'];
            const emailHex = created_patient['4'];
            
            // Convierte de hex a ASCII y trimea los resultados
            const phoneNumber = web3.utils.hexToAscii(phoneNumberHex);
            const email = web3.utils.hexToAscii(emailHex);

            // Verifica que la información recuperada coincide con la esperada
            assert.equal(created_patient['1'], "Erick Calderon", "El nombre del paciente no coincide");
            assert.equal(Number(created_patient['2']), 24, "La edad del paciente no coincide");
            assert.equal(phoneNumber, "4454558549", "El teléfono del paciente no coincide");
            assert.equal(email, "biggiesmalls@gmail.com", "El correo del paciente no coincide");

            console.log(created_patient);
            console.log("Teléfono: ", phoneNumber);
            console.log("Correo: ", email);

        } catch (error) {
            // Maneja cualquier error que ocurra durante el registro o la recuperación de la información
            assert.fail(`El registro del paciente falló: ${error.message}`);
        }
    });
    it('allows patient registration, file addition, and retrieval', async () => {
        try {
            // Paso 1: Registrar un paciente
            await ehrContract.methods.registerPatient(
                accounts[0], "Erick Calderon", 24, web3.utils.asciiToHex("4454558549"), web3.utils.asciiToHex("biggiesmalls@gmail.com")
            ).send({ from: accounts[0], gas: '3000000' });
    
            // Paso 2: Obtener la información del paciente registrado
            const patientInfo = await ehrContract.methods.getPatientInformation(accounts[0]).call({ from: accounts[0] });
            console.log("Información del paciente:", patientInfo);
    
            // Asegúrate de que la información del paciente coincide
            assert.equal(patientInfo[1], "Erick Calderon", "El nombre del paciente no coincide.");
            assert.equal(patientInfo[2], "24", "La edad del paciente no coincide.");
            // Asume que tienes funciones para convertir de hex a ASCII si es necesario
    
            // Paso 3: Añadir archivos para el paciente
            await ehrContract.methods.addFileFromPatient(
                accounts[0], "file1.txt", "text", "hash1"
            ).send({ from: accounts[0], gas: '3000000' });
    
            await ehrContract.methods.addFileFromPatient(
                accounts[0], "file2.jpg", "image", "hash2"
            ).send({ from: accounts[0], gas: '3000000' });
    
            // Paso 4: Obtener los archivos del paciente mediante su ID
            const files = await ehrContract.methods.getFilesFromPatient(accounts[0]).call({ from: accounts[0] });
            console.log("Archivos del paciente:", files);
    
            // Asegúrate de que los archivos han sido añadidos correctamente
            assert.equal(files.length, 2, "El número de archivos del paciente no coincide.");
            assert.equal(files[0].file_name, "file1.txt", "El nombre del primer archivo no coincide.");
            assert.equal(files[1].file_name, "file2.jpg", "El nombre del segundo archivo no coincide.");
    
        } catch (error) {
            // Maneja cualquier error que ocurra durante el proceso
            assert.fail(`El proceso falló: ${error.message}`);
        }
    });
    it('completes the patient-doctor file interaction flow', async () => {
        // Asegúrate de tener acceso al ABI de Doctor.sol
        const doctorABI = contracts.Doctor.abi;
        const patientABI = contracts.Patient.abi;

        // Registro de un paciente
        const patient = await ehrContract.methods.registerPatient(accounts[0],"Erick Calderon", 24, web3.utils.asciiToHex("4454558549"), web3.utils.asciiToHex("biggiesmalls@gmail.com"))
            .send({ from: accounts[0], gas: '3000000' });
        // Decodificar todos los eventos usando el ABI de Doctor.sol
        const decodedEvents0 = patient.logs.map(log => {
            // Intenta decodificar cada log con el ABI de Doctor, ignorando los que no coincidan
            try {
                return web3.eth.abi.decodeLog(
                    patientABI.find(abiItem => abiItem.name === 'patientSignUp' && abiItem.type === 'event').inputs,
                    log.data,
                    log.topics.slice(1) // El primer topic es la firma del evento, los siguientes son los indexed parameters
                );
            } catch (error) {
                return null;
            }
        }).filter(event => event !== null); // Elimina los logs no decodificados

        if (decodedEvents0.length > 0) {
            console.log('Evento patientSignUp decodificado:', decodedEvents0);
        } else {
            console.log('No se encontraron eventos patientSignUp.');
        }
        // Obtención de la información del paciente
        const patientInfo = await ehrContract.methods.getPatientInformation(accounts[0]).call({ from: accounts[0] });
        console.log("Información del paciente:", patientInfo);
    
        // Registro de un doctor
        const doctor = await ehrContract.methods.registerDoctor(accounts[1], "Dr. Michelle Guzman", "4451054390", "Ginecologist")
            .send({ from: accounts[1], gas: '3000000' });

            // Decodificar todos los eventos usando el ABI de Doctor.sol
        const decodedEvents1 = doctor.logs.map(log => {
            // Intenta decodificar cada log con el ABI de Doctor, ignorando los que no coincidan
            try {
                return web3.eth.abi.decodeLog(
                    doctorABI.find(abiItem => abiItem.name === 'doctorSignup' && abiItem.type === 'event').inputs,
                    log.data,
                    log.topics.slice(1) // El primer topic es la firma del evento, los siguientes son los indexed parameters
                );
            } catch (error) {
                return null;
            }
        }).filter(event => event !== null); // Elimina los logs no decodificados

        if (decodedEvents1.length > 0) {
            console.log('Evento doctorSignup decodificado:', decodedEvents1);
        } else {
            console.log('No se encontraron eventos doctorSignup.');
        }
    
        // Obtención de la información del doctor
        //const doctorInfo = await ehrContract.methods.getDoctorInformation(accounts[1]).call({ from: accounts[1] });
        //console.log("Información del doctor:", doctorInfo);
        
        const doctorAddPatient = await ehrContract.methods.DoctorAddPatientToList(accounts[1], accounts[0])
            .send({ from: accounts[1], gas: '3000000' });

                // Decodificar todos los eventos usando el ABI de Doctor.sol
        const decodedEvents3 = doctorAddPatient.logs.map(log => {
            // Intenta decodificar cada log con el ABI de Doctor, ignorando los que no coincidan
            try {
                return web3.eth.abi.decodeLog(
                    doctorABI.find(abiItem => abiItem.name === 'PatientAdded' && abiItem.type === 'event').inputs,
                    log.data,
                    log.topics.slice(1) // El primer topic es la firma del evento, los siguientes son los indexed parameters
                );
            } catch (error) {
                return null;
            }
        }).filter(event => event !== null); // Elimina los logs no decodificados

        if (decodedEvents3.length > 0) {
            console.log('Evento PatientAdded decodificado:', decodedEvents3);
        } else {
            console.log('No se encontraron eventos PatientAdded.');
        }
        const doctorInfoAfterAddPatient = await ehrContract.methods.getDoctorInformation(accounts[1]).call({ from: accounts[1] });
        console.log("Información del doctor ya con el id del paciente en el primer índice (0):", doctorInfoAfterAddPatient);

        // Que el doctor cree archivos para el paciente
        // Asegúrate de que `addFilesForPatient` en EHR.sol llame correctamente a `doctorAddFiles` en Doctor.sol
        const result = await ehrContract.methods.addFilesForPatient(accounts[1], accounts[0], "file1.txt", "text", "hash1")
            .send({ from: accounts[1], gas: '3000000' }); // Aquí asumimos que el doctor está enviando desde accounts[1]
    
        await ehrContract.methods.addFilesForPatient(accounts[1], accounts[0], "file2.jpg", "image", "hash2")
            .send({ from: accounts[1], gas: '3000000' });

        // Decodificar todos los eventos usando el ABI de Doctor.sol
        const decodedEvents = result.logs.map(log => {
            // Intenta decodificar cada log con el ABI de Doctor, ignorando los que no coincidan
            try {
                return web3.eth.abi.decodeLog(
                    doctorABI.find(abiItem => abiItem.name === 'doctorAddPatientFile' && abiItem.type === 'event').inputs,
                    log.data,
                    log.topics.slice(1) // El primer topic es la firma del evento, los siguientes son los indexed parameters
                );
            } catch (error) {
                return null;
            }
        }).filter(event => event !== null); // Elimina los logs no decodificados

        if (decodedEvents.length > 0) {
            console.log('Evento doctorAddPatientFile decodificado:', decodedEvents);
        } else {
            console.log('No se encontraron eventos doctorAddPatientFile.');
        }

        // Obtención de los archivos que subió el doctor para el paciente mediante el id del paciente
        const patientFiles = await ehrContract.methods.getFilesFromDoctor(accounts[0]).call({ from: accounts[1] });

        console.log("Archivos subidos por el doctor para el paciente:", patientFiles);

        //const PatientFilesFromPatient = await ehrContract.methods.getFilesFromPatient(accounts[0]).call({ from: accounts[0] });
        //console.log("Archivos vistos desde el paciente:", PatientFilesFromPatient);
    
        // Verificaciones (opcional según lo que quieras comprobar)
        assert.equal(patientFiles.length, 2, "El número de archivos subidos por el doctor no coincide.");
        assert.equal(patientFiles[0].file_name, "file1.txt", "El nombre del primer archivo no coincide.");
        assert.equal(patientFiles[1].file_name, "file2.jpg", "El nombre del segundo archivo no coincide.");

    });
    it('allows a doctor to offer a medical consultation and add a patient to their list', async () => {
           // Registrar un doctor y un paciente para el test
        await ehrContract.methods.registerDoctor(accounts[1], "Dr. Michelle", "4451054390", "Ginecologist").send({ from: accounts[1], gas: '1000000' });
        await ehrContract.methods.registerPatient(accounts[2], "Erick Calderon", Number(24), web3.utils.asciiToHex("4454558549"), web3.utils.asciiToHex("biggiesmalls@gmail.com")).send({ from: accounts[2], gas: '1000000' });

        // Asegurar que el doctor puede ofrecer una consulta médica
        await ehrContract.methods.offerMedicalConsultation(accounts[1], accounts[2], "Consulta general", "Paracetamol", "1 semana").send({ from: accounts[1], gas: '1000000' });

        // Recuperar y verificar la información de la consulta
        const consultations = await ehrContract.methods.getConsultationDoctor(accounts[2]).call({ from: accounts[2] });
        console.log(consultations);
        assert.equal(consultations.length, 1);
        assert.equal(consultations[0].doc_id, accounts[1]);
        assert.equal(consultations[0].consultation_advice, "Consulta general");
        assert.equal(consultations[0].medicine, "Paracetamol");

        // Agregar al paciente a la lista del doctor después de la consulta
        await ehrContract.methods.DoctorAddPatientToList(accounts[1], accounts[2]).send({ from: accounts[1], gas: '1000000' });

        // Verificar que el paciente ha sido agregado a la lista del doctor
        const doctorInfo = await ehrContract.methods.getDoctorInformation(accounts[1]).call({ from: accounts[1] });
        console.log(doctorInfo);
        //assert.equal(doctorInfo.patient_list.includes(accounts[2]), true);
    });
    it('should allow a patient to schedule a consultation and add the doctor to their list', async () => {
        try {
            // Agendar una consulta y agregar al doctor a la lista del paciente
            // Registrar un doctor y un paciente
            const patientABI = contracts.Patient.abi;

            await ehrContract.methods.registerDoctor(accounts[0], "Dr. Michelle", "4451054390", "Ginecologist").send({ from: accounts[0], gas: 3000000 });
            const doctorInfo = await ehrContract.methods.getDoctorInformation(accounts[0]).call({ from: accounts[0] });
            await ehrContract.methods.registerPatient(accounts[1], "Erick Calderon", 24, web3.utils.asciiToHex("4454558549"), web3.utils.asciiToHex("biggiesmalls@gmail.com")).send({ from: accounts[1], gas: 3000000 });

            consultCreated = await ehrContract.methods.scheduleAppointmentFromPatient(accounts[1], accounts[0], "Consulta general para el 30 de febrero").send({ from: accounts[1], gas: 3000000 });
                            // Decodificar todos los eventos usando el ABI de Doctor.sol
            const decodedEvents = consultCreated.logs.map(log => {
                // Intenta decodificar cada log con el ABI de Doctor, ignorando los que no coincidan
                try {
                    return web3.eth.abi.decodeLog(
                        patientABI.find(abiItem => abiItem.name === 'DebugDoctorList' && abiItem.type === 'event').inputs,
                        log.data,
                        log.topics.slice(1) // El primer topic es la firma del evento, los siguientes son los indexed parameters
                    );
                } catch (error) {
                    return null;
                }
            }).filter(event => event !== null); // Elimina los logs no decodificados

            if (decodedEvents.length > 0) {
                console.log('Evento DebugDoctorList decodificado:', decodedEvents);
            } else {
                console.log('No se encontraron eventos DebugDoctorList.');
            }
            // Verificar eventos emitidos por la transacción
            assert(decodedEvents.length > 0, "El evento ConsultationScheduled no fue emitido");
            const patientInfo = await ehrContract.methods.getPatientInformation(accounts[1]).call({ from: accounts[1] });


            // Obtener la información actualizada del paciente y del doctor
            console.log(doctorInfo);
            console.log(patientInfo);

            console.log(patientInfo[5]); // Para ver específicamente la lista de doctores
            
            
            // Asegurarse de que patientInfo.doctor_list exista y luego verificar su longitud
            assert(patientInfo[5], "La lista de doctores del paciente no existe");
            assert.equal(patientInfo[5].length, 1, "La longitud de la lista de doctores del paciente debería ser 1");
            assert.equal(patientInfo[5][0], accounts[0], "La dirección del doctor en la lista del paciente no coincide con la esperada");


        } catch (error) {
            assert.fail(`El proceso falló: ${error.message}`);
        }
    });
    describe('Access Control Tests', () => {
        it('should allow a patient to grant and revoke access to their doctor', async () => {
            // Paso 1: Registrar doctor y paciente
            await ehrContract.methods.registerDoctor(accounts[0], "Dr. Michelle", "4451054390", "Ginecologist").send({ from: accounts[0], gas: '1000000' });
            await ehrContract.methods.registerPatient(accounts[1], "Erick Calderon", 24, web3.utils.asciiToHex("4454558549"), web3.utils.asciiToHex("biggiesmalls@gmail.com")).send({ from: accounts[1], gas: '1000000' });
    
            // Paso 2: Agendar una consulta (simulando una interacción previa que justifique el acceso)
            await ehrContract.methods.scheduleAppointmentFromPatient(accounts[1], accounts[0], "Consulta general").send({ from: accounts[1], gas: '1000000' });
    
            // Paso 3: Otorgar acceso
            await ehrContract.methods.grantAccessToDoctor(accounts[1], accounts[0]).send({ from: accounts[1], gas: '1000000' });
    
            // Paso 4: Verificar acceso
            const accessGranted = await ehrContract.methods.checkAccess(accounts[1], accounts[0]).call();
            console.log(accessGranted);
            assert.equal(accessGranted, true, "El acceso debería haber sido otorgado");
    
            // Paso 5: Revocar acceso
            await ehrContract.methods.revokeAccessFromDoctor(accounts[1], accounts[0]).send({ from: accounts[1], gas: '1000000' });
    
            // Paso 6: Verificar que el acceso ha sido revocado
            const accessRevoked = await ehrContract.methods.checkAccess(accounts[1], accounts[0]).call();
            console.log(accessRevoked);
            assert.equal(accessRevoked, false, "El acceso debería haber sido revocado");
        });
    });
});


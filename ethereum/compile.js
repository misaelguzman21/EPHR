const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Function to dynamically read all contract sources
function getContractSources() {
    const contractsDir = path.resolve(__dirname, 'contracts');
    return fs.readdirSync(contractsDir).reduce((input, contractFileName) => {
        const contractPath = path.join(contractsDir, contractFileName);
        const contractSource = fs.readFileSync(contractPath, 'utf8');
        input.sources[contractFileName] = { content: contractSource };
        return input;
    }, { sources: {} });
}

// Prepare compiler input with dynamic contract sources
let input = getContractSources();

// Add compiler settings
Object.assign(input, {
    language: 'Solidity',
    settings: {
        optimizer: {
            enabled: true,
            runs: 200 // Adjust based on expected contract execution frequency
        },
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
});

// Compile contracts
let compiledOutput = solc.compile(JSON.stringify(input));
let output = JSON.parse(compiledOutput);

// Extract compiled contracts
let contracts = {};

// Añadido: Directorio donde se guardarán los archivos ABI
const buildDir = path.resolve(__dirname, 'build/abi');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

for (let contractPath in output.contracts) {
    for (let contractName in output.contracts[contractPath]) {
        const contract = output.contracts[contractPath][contractName];
        if (contract && contract.evm && contract.evm.bytecode) {
            contracts[contractName] = {
                abi: contract.abi,
                bytecode: contract.evm.bytecode.object
            };
            // Añadido: Guardar la ABI en un archivo JSON
            const abiPath = path.resolve(buildDir, `${contractName}.json`);
            fs.writeFileSync(abiPath, JSON.stringify(contract.abi, null, 2), 'utf-8');
            console.log(`ABI for ${contractName} written to ${abiPath}`);
        } else {
            console.warn(`Compilation failed for ${contractName}`);
        }
    }
}
console.log(JSON.stringify(output, null, 2));

//let doctorABI = output.contracts['Doctor.sol'].Doctor.abi;
//let doctorBytecode = output.contracts['Doctor.sol'].Doctor.evm.bytecode.object;

// Acceso al ABI y bytecode para el contrato EHR
//let ehrABI = output.contracts['EHR.sol'].EHR.abi;
//let ehrBytecode = output.contracts['EHR.sol'].EHR.evm.bytecode.object;

// Acceso al ABI y bytecode para el contrato Patient
//let patientABI = output.contracts['Patient.sol'].Patient.abi;
//let patientBytecode = output.contracts['Patient.sol'].Patient.evm.bytecode.object;

// Ejemplo de cómo podrías imprimirlos para verificar
//console.log("Doctor ABI:", doctorABI);
//console.log("Doctor Bytecode:", doctorBytecode);

//console.log("EHR ABI:", ehrABI);
//console.log("EHR Bytecode:", ehrBytecode);

//console.log("Patient ABI:", patientABI);
//console.log("Patient Bytecode:", patientBytecode); 
module.exports = contracts;

/* const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Obtén el contenido del contrato
function getContractSource(contractName) {
    const contractPath = path.resolve(__dirname, 'contracts', `${contractName}.sol`);
    return fs.readFileSync(contractPath, 'utf8');
}

// Prepara los inputs del compilador
let input = {
    language: 'Solidity',
    sources: {
        'Doctor.sol': {
            content: getContractSource('Doctor')
        },
        'Patient.sol': {
            content: getContractSource('Patient')
        },
        'EHR.sol': {
            content: getContractSource('EHR')
        }
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200 // Ajusta este número basado en la frecuencia con la que esperas que se ejecute el contrato
        },
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

// Compila todos los contratos
let compiledOutput = solc.compile(JSON.stringify(input));

let output = JSON.parse(compiledOutput);

// Exporta los contratos compilados
let contracts = {};
for (let contract in output.contracts) {
    for (let contractName in output.contracts[contract]) {
        contracts[contractName] = {
            abi: output.contracts[contract][contractName].abi,
            bytecode: output.contracts[contract][contractName].evm.bytecode.object
        };
    }
}
//console.log(output.contracts);

// Acceso al ABI y bytecode para el contrato Doctor
let doctorABI = output.contracts['Doctor.sol'].Doctor.abi;
let doctorBytecode = output.contracts['Doctor.sol'].Doctor.evm.bytecode.object;

// Acceso al ABI y bytecode para el contrato EHR
let ehrABI = output.contracts['EHR.sol'].EHR.abi;
let ehrBytecode = output.contracts['EHR.sol'].EHR.evm.bytecode.object;

// Acceso al ABI y bytecode para el contrato Patient
let patientABI = output.contracts['Patient.sol'].Patient.abi;
let patientBytecode = output.contracts['Patient.sol'].Patient.evm.bytecode.object;

// Ejemplo de cómo podrías imprimirlos para verificar
 console.log("Doctor ABI:", doctorABI);
console.log("Doctor Bytecode:", doctorBytecode);

console.log("EHR ABI:", ehrABI);
console.log("EHR Bytecode:", ehrBytecode);

console.log("Patient ABI:", patientABI);
console.log("Patient Bytecode:", patientBytecode); 
module.exports = contracts;
 */
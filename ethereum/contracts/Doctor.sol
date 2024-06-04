// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

import "./IDoctor.sol";

    //Structure of doctor with basic data.
    struct doctor {
        address id;
        uint index;
        string name;
        string phone;
        string specialization;

        address[] patient_list;
    }
    struct doctorAddedFiles{
        string file_name;
        string file_type;
        string file_hash;
        address doc_id;
    }

    // structure for doctor offered consultation
    struct doctorOfferedConsultation
    {
        address doc_id;
        string consultation_advice;
        string medicine;
        string time_period;
    }

contract Doctor is IDoctor {
    mapping(address => doctor) internal doctors;
    //uint private doctorCount = 0;
    mapping(address => uint[]) internal doctorIndex;
    mapping (address => mapping(address => uint)) internal doctorToPatient;
    mapping (address => doctorAddedFiles[]) private doctorAddedPatientFiles;
    mapping (address => uint256) balanceOf;
    mapping (address => doctorOfferedConsultation[]) public doctorOfferedConsultationList;
    address[] public allDoctorAddresses;



    modifier doctorExists(address id){
        //id = msg.sender;
        //doctor memory d = doctors[id];
        require(doctors[id].id != address(0x0));
        _;
    }

     function getDoctorInfo(address id) public view  doctorExists(id) returns(address, uint, string memory, string memory, string memory, address[] memory){
        //id = msg.sender;
        doctor memory d = doctors[id];
        return(d.id, d.index, d.name, d.phone, d.specialization, d.patient_list);
    }

    function getAllDoctorAddresses() public view returns (address[] memory) {
        return allDoctorAddresses;
}
 
    event doctorSignup(address indexed __doctor, string message);
    function signUpDoctor(address userAddress, string memory _name, string memory _phone, string memory _specialization) public {
        //doctor memory d = doctors[msg.sender];

        require(bytes(_name).length > 9 && bytes(_name).length < 100, "Nombre debe tener entre 10 y 100 caracteres");
        require(bytes(_phone).length >= 10, "Telefono debe tener al menos 10 digitos");
        require(bytes(_specialization).length > 0, "La especializacion no puede estar vacia");

        //require(keccak256(abi.encodePacked(_name)) != keccak256(""), "El nombre no puede estar vacio");
        //require(keccak256(abi.encodePacked(_phone)) != keccak256("") , "El telefono no puede estar vacio");
        //require(keccak256(abi.encodePacked(_specialization)) != keccak256(""), "La especializacion no puede estar vacia");
        require(doctors[userAddress].id == address(0), "El doctor ya esta registrado.");
        //doctorCount++;
        doctors[userAddress] = doctor({id: userAddress, index: allDoctorAddresses.length, name: _name, phone: _phone, specialization: _specialization, patient_list:new address[](0)});

        allDoctorAddresses.push(userAddress);  // Almacena la dirección del doctor
        emit doctorSignup(userAddress, "Registered as a new Doctor!");
    }

    event doctorAddPatientFile(address _doctor, string msg, address _patient, uint gas_used);
    //--- function to add files from doctor end ---
    function doctorAddFiles(address userAddress, address _pat, string memory _file_name, string memory _file_type,string memory _file_hash) public
    {
        uint256 startGas = gasleft();  

        doctorAddedPatientFiles[_pat].push(doctorAddedFiles({file_name:_file_name, file_type:_file_type,file_hash:_file_hash, doc_id: userAddress}));
        
        uint256 endGas = gasleft();
        uint256 gas_used = startGas-endGas;
        emit doctorAddPatientFile(userAddress, "Added a file to patient record", _pat, gas_used);
    }

    function getDoctorAddedFiles(address pat) public view returns(doctorAddedFiles[] memory){
        return (doctorAddedPatientFiles[pat]);
    }


    event doctorOfferConsultation(address _doctor, string message, address _patient, string _consultation, string _medicine, uint256 gas_used);

    function addDoctorOfferedConsultation(address id, address _pat, string memory _consultation, string memory _medicine, string  memory _time) public 
    {
        uint256 startGas = gasleft();
        doctorOfferedConsultationList[_pat].push(doctorOfferedConsultation({doc_id:id, consultation_advice:_consultation,medicine:_medicine,time_period:_time}));
        
        uint256 endGas = gasleft();
        uint256 gas_used = startGas-endGas;
        emit doctorOfferConsultation(id, "Provided consultation to", _pat, _consultation, _medicine, gas_used);
    }

    event PatientAdded(address indexed doctorId, address patientId, string message);

    // Función para agregar un paciente a la lista del doctor
    function addPatientToList(address id, address patientId) public doctorExists(id) {
        // Verifica que el paciente no esté ya en la lista del doctor
        bool isPatientAlreadyAdded = false;
        for(uint i = 0; i < doctors[id].patient_list.length; i++){
            if(doctors[id].patient_list[i] == patientId){
                isPatientAlreadyAdded = true;
                break;
            }
        }

        require(!isPatientAlreadyAdded, "Paciente ya agregado a la lista.");

        // Agrega el paciente a la lista del doctor
        doctors[id].patient_list.push(patientId);

        emit PatientAdded(id, patientId, "Paciente agregado exitosamente a la lista.");
    }

    function getDoctorConsultation(address _pat)  public view returns (doctorOfferedConsultation[] memory){
        return (doctorOfferedConsultationList[_pat]);
    }

    
    function getDoctorConsultationForPatient()  public view returns (doctorOfferedConsultation[] memory){
        return (doctorOfferedConsultationList[msg.sender]);
    }

    // Función para obtener el número total de pacientes de un doctor
    function getPatientCount(address doctorAddress) public view returns (uint) {
        return doctors[doctorAddress].patient_list.length;
    }

    // Función para obtener el número total de consultas ofrecidas por un doctor a un paciente específico
    function getConsultationCount(address doctorAddress, address patientAddress) public view returns (uint) {
        return doctorOfferedConsultationList[patientAddress].length;
    }

}
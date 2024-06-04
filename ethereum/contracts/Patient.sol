// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;
import "./IPatient.sol";

    //Structure of patient with basic data.
    struct patient {
        address id;
        string name;
        uint8 age;
        bytes phone;
        bytes email;

        address[] doctor_list;
    }


contract Patient is IPatient {
    mapping(address => patient) internal patients;
    mapping (address => mapping (address => uint)) internal patientToDoctor;
    //mapping (address => mapping (bytes32 => uint)) internal patientToFile;
    mapping(address => files[]) internal patientFiles;
    address[] public allPatientAddresses;


    modifier checkPatient(address id){
        patient memory p = patients[id];
        require(p.id > address(0x0));
        _;
    }

    function getPatientInfo(address id) public view checkPatient(id) returns(address, string memory, uint8, bytes memory, bytes memory, address[] memory){
        //id = msg.sender;
        patient memory p = patients[id];
        return(p.id, p.name, p.age, p.phone, p.email, p.doctor_list);
    }
    function getAllPatientAddresses() public view returns (address[] memory) {
        return allPatientAddresses;
    }
 

    event patientSignUp(address _patient, string message);
    function signUpPatient(address patientAddress, string memory _name, uint8 _age, bytes memory _phone, bytes memory _email) public {
        //patient memory p = patients[msg.sender];
        //require(keccak256(abi.encodePacked(_name)) != keccak256(""));
        require(bytes(_name).length > 9 && bytes(_name).length < 100, "Nombre debe tener entre 10 y 100 caracteres");
        require(_phone.length > 0 && (_phone.length == 10));
        require((_age > 0) && (_age < 100));
        require(patients[patientAddress].id == address(0x0));

        patients[patientAddress] = patient({id: patientAddress, name: _name, age:_age, phone: _phone, email: _email, doctor_list:new address[](0)});
        allPatientAddresses.push(patientAddress);
        emit patientSignUp(patientAddress, "Registered as a new Patient!");
    }
    event ConsultationScheduled(address indexed patient, address indexed doctor, string consultationDetails);
    event DebugDoctorList(address indexed patient, address[] doctorList);

    // Función para que un paciente agende una consulta y agregue al doctor a su lista
    function scheduleConsultationAndAddDoctor(address id, address doctorId, string memory consultationDetails) public checkPatient(id) {
        // Agregar el doctor a la lista si aún no está presente
        bool doctorExists = false;
        for (uint i = 0; i < patients[id].doctor_list.length; i++) {
            if (patients[id].doctor_list[i] == doctorId) {
                doctorExists = true;
                break;
            }
        }

        if (!doctorExists) {
            patients[id].doctor_list.push(doctorId);
        }

        // Emitir evento de consulta agendada
        emit DebugDoctorList(id, patients[id].doctor_list);
        emit ConsultationScheduled(id, doctorId, consultationDetails);
    }

/*     function getPatientConsultation(address _doc)  public view returns (doctorOfferedConsultation[] memory){
        return (doctorOfferedConsultationList[_pat]);
    }
 */

        // New function to get files for a patient
    function getPatientFiles(address id) public view checkPatient(id) returns (files[] memory) {
        //id = msg.sender;
        return patientFiles[id];
    }

    // Function to add a file for a patient
    event DebugInfo(string description, address indexed addr);
    function addPatientFile(address id, string memory fileName, string memory fileType, string memory fileHash) checkPatient(id) public {
        // Ensure only authorized users can add files, such as the patient or an approved doctor
        //id = msg.sender;
        
        //require(msg.sender == id, "Unauthorized");

        patientFiles[id].push(files({
            file_name: fileName,
            file_type: fileType,
            file_hash: fileHash
        }));
        emit DebugInfo("File added successfully", id);

    }
}
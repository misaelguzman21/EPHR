// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.9;
import "./IDoctor.sol";
import "./IPatient.sol";

contract EHR {
  address private owner;
  IDoctor private doctorContract;
  IPatient private patientContract;

  mapping (address => files[]) private patientFiles;

  // mapping (address => doctorAddedFiles[]) private doctorAddedPatientFiles;
  // mapping (address => doctorOfferedConsultation[]) private doctorOfferedConsultationList;
  
  //setting the owner
  constructor(address _doctorAddress, address _patientAddress) {
    owner = msg.sender;
    doctorContract = IDoctor(_doctorAddress);
    patientContract = IPatient(_patientAddress);
  }
  
 
  //owner verification modifier
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
   
       // Delega el registro de doctor a Doctor.sol
  event doctorRegister(address _doctor, string name, string phone, string specialization, string message);
  function registerDoctor(string memory _name, string memory _phone, string memory _specialization) public {
      require(bytes(_name).length > 0, "Name is required");
      require(bytes(_phone).length > 0, "Phone number is required");
      require(bytes(_specialization).length > 0, "Specialization is required");

      require(address(doctorContract) != address(0), "Doctor contract address is not set");
      
      try doctorContract.signUpDoctor(msg.sender, _name, _phone, _specialization) {
          emit doctorRegister(msg.sender, _name, _phone, _specialization, "A new doctor has been registered");
      } catch Error(string memory reason) {
          revert(reason);
      } catch (bytes memory) {
          revert("Unknown error occurred while registering doctor");
      }
  }

  function getDoctorInformation(address id) public view returns (address, uint, string memory, string memory, string memory, address[] memory) {
        //id = msg.sender;
        return doctorContract.getDoctorInfo(id);
  }

    function getAllDoctors() public view returns (address[] memory) {
        //id = msg.sender;
        return doctorContract.getAllDoctorAddresses();
  }

  function getPatientNumber(address doctorAddress) public view returns (uint){
        return doctorContract.getPatientCount(doctorAddress);
  }

  function getConsultationNumber(address doctorAddress, address patientAddress) public view returns (uint){
        return doctorContract.getConsultationCount(doctorAddress, patientAddress);

  }

    // Delega el registro de paciente a Patient.sol
  function registerPatient( string memory _name, uint8 _age, bytes memory _phone, bytes memory _email) public {
        patientContract.signUpPatient(msg.sender, _name, _age, _phone, _email);
  }

  function getPatientInformation(address id) public view returns (address, string memory, uint8, bytes memory, bytes memory, address[] memory) {
        //id = msg.sender;
      return patientContract.getPatientInfo(id);
  }

  function getAllPatients() public view returns (address[] memory) {
        return patientContract.getAllPatientAddresses();
  }


  function DoctorAddPatientToList(address _patient) public{
      doctorContract.addPatientToList(msg.sender, _patient);

  }

  function addFilesForPatient(address _patient, string memory _file_name, string memory _file_type, string memory _file_hash) public {
        doctorContract.doctorAddFiles(msg.sender, _patient, _file_name, _file_type, _file_hash);
  }
  function getFilesFromDoctor(address _patient) public view returns (doctorAddedFiles[] memory){
    return doctorContract.getDoctorAddedFiles(_patient);
  }

  function offerMedicalConsultation(address _patient, string memory _consultation, string memory _medicine, string memory _time) public {
        doctorContract.addDoctorOfferedConsultation(msg.sender, _patient, _consultation, _medicine, _time);
  }
// Modifica esta función para que devuelva el valor obtenido de la llamada
  function getConsultationDoctor(address _patient) public view returns (doctorOfferedConsultation[] memory) {
    return doctorContract.getDoctorConsultation(_patient);
  }


/* function getDoctorConsultationPatient(address _patient) public view returns (doctorOfferedConsultation[] memory) {

    return doctorContract.getDoctorConsultationForPatient(_patient);
} */
function getPatientInfoForDoctor(address _patient) public view returns (address, string memory, uint8, bytes memory, bytes memory, address[] memory) {
    // Utilizando la interfaz IPatient para obtener la información del paciente, incluidos los archivos.
    return patientContract.getPatientInfo(_patient);
}

function addFileFromPatient(string memory fileName, string memory fileType, string memory fileHash) public{
    return patientContract.addPatientFile(msg.sender, fileName, fileType, fileHash);

}

function getFilesFromPatient(address id) public view returns (files[] memory){
    return patientContract.getPatientFiles(id);

}

function scheduleAppointmentFromPatient(address _doctor, string memory consultationDetails) public{
      patientContract.scheduleConsultationAndAddDoctor(msg.sender, _doctor, consultationDetails);

}

mapping(address => mapping(address => bool)) private doctorPatientAccess;

event AccessGranted(address indexed doctor, address indexed patient);
event AccessRevoked(address indexed doctor, address indexed patient);

// Renombra los parámetros para evitar el conflicto
function grantAccessToDoctor(address _patient, address _doctor) public {
    require(msg.sender == _patient, "Only the patient can grant access");
    doctorPatientAccess[_doctor][_patient] = true;
    emit AccessGranted(_doctor, _patient);
}

function revokeAccessFromDoctor(address _patient, address _doctor) public {
    require(msg.sender == _patient, "Only the patient can revoke access");
    doctorPatientAccess[_doctor][_patient] = false;
    emit AccessRevoked(_doctor, _patient);
}

function checkAccess(address _patient, address _doctor) public view returns (bool) {
    return doctorPatientAccess[_doctor][_patient];
}

  function addUserFiles(string memory _file_name, string memory _file_type,string memory _file_hash) public{

    patientFiles[msg.sender].push(files({file_name:_file_name, file_type:_file_type,file_hash:_file_hash}));

  }


  function getUserFiles(address sender)public view returns(files[] memory){
      return patientFiles[sender];
  }

  function getOwnerInfo() public view  onlyOwner() returns(address)
  {
    return (owner);
  }
 }

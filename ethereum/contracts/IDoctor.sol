// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Doctor.sol";


interface IDoctor {
    //function signUpDoctor(string memory _name, string memory _phone, string memory _specialization) external;
    function signUpDoctor(address userAddress, string memory _name, string memory _phone, string memory _specialization) external;
    function getDoctorInfo(address id) external view returns (address, uint, string memory, string memory, string memory, address[] memory);
    function getAllDoctorAddresses() external view returns (address[] memory);
    function doctorAddFiles(address userAddress, address _pat, string memory _file_name, string memory _file_type,string memory _file_hash) external;
    function getDoctorAddedFiles(address pat) external view returns(doctorAddedFiles[] memory);
    function addDoctorOfferedConsultation(address id, address _pat, string memory _consultation, string memory _medicine, string  memory _time) external;
    function getDoctorConsultation(address _pat) external view returns (doctorOfferedConsultation[] memory);
    function addPatientToList(address id, address patientId) external;
    function getDoctorConsultationForPatient() external view returns (doctorOfferedConsultation[] memory);
    function getPatientCount(address doctorAddress) external view returns (uint);
    function getConsultationCount(address doctorAddress, address patientAddress) external view returns (uint);
}

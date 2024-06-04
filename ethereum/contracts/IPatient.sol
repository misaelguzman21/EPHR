// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


    struct files {
        string file_name;
        string file_type;
        string file_hash;
    }

interface IPatient {
    function signUpPatient(address patientAddress, string memory _name, uint8 _age, bytes memory _phone, bytes memory _email) external;
    function getPatientInfo(address id) external view returns (address, string memory, uint8, bytes memory, bytes memory, address[] memory);
    function scheduleConsultationAndAddDoctor(address id, address doctorId, string memory consultationDetails) external;
    function addPatientFile(address id, string memory fileName, string memory fileType, string memory fileHash) external;
    function getPatientFiles(address id) external view returns (files[] memory);
    function getAllPatientAddresses() external view returns (address[] memory);

}
    
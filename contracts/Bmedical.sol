// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Bmedical is Pausable, AccessControl, Ownable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    // Store the data in the mapping array
    mapping(address => string[]) private data;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(DOCTOR_ROLE, msg.sender);

    }
    // set admin role onlyOwner can be used
    function setAdminRole(address _address) public onlyOwner {
        _grantRole(ADMIN_ROLE, _address);

    }
    // set Doctor role, Admin can be used
    function setDoctorRole(address _address) public onlyRole(ADMIN_ROLE) {
        _grantRole(DOCTOR_ROLE, _address);

    }

    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    //save data to blockchain, only Admin can be that
    function addData(address _address, string memory _value) public onlyRole(ADMIN_ROLE) {
        data[_address].push(_value);
    }
    function getData() external view returns (string[] memory) {
        return data[msg.sender];
    }

    function doctorGetData(address _address) external view onlyRole(DOCTOR_ROLE) returns (string[] memory)  {
        return data[_address];
    }
}
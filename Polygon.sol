// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Polygon{
    
    struct studentData{
        
        uint256 studentID;
        string fname;
        string lname;
        uint256 projectID;
        string projectName;
    }
     mapping(uint256 => studentData)public studentMap;
     event studentRegistration(
         uint256 studentID,
        string fname,
        string lname,
        uint256 projectID,
        string projectName
         );
     
     function setData(uint256 studentID,string memory fname, string memory lname,uint256 projectID, string memory projectName)public returns(bool){
         studentMap[studentID].studentID = studentID;
         studentMap[studentID].fname = fname;
         studentMap[studentID].lname = lname;
         studentMap[studentID].projectID = projectID;
         studentMap[studentID].projectName = projectName;
         emit studentRegistration(studentID,fname,lname,projectID,projectName);
         return true;
     }
     function getData(uint256 studentID)public view returns(uint256,string memory,string memory,uint256,string memory){
         return(
             studentMap[studentID].studentID,
             studentMap[studentID].fname,
             studentMap[studentID].lname,
             studentMap[studentID].projectID,
             studentMap[studentID].projectName
             );
     }
}

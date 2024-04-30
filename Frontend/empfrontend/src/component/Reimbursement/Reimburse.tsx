import { useEffect, useState } from "react";
import { ReimbInterface } from "../../Interfaces/ReimbursementInterface";
import "./styleReimbursement.css";
import axios from "axios";
import { UserInterface } from "../../Interfaces/UserInterface";
import { ReimbResult } from "./ReimbResult";
import { empData } from "../../Data/EmployeeData";


export const Reimburse: React.FC = () => {
  let userIn: number = 0;

  const [reimb, setReimb] = useState<ReimbInterface>({
    description: "",
    reimbid: 0,
    amount: 0,
    status: "",
    userID: 0, // whe
  });

  const [emp, setEmployees] = useState<UserInterface>({
    userID:1, //optional
    userName :"", //mandatory userNAme
    userPass: "", //optional password
    fname: "" ,//optional firstName
    lname: "" ,//optional lastName
    role: "" ,//optional Role liek manager or employee
  });

  useEffect(() => {
    

    setEmployees(empData);
  }, []);

  const storeValue = (input: any) => {
    userIn = input.target.value;
  };

  

  const getReimburseWithReimbId = async () => {
    if (userIn <= 0 || userIn >= 10001) {
      alert("Enter valid reimbursement ID<1 to 10000>");
      return;
    }
    //const response = await axios.get(
    //  "https://pokeapi.co/api/v2/pokemon/" + userIn
    //);
    console.log("getReimburseWithReimbId" + userIn);
    alert("getReimburseWithReimbId" + userIn);

    setReimb((reimb) => ({
      ...reimb,
      reimbid: userIn,
    }));

    setReimb((reimb) => ({
      ...reimb,
      status: "Pending",
    }));

    setReimb((reimb) => ({
      ...reimb,
      amount: 2025,
    }));

    setReimb((reimb) => ({
      ...reimb,
      description: "test reimbursement",
    }));

    /*setReimb((reimb) => ({ ...reimb, description: response.data.description }));
         setReimb((reimb) => ({ ...reimb, reimbid: response.data.reimbid }));
         setReimb((reimb) => ({ ...reimb, amount: response.data.amount }));
         setReimb((reimb) => ({ ...reimb, status: response.data.status }));       
         */
  };

  const getAllReimburse = async () => {
    //const response = await axios.get(
    //  "https://pokeapi.co/api/v2/pokemon/1"
    //);

    console.log("getAllReimburse");
    alert("getAllReimburse");
  };

  return (
    <div>
      <h6>Employee username: {emp.userName}</h6>
      <h6>
        Employee Name: {emp.fname} {emp.lname}
      </h6>
      <h6>Employee Role: {emp.role}</h6>

      <div className="home-page">
        <div className="home-container">
          <input
            type="number"
            placeholder="Search your reimbursement with ID:"
            onChange={storeValue}
          />
          <button className="reimb-button" onClick={getReimburseWithReimbId}>
            Find This Reimbursement
          </button>

          <div className="reimb-container">
            <button className="reimb-button2" onClick={getAllReimburse}>
              Find All Reimbursement
            </button>
          </div>
          <h3>Reimbursement Details:</h3>
          <div className="reimb-container">
            <ReimbResult {...reimb}></ReimbResult>
          </div>
        </div>
      </div>
    </div>
  );
};

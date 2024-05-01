import { useEffect, useState } from "react";
import { ReimbInterface } from "../../Interfaces/ReimbursementInterface";
import "./styleReimbursement.css";
import axios from "axios";
import { UserInterface } from "../../Interfaces/UserInterface";
import { ReimbResult } from "./ReimbResult";
import { empData } from "../../Data/EmployeeData";
import { useNavigate } from "react-router-dom";
import { DisplayReimb } from "./DisplayReimburse";
import "../Collection/Collection.css"

export const Reimburse: React.FC = () => {
  let userIn: number = 0;

  //TODO Delete this list after backend implementation
  let reimblist: ReimbInterface[] = [
    {
      description: "test1",
      reimbid: 1,
      amount: 122,
      status: "pending",
      userID: 1,
    },
    {
      description: "test2",
      reimbid: 2,
      amount: 389,
      status: "pending",
      userID: 1,
    },
  ];

  const [reimb, setReimb] = useState<ReimbInterface>({
    description: "",
    reimbid: 0,
    amount: 0,
    status: "",
    userID: 0, // whe
  });

  //we'll store state that consists of an Array of ReimbInterface objects
  const [reimburseList, setReimburselist] = useState<ReimbInterface[]>([]); //start with empty array

  const [emp, setEmployees] = useState<UserInterface>({
    userID: 1, //optional
    userName: "", //mandatory userNAme
    userPass: "", //optional password
    fname: "", //optional firstName
    lname: "", //optional lastName
    role: "", //optional Role liek manager or employee
  });

  //we need our useNavigate hook to programmatically switch endpoints (which switches components)
  const navigate = useNavigate();

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
    const response = await axios
      .get("http://localhost:8080/users/" + userIn)
      .then((response) => {
        /*setReimb((reimb) => ({ ...reimb, description: response.data.description }));
         setReimb((reimb) => ({ ...reimb, reimbid: response.data.reimbid }));
         setReimb((reimb) => ({ ...reimb, amount: response.data.amount }));
         setReimb((reimb) => ({ ...reimb, status: response.data.status }));       
         */

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
      })
      .catch((error) => {
        alert("Find Failed! Maybe backend is down!!Still continue here");
      }); //If reimburseFind fails, tell the user that

    //TODO: Remove this code below after backend is implemented

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
  };

  //GET request to server to get all Reimbursements
  const getAllReimburse = async () => {
    ///our GET request (remember to send withCredentials to confirm the user is logged in)
    const response = await axios
      .get("http://localhost:8080/reimburs", {
        withCredentials: true,
      })
      .then((response) => {
        //populate the reimbursmenet list
        setReimburselist(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        alert("get All Reimbursment Failed!Backend down");
      });

    //TODO Delete this code after backedn is implementd here
    setReimburselist(reimblist);

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

          {reimb.reimbid ? (
            <div>
              <h3>Reimbursement Details:</h3>
              <div className="reimb-container">
                <ReimbResult {...reimb}></ReimbResult>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="reimb-container">
        <button className="reimb-button2" onClick={getAllReimburse}>
          Find All Reimbursement
        </button>
      </div>
      <br />
      <br />
      <br />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Reimbursement Details</th>              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="collection-container">
                  {/* using map(), for every reimbursmenet that belongs to the logged in user... 
            Display one Reimbursement component, and a button to delete it*/}
                  {reimburseList.map((reimb, index) => (
                    <div>
                      <DisplayReimb {...reimb}></DisplayReimb>
                      <button
                        className="reimb-button"
                        onClick={() => alert("Implement Delete here")}
                      >
                        Delete
                      </button>
                    </div>
                  ))}

                  {/* If you need to render multiple things in map(), they need to be in a <div> */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

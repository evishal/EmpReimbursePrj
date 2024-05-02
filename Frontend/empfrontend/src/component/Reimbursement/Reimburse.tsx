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
    {
      description: "test appr",
      reimbid: 3,
      amount: 5053,
      status: "approved",
      userID: 1,
    },
    {
      description: "test eaa appr",
      reimbid: 4,
      amount: 9876,
      status: "approved",
      userID: 1,
    },
  ];

  const [filteredReimbuseList, setfilteredReimbuseList] = useState(reimblist);

  const filterByStatus = (status: string) => {
    setReimburselist([]);
    reimb.reimbid = 0; //Coded because the search reimb table is showing up . but need to fix the logic
    setfilteredReimbuseList(
      reimblist.filter((reimb) => {
        return reimb.status === status;
      })
    );
  };
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
    setreimburseInput("false");
    console.log("Inside useEffect after page load. lets check reimburseList");
    console.log(reimburseList);
    setfilteredReimbuseList([]);
    //console.log(filteredReimbuseList);
  }, []);

  const storeValue = (input: any) => {
    userIn = input.target.value;
  };

  const [reimburseInput, setreimburseInput] = useState("false");

  const storeNewReimbInputs = (input: any) => {
    if (input.target.name === "amount") reimb.amount = input.target.value;
    if (input.target.name === "description")
      reimb.description = input.target.value;
  };

  const createNewReimbur = () => {
    alert("createNewReimbur implement here");
    setfilteredReimbuseList([]);
    setReimburselist([]);
    setreimburseInput("true");
    
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
    console.log("Start getAllReimburse");

    setfilteredReimbuseList([]);
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

    reimb.reimbid= 0 //Coded because the search reimb table is showing up . but need to fix the logic
    console.log("getAllReimburse");
    alert("getAllReimburse");
  };

  const cancelReimbSubmit = (input: any) => {
    if (input.target.name === "amount") {
      reimb.amount = 0;
      input.target.value = 0;
    }
    if (input.target.name === "description") reimb.description = "";
    input.target.value = "";

    setreimburseInput("false");
  };

  //GET request to server to get all Reimbursements
  const addReimburse = async () => {
    console.log("Start addReimburse");
    console.log(reimb);
    reimb.userID = empData.userID
    console.log(reimb);

    //setfilteredReimbuseList([]);

    ///our GET request (remember to send withCredentials to confirm the user is logged in)
    const response = await axios
      .post("http://localhost:8080/reimburs", reimb, {
        withCredentials: true,
      })
      .then((response) => {
        //populate the reimbursmenet object recieved in response
        setReimb(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        alert("Post Reimbursment Failed!Backend down");
      });

      //TODO Delete this code after backend implementation
    reimb.reimbid = 1;
    reimb.status ="pending"
    
    console.log("addReimburse");
    console.log(reimb)
    alert(
      "Reimbursement request received successfully!");
  };

  return (
    <div>
      <h6>Employee username: {emp.userName}</h6>
      <h6>
        Employee Name: {emp.fname} {emp.lname}
      </h6>
      <h6>Employee Role: {emp.role}</h6>

      <div className="reimb-container">
        <button className="reimb-button2" onClick={createNewReimbur}>
          Create New Reimbursement
        </button>

        <button className="reimb-button2" onClick={getAllReimburse}>
          Show All Reimbursement
        </button>

        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => filterByStatus(e.target.value)}
        >
          <option value="Select Status" disabled selected>
            Select Status
          </option>
          <option value="pending">pending</option>
          <option value="approved">approved</option>
        </select>
      </div>

      {reimburseInput === "true" ? (
        <div className="text-container">
          <h4>Please enter amount and description and click submit</h4>

          <div className="input-container">
            <input
              type="number"
              placeholder="amount"
              name="amount"
              onChange={storeNewReimbInputs}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="description"
              name="description"
              onChange={storeNewReimbInputs}
            />
          </div>
          <button className="login-button" onClick={addReimburse}>
            Submit{" "}
          </button>
          <button className="login-button" onClick={cancelReimbSubmit}>
            Cancel
          </button>
        </div>
      ) : (
        ""
      )}

      {reimburseList.length !== 0 ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  Reimbursement Details:{reimburseList.length} records
                </th>
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

                        {reimb.status !== "approved" ||
                        emp.role === "manager" ||
                        emp.role === "Manager" ? (
                          <button
                            className="reimb-button3"
                            onClick={() => alert("Implement Delete here")}
                          >
                            Delete
                          </button>
                        ) : (
                          " "
                        )}
                        {(emp.role === "manager" || emp.role === "Manager") &&
                        reimb.status !== "approved" ? (
                          <button
                            className="reimb-button3"
                            onClick={() => alert("Implement Approval here")}
                          >
                            Approve
                          </button>
                        ) : (
                          ""
                        )}
                        {(emp.role === "manager" || emp.role === "Manager") &&
                        reimb.status === "pending" ? (
                          <button
                            className="reimb-button3"
                            onClick={() => alert("Implement denied here")}
                          >
                            Deny
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}

                    {/* If you need to render multiple things in map(), they need to be in a <div> */}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}

      {filteredReimbuseList.length !== 0 ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  Filtered Reimbursement Details:{filteredReimbuseList.length}{" "}
                  records
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="collection-container">
                    {/* using map(), for every reimbursmenet that belongs to the logged in user... 
            Display one Reimbursement component, and a button to delete it*/}
                    {filteredReimbuseList.map((reimb, index) => (
                      <div>
                        <DisplayReimb {...reimb}></DisplayReimb>

                        {reimb.status !== "approved" ||
                        emp.role === "manager" ||
                        emp.role === "Manager" ? (
                          <button
                            className="reimb-button3"
                            onClick={() => alert("Implement Delete here")}
                          >
                            Delete
                          </button>
                        ) : (
                          " "
                        )}
                        {(emp.role === "manager" || emp.role === "Manager") &&
                        reimb.status !== "approved" ? (
                          <button
                            className="reimb-button3"
                            onClick={() => alert("Implement Approval here")}
                          >
                            Approve
                          </button>
                        ) : (
                          ""
                        )}
                        {(emp.role === "manager" || emp.role === "Manager") &&
                        reimb.status === "pending" ? (
                          <button
                            className="reimb-button3"
                            onClick={() => alert("Implement denied here")}
                          >
                            Deny
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}

                    {/* If you need to render multiple things in map(), they need to be in a <div> */}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}

      <div className="reimb-container">
        <input
          className="reimb-input"
          type="number"
          placeholder="Search your reimbursement with ID:"
          onChange={storeValue}
        />
        <button className="reimb-button" onClick={getReimburseWithReimbId}>
          View This Reimbursement
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
  );
};

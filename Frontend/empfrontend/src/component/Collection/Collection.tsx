import { useEffect, useState } from "react";
import { ReimbInterface } from "../../Interfaces/ReimbursementInterface";
import axios from "axios";
import "./Collection.css";
import { Reimburse } from "../Reimbursement/Reimburse";
import { DisplayReimb } from "../Reimbursement/DisplayReimburse";
import "../Reimbursement/styleReimbursement.css";

export const Collection: React.FC = () => {
  //We could have stored a base URL here for cleaner requesting
  //const baseUrl = "http://localhost:8080/reimburs"

  //we'll store state that consists of an Array of ReimbInterface objects
  const [reimburse, setReimburse] = useState<ReimbInterface[]>([]); //start with empty array

  //I want to get all Reimbursmenets when the component renders, so we'll use useEffect
  useEffect(() => {
    getAllReimbursement();
  }, []); //empty array so this triggers on component load and state change

  //GET request to server to get all Reimbursements
  const getAllReimbursement = async () => {
    
    //our GET request (remember to send withCredentials to confirm the user is logged in)
    const response = await axios.get("http://localhost:8080/reimburs", {
      withCredentials: true,
    })
    .then((response) => {
        //populate the reimbursmenet data
        setReimburse(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        alert("get All Reimbursment Failed!");
      }); 

    
    
    alert("Implement collection in backend here");
  };

  //Delete reimbursement by id
  const deleteReimbursement = async (reimbid: number | undefined) => {
    //TODO: throw some error if reimbid is typeof undefined

    const response = await axios
      .delete("http://localhost:8080/reimburs/" + reimbid, {
        withCredentials: true,
      })
      .then((response) => alert(response.data))
      .then(() => getAllReimbursement())
      .catch((error) => {
        alert("delete Failed!Backend Down..");
      }); //If login fails, tell the user that */
  };

  return (
    <div className="collection-container">
      {/* using map(), for every reimbursmenet that belongs to the logged in user... 
            Display one Reimbursement component, and a button to delete it*/}
      {reimburse.map((reimb, index) => (
        <div>
          <DisplayReimb {...reimb}></DisplayReimb>
          <div>
            <button
              className="reimb-button"
              onClick={() => deleteReimbursement(reimb.reimbid)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* If you need to render multiple things in map(), they need to be in a <div> */}
    </div>
  );
};

import { ReimbInterface } from "../../Interfaces/ReimbursementInterface";
import "./styleReimbursement.css";

export const DisplayReimb: React.FC<ReimbInterface> = (reimbdisplay: ReimbInterface) => {
  return (
    <div className="reimb-container">
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Reimbursement:</th>

            <td> ID: {reimbdisplay.reimbid} </td>
         
         
            <td>Amt: {reimbdisplay.amount}</td>
         
         
            <td>St: {reimbdisplay.status}</td>
         
         
            <td>Desc: {reimbdisplay.description}</td>
         
         
            <td>UID: {reimbdisplay.userID}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

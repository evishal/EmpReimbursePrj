
import { ReimbInterface } from "../../Interfaces/ReimbursementInterface";
import "./styleReimbursement.css";
import "bootstrap/dist/css/bootstrap.css";

export const ReimbResult: React.FC<ReimbInterface> = (reimbresult: ReimbInterface) => {

  return (
    <div className="reimb-container">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{reimbresult.reimbid}</th>
            <td>{reimbresult.status}</td>
            <td>{reimbresult.amount}</td>
            <td>{reimbresult.description}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
};

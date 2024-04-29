import { Navigate, useNavigate } from "react-router-dom";
import "./styleLogin.css";
import { UserInterface } from "../../Interfaces/UserInterface";
import { useState } from "react";

export const Login: React.FC = () => {
  const navigate = useNavigate();

   const [user, setUser] = useState<UserInterface>({
     userName: "",
     userPass: "",
   });

   const storeValue = (input: any) => {
    
    if (input.target.name === "pass") {
      
      setUser((user) => ({ ...user, userPass: input.target.value }));  
       
    }
    else{      
      
      setUser((user) => ({ ...user, userName: input.target.value }));  
       
    }  

  
    
   };


  const loginfunc = async () => {
    //TODO: send actual POST with user inputs
    console.log("send actual POST with user inputs");
    console.log(user);

    navigate("/emp");
  };

  return (
    <div className="login">
      <div className="text-container">
        <h1>Welcome to HR Employee Reimbursment Portal! </h1>
        <h2>Sign in to Manage Reimbursment!</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="username"
            name="uname"
            onChange={storeValue}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="password"
            name="pass"
            onChange={storeValue}
          />
        </div>
        <button className="login-button" onClick={loginfunc}>
          Login
        </button>
        <button className="login-button" onClick={() => navigate("/register")}>
          Create Account
        </button>
      </div>
    </div>
  );
};

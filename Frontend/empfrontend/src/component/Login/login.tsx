import { Navigate, useNavigate } from "react-router-dom";
import "./styleLogin.css";
import { UserInterface } from "../../Interfaces/UserInterface";
import { useState } from "react";
import { empData } from "../../Data/EmployeeData";
import axios from "axios";

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

  
    console.log(" Inside Store values of login function");
    console.log(user);

   };


  const loginfunc = async () => {
    if (user.userName == "") {
      alert("Username can't be blank!");
      return;
    }

    if (user.userPass == "") {
      alert("Password can't be blank!");
      return;
    }

    //Send a POST request to the backend for login
    //NOTE: with credentials is what lets us save/send user session info
    
    /*const response = await axios
      .post("http://localhost:8080/users/login", user, {
        withCredentials: true,
      })
      .then((response) => {
        //if the login was successful, log the user in and greet them
        alert("Welcome, " + response.data.username);

        //store the response data user in the global emp data variable here for later use by other componenets like /emp
        empData.userName = response.data.userName;        
        empData.fname = response.data.fname;
        empData.lname = response.data.lname;
        empData.role = response.data.role;
        empData.userId = response.data.userID;
        
        console.log("empData in loginfunc");
        console.log(empData);

        //Navigate to /emp endpoint and display this stored info in this emp endpoint/component
        navigate("/emp");
      })
      .catch((error) => {
        alert("Login Failed!Backend Down..");
        
        
      })  ; //If login fails, tell the user that */

      //TODO: Remove these line after backend is up
        //store the response data user in the global emp data variable here
        empData.userName = user.userName;        
        empData.fname = user.fname;
        empData.lname = user.lname;
        empData.role = user.role;
        empData.userId = user.userID;
        empData.userPass = user.userPass;
        
        console.log("empData in loginfunc");
        console.log(empData);
        navigate("/emp");
      

    console.log("send actual POST with user inputs");

    
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

import { useState } from "react"
import { UserInterface } from "../../Interfaces/UserInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./styleLogin.css"

export const Register: React.FC = () => {

    //set state (UserInterface)
    const [user, setUser] = useState<UserInterface>({
      userName: "",
      userPass: "",
      fname: "",
      lname: "",
      role: "",
    });

    //useNavigate to navigate between components
    const navigate = useNavigate()
    let pass:string = "";
    let matchpass: string = "";

    //function to store input box values
    const storeValues = (input:any) => {

        //if the input that has changed is the "username" input, change the value of username in the user state object

        if(input.target.name === "username"){
            setUser((user) => ({ ...user, userName: input.target.value }));
        }
        if(input.target.name === "password"){
            pass = input.target.value;
            setUser((user) => ({ ...user, userPass: input.target.value }));
        }
        if(input.target.name === "fname"){
            setUser((user) => ({ ...user, fname: input.target.value }));
        }
        if (input.target.name === "lname") {
           setUser((user) => ({ ...user, lname: input.target.value }));
        
        }         
        if (input.target.name === "role") {
           setUser((user) => ({ ...user, role: input.target.value }));
        }
        if (input.target.name === "matchpassword") {
          matchpass = input.target.value;          
        } 

        console.log("user");
        console.log(user)

    }


    //function to send a POST with user data to register a user in the backend
    //! Remember, requests to our Java server will only work with @CrossOrigin in our Controllers
    const register = async () => {

        /* Check if all mandatory values are populated */
        if ( user.fname === "" || user.lname === "" || user.userName === "" || user.userPass === "" || user.role === "")
        {
            alert("All Fields are mandatory. Please populate all fields before submitting")
            return
        }

        
        if ( user.role != "Manager".toLowerCase() ) {
            if ( user.role != "Employee".toLowerCase() ) 
                  alert(
                    "Invalid ROLE value: Valid values are Manager or Employee. Try again"
                    );                   

          return
        }


        //TODO: We still need to implement the backend... this request goes nowhere
        //const response = await axios.post("http://localhost:8080/SOME_ENDPOINT", user)

        //console.log(user)

        alert("This would have sent a post to the backend to create a user")

        //after registration, send the user back to login page
        navigate("/")

    }


    return (
      <div className="login">
        <div className="text-container">
          <h1>New employee? Create Your Account Here !</h1>
          <h3>Profile Info</h3>

          <div className="input-container">
            <table>
              <td>Firstname:</td>
              <td>
                <input
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  onChange={storeValues}
                />
              </td>
            </table>
          </div>
          <div className="input-container">
            <table>
              <td>Lastname:</td>
              <td>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  onChange={storeValues}
                />
              </td>
            </table>
          </div>
          <div className="input-container">
            <table>
              <td>Role:</td>
              <td>
                    <input
                    type="text"
                    placeholder="Role:Manager/Employee"
                    name="role"
                    onChange={storeValues}
                    />
                </td>
            </table>
          </div>
          <h3>Username/Password Info</h3>
          <div className="input-container">
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={storeValues}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={storeValues}
            />
          </div>
          <h4>Confirm your password again</h4>
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm password "
              name="matchpassword"
              onChange={storeValues}
            />
          </div>
          <br />
          <br />

          <button className="login-button" onClick={register}>
            Submit
          </button>
          <button className="login-button" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    );
}
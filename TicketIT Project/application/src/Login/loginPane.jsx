import * as React from "react";
import { useState } from "react";
import "./loginPane.css";
import axios from 'axios';
import Validation from "./loginValidation";

const Login = () =>
{
    const [values, setValues] = useState ({
        Username: "",
        Pass: ""
    });

    const [errors, setErrors] = useState({})

    var deptID= useState('');
    const handleUserSubmit = (e) =>{
        e.preventDefault();
        setErrors(Validation(values));
        if(errors.Username === "" && errors.Pass === ""){
            axios.post('http://localhost:8082/loginUser', values)
        .then(res => {
            if(res.data.Message === "Not Nice." ){
                alert("Invalid Creditentials");
            }
            else{
                deptID = JSON.stringify(res.data[0].DeptID);
                window.open("http://localhost:3000/ticket/"+deptID,"_self")
            }
        })
        .catch(err => console.log(err))
        
    }
};

const handleAdminSubmit = (e) =>{
    e.preventDefault();
    setErrors(Validation(values));
    if(errors.Username === "" && errors.Pass === ""){
        axios.post('http://localhost:8082/loginAdmin', values)
    .then(res => {
        if(res.data.Message === "Not Nice." ){
            alert("Invalid Creditentials");
        }
        else{
            window.open("http://localhost:3000/Users","_self")
        }
    })
    .catch(err => console.log(err))
}
};


return (
    <>
        <div className="WelcomeMessage">
            <h1>Welcome Back,<br />Hope you are doing well!!</h1>
        </div>
        <div className="login-wrapper">
        <form>
        <center><br />

            <label htmlFor="Username"> Enter Username:	</label> <br />
            <input type="text"  name="Username" 
            className="form-control" 
            onChange={e => setValues ({...values, [e.target.name]: e.target.value})}
            /><br />
            {errors.Username && <span style={{color: "red"}}>{errors.Username}</span>}
             <br /><br />

        
            <label htmlFor="Pass"> Enter Password: </label>      <br />     
            <input type="Password" name="Pass" 
            className="form-control" 
            onChange={e => setValues ({...values, [e.target.name]: e.target.value})}
            /><br />
            {errors.Pass && <span style={{color: "red"}}>{errors.Pass}</span>}
            <br /><br />
                    </center>
        <center className="button-holder">
            
            <button onClick={handleUserSubmit}>Login</button>
            <button onClick={handleAdminSubmit}>Admin</button>
            
        </center>
        </form>
        </div>
    </>
    );
}
export default Login;
import React from "react";
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import axios from "axios";

function AddAdmin(){
    
    const { register, handleSubmit, formState: {errors}} = useForm();
   
 

    const onSubmit = (data) =>{
        const name = data.name;
        const username = data.username;
        const pass= data.pass;

        axios.post('http://localhost:8082/insertAdmin',
        {name, username, pass})
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));

        alert("Admin Created!");
        window.location.reload();
    }

    return(
    <center>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Admin</h1>
        <table className="formTable">
            <Form.Field>
                <tr>
                    <td>
                        <label htmlFor="Name"> Name </label>
                    </td>
                    <td>
                        <input type='text' className="DataInput"
                        id="name" onChange={e => setName(e.target.value)}
                        {...register("name", {required: true, maxLenght: 25})}/> <br /> 
                        {errors.name && <span style={{color: "red"}}>Check Full Name</span> }
                    </td>
                </tr>
            </Form.Field>

            <Form.Field>
                <tr>
                    <td>
                        <label htmlFor="Username"> Username: </label>
                    </td>
                    <td>
                        <input type='text' className="DataInput"
                        id="username" onChange={e => setUsername(e.target.value)}
                        {...register("username", {required: true, maxLenght: 5, minLength:5})}/> <br /> 
                        {errors.username && <span style={{color: "red"}}>Username Must be 5 Characters</span> }
                    </td>
                </tr>
            </Form.Field>

            <Form.Field>
                <tr>
                    <td>
                        <label htmlFor="Pass"> Password: </label>
                    </td>
                    <td>
                        <input type="password" className="DataInput" 
                        id="pass" onChange={e => setPass(e.target.value)} 
                        {...register("pass",{required: true, minLength:8, maxLength:8})}
                        /> <br /> 
                        {errors.pass && <span style={{color: "red"}}>Password Must be 8 Characters</span>}
                    </td>
                </tr>
            </Form.Field>
            </table>
            <br />
            
            <button type="submit" className="createBtn">Create</button>
        </Form>
    </center>
    )
}

export default AddAdmin;
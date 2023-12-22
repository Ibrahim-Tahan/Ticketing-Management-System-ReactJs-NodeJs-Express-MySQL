import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import axios from "axios";

function UpdateAdmin(){

    const {register, handleSubmit, formState: {errors}} = useForm();

    function onSubmit(event){
        
        const url = window.location.href;
        const id = url.split('/').pop();

        const name = event.name;
        const username = event.username;
        const pass = event.pass;

        axios.put('http://localhost:8082/updateAdmin/'+id,
        {name, username, pass})
        .then(res=> console.log(res))
        .catch(err=> console.log(err));
        alert('Admin Updated');
        window.open('http://localhost:3000/Admin','_self')
    };

    return(
        <center>
            <h1>Update Admin</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
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

            <Form.Field><tr>
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
            <tr>
                <td colSpan={2}>
                    <center>
                        <button type="submit" className="updateBtn">Update</button>
                    </center>
                </td>
            </tr>
            </table>
            </Form>

            <Popup trigger={
                <button className="logout">Back</button>
            } position={'right center'} contentStyle={{width: "200px"}}>
                    Non Updated content will be lost <br />
                <Link to={'/Admin'}><button className="deleteBtn">Okay</button></Link>                            
            </Popup>

        </center>
    )
}

export default UpdateAdmin;
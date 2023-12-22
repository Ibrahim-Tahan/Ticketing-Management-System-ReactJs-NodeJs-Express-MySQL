import React, { useState,useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function UpdateUser(){


    const { register, handleSubmit, formState: {errors} } = useForm();

    const [deptid, setDeptID] = useState([]);
    useEffect(()=> {
        fetch('http://localhost:8082/getDept1')
        .then(res=> res.json())
        .then(deptid=> setDeptID(deptid))
        .catch(err=> console.log(err));
    }, []);

    function onSubmit(event){    

        const url = window.location.href;
        const id = url.split('/').pop();
        
        const name = event.name;
        const username = event.username;
        const pass = event.Pass;
        const deptid = event.DeptID;  
        

        axios.put('http://localhost:8082/updateUser/' + id, 
        {name, username, pass, deptid})
        .then(res =>{
            console.log(res);
        })
        .catch(err=> console.log(err));
        alert("User Updated");
        window.open('http://localhost:3000/Users','_self')
    };
    return (
        <center>
            <h1>Update User</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <table className="formTable">
                <Form.Field>
                    <tr>
                        <td>
                            <label htmlFor="Name">Name: </label>
                        </td>
                        <td>
                            <input type='text' className="DataInput" onChange={e => setName(e.target.value)}
                            id="name" {...register("name",{ required: true, maxLength: 25, minLength: 6})}
                            />  <br />
                            {errors?.name && <span style={{color: "red"}}>Check Name</span>}
                        </td>
                    </tr>
                </Form.Field>
                <Form.Field>
                    <tr>
                        <td>
                          <label htmlFor="Username">Username: </label>
                        </td>
                        <td>
                            <input type='text' className="DataInput" onChange={e => setUsername(e.target.value)}
                            id="username" {...register("username",{ required: true, maxLength: 5, minLength: 5})}
                            />  <br />
                            {errors?.username && <span style={{color: "red"}}>Username Must be 5 Characters</span>}
                        </td>
                    </tr>
                </Form.Field>

                <Form.Field>
                    <tr>
                        <td>
                            <label htmlFor="Pass">Password: </label>
                        </td>
                        <td>
                            <input type='password' className="DataInput" onChange={e => setPass(e.target.value)}
                            id="Pass" {...register("Pass",{ required: true, maxLength: 8, minLength: 8})}
                            />  <br />
                            {errors?.Pass && <span style={{color: "red"}}>Password Must be 8 Characters</span>}
                        </td>
                    </tr>
                </Form.Field>

                <Form.Field>
                    <tr>
                        <td>
                            <label htmlFor="DeptID">Department: </label>
                        </td>
                        <td>
                            <select name="DeptID" className="DataInput" onChange={e => setDeptID(e.target.value)}
                            id="DeptID" {...register("DeptID",{ required: true, maxLength: 25})}>
                            <option value={""}></option>
                            {deptid.map((d, i) => (
                                <option key={d.DeptID} value={d.DeptID}>{d.DeptName}</option>
                            ))}
                            </select>  <br />
                            {errors?.DeptID && <span style={{color: "red"}}>Check Department</span>}
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
                <Link to={'/Users'}><button className="deleteBtn">Okay</button></Link>                            
            </Popup>
                
        </center>
    )
}

export default UpdateUser;
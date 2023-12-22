import React from "react";
import { useEffect, useState } from "react";
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import axios from "axios";

function AddUser(){
    const { register, handleSubmit, formState: {errors} } = useForm();


    const [deptid, setDeptID] = useState([]);
    useEffect(()=> {
        fetch('http://localhost:8082/getDept1')
        .then(res=> res.json())
        .then(deptid=> setDeptID(deptid))
        .catch(err=> console.log(err));
    }, []);


    function onSubmit(event) {
        const name = event.name;
        const username = event.username;
        const pass = event.Pass;
        const deptid = event.DeptID;       

        axios.post('http://localhost:8082/insertUser',
        {name, username, pass, deptid})
        .then(res=>console.log(res))
        .catch(err => console.log(err));

        alert("User Created!!");
        window.location.reload();
    }

    return(
        <center>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add User</h1>
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
                </table>
                <br />
                <button type="submit" className="createBtn">Create</button>
                
            </Form> 
        </center>
    )
}

export default AddUser;
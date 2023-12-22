import React, { useEffect, useState } from "react";
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import axios from "axios";

function AddDept(){
    const { register, handleSubmit, formState: {errors} } = useForm();

    const [adminID, setAdminID] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8082/getAdmin')
        .then(res => res.json())
        .then(adminID => setAdminID(adminID))
        .catch(err=>console.log(err))
    }, []);

    const onSubmit = (data) => {
        const deptName = data.deptName;
        const adminID = data.adminID;
        
        axios.post('http://localhost:8082/insertDept',
        {deptName,adminID})
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));
        
        alert("Department Has been created");
        window.location.reload();
    }

    return(
        <center>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add Department</h1>
            <table className="formTable">
                <Form.Field>
                    <tr>
                        <td>
                            <label htmlFor="Department Name">Name: </label>
                        </td>
                        <td>
                        <input type='text' className="DataInput"
                        id="deptName" onChange={e=> setDeptName(e.target.value)}
                        {...register("deptName",{ required: true, maxLength: 25})}
                        />  <br />
                        {errors.deptName && <span style={{color: "red"}}>Check Department Name</span>}
                        </td>
                    </tr>
                </Form.Field>

                <Form.Field>
                    <tr>
                        <td>
                            <label htmlFor="Admin Name">Managed By:</label>
                        </td>
                        <td>
                            <select name="adminID" className="DataInput"
                            id="adminID" onChange={e => setAdminID(e.target.value)}
                            {...register("adminID",{ required: true})}
                            > 
                                <option value={""}></option>
                                {adminID.map((data, i) => (
                                    <option key={i} value={data.AdminID}>{data.Name}</option>
                                ))}
                            </select>  <br />
                            {errors.adminID && <span style={{color: "red"}}>Check Admin Name</span>}
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

export default AddDept;
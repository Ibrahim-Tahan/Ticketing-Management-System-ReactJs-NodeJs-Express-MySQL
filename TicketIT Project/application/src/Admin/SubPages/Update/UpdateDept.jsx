import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import axios from "axios";

function UpdateDept(){

    const {register, handleSubmit, formState: {errors}} = useForm();

    const [adminID, setAdminID] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8082/getAdmin")
        .then(res=> res.json())
        .then(adminID=> setAdminID(adminID))
        .catch(err=> console.log(err));
    }, []);

    function onSubmit(event){
        const url = window.location.href;
        const id = url.split('/').pop();

        const DeptName = event.deptName;
        const AdminID = event.adminID;

        axios.put('http://localhost:8082/updateDept/' + id,
        {DeptName, AdminID})
        .then(res=>console.log(res))
        .catch(err=> console.log(err));

        alert("Department Updated");
        window.open('http://localhost:3000/Depts','_self')
    };

    return(
        <center>
            <h1>Update Department</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                            {...register("adminID",{ required: true})}> 
                                <option value={""}></option>
                                {adminID.map((data, i) => (
                                    <option key={i} value={data.AdminID}>{data.Name}</option>
                                ))}
                            </select>  <br />
                            {errors.adminID && <span style={{color: "red"}}>Check Admin Name</span>}
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
                <Link to={'/Depts'}><button className="deleteBtn">Okay</button></Link>                            
            </Popup>
        </center>
    )
}
export default UpdateDept;
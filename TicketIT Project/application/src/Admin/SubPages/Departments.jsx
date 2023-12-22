import React from "react";
import { useEffect, useState } from "react";
import Nav from "../HomeScreen" 
import { Link } from "react-router-dom";
import AddDept from "./Add/AddDepartment";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import axios from "axios";

function Depts (){
    
    const [deptData, setDeptData] = useState([])
    useEffect(()=> {
        fetch('http://localhost:8082/getDept')
        .then(res=> res.json())
        .then(deptData=> setDeptData(deptData))
        .catch(err=> console.log(err));
    }, [])
   
    const handleDelete = async(id) =>{
        try{
            axios.delete('http://localhost:8082/deleteDept/'+id)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
        alert("Department Deleted");
    } 

    return(
        <>
        <Nav/>
        <center>
            <h1>Here are the departments registered in the company:</h1>
        
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Manager Name</th>
                        <th>Number of Employee</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {deptData.map((d, i)=>(
                    <tr key={d.DeptID}>
                        <td>{d.DeptName}</td>
                        <td>{d.Name}</td>
                        <td>{d.NumOfUsers}</td>
                        <td>
                            
                        <Link to={`/updateDept/${d.DeptID}`}>
                            <button className="viewBtn">Edit</button>
                        </Link>

                            <Popup trigger={
                                <button className="deleteBtn">Delete</button>
                            } position={'top center'} contentStyle={{width: "200px"}}>
                                Are you sure you want to delete <br />
                                <button className="deleteBtn" onClick={e => handleDelete(d.UserID)}>Yes</button>
                            </Popup>
                        </td>
                    </tr>
                    ))}
                </tbody>

            </table>
            </div>    
            </center>   
            <br />
            <center>
                <Popup trigger={<button>Add</button>} modal nested>
                    {
                        close => (
                        <>
                            <div>
                                <AddDept />
                            </div>
                            <div>
                                <Popup trigger={
                                    <button className='deleteBtn'>Close</button>
                                } position={'right center'} contentStyle={{width: "200px"}}>
                                        Are you sure? (All Data Will be Lost) <br />
                                    <button className="deleteBtn" onClick={()=>close ()}>Close</button>
                                </Popup>
                            </div>
                        </>
                        )
                    }
                </Popup>
                <Popup trigger={
                    <button className="logout">Log Out</button>
                } position={'bottom center'} contentStyle={{width: "200px"}}>
                    Confirm Logout <br />
                    <Link to="/"><button className='deleteBtn'>Yes</button></Link>
                 
                </Popup>
            <br />
            </center>
        </>
    )
}

export default Depts;
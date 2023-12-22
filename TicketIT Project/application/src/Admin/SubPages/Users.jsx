import React, { useEffect, useState } from "react";
import Nav from "../HomeScreen" 
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import AddUser from "./Add/AddUser";
import axios from "axios";

function Users (){ 

    const [usersData, setUsersData] = useState([])
    useEffect(()=> {
        fetch('http://localhost:8082/getUser')
        .then(res=> res.json())
        .then(usersData=> setUsersData(usersData))
        .catch(err=> console.log(err));
    }, []);

    const handleDelete = async(id) => {
        try{
          axios.delete('http://localhost:8082/deleteUser/'+id)
            window.location.reload()
         }
            catch(err){
                console.log(err)
            }
            alert("User Deleted");
        }
    
    
    return(
        <>
            <Nav />
            <center>
                <h1>Here are the users registered in the company:</h1>
            
            
            <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Department</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((d, i)=>(
                    <tr key={i}>
                        <td>{d.Name}</td>
                        <td>{d.Username}</td>
                        <td>{d.Pass}</td>
                        <td>{d.DeptName}</td>
                        <td>
                            <Link to={`/update/${d.UserID}`}>
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
            <br />
            </center>
            <center>
                <Popup trigger={<button>Add</button>} modal nested>
                    {
                        close=> (
                        <>
                            <div>
                                <AddUser />
                            </div>
                            <div>

                            <Popup trigger={
                                <button className="deleteBtn">Close</button>
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
            </center>
            <br />
        </>
    )
}

export default Users;


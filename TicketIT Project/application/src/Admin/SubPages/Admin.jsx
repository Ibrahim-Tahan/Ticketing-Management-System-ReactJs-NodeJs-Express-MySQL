import React, { useEffect, useState } from 'react';
import Nav from "../HomeScreen" ;
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import axios from 'axios';
import AddAdmin from './Add/AddAdmin';

function Admin(){

    const [adminData, setAdminData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8082/getAdmin')
        .then(res=> res.json())
        .then(adminData=> setAdminData(adminData))
        .catch(err=> console.log(err));
    }, [])
    
    const handleDelete = async(id) => {
        try{
            axios.delete('http://localhost:8082/deleteAdmin/'+id)
            window.location.reload();
        } 
        catch (error){
            console.log(error)
        }
        alert ("Admin Deleted!");
    }
    
    return (
            <>
                <Nav />
                <center>
                    <h1>Here are the Admins registered in the company:</h1>
                
                
                <div className="tableContainer">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminData.map((d, i)=>(
                        <tr key={d.AdminID}>
                            <td>{d.Name}</td>
                            <td>{d.Username}</td>
                            <td>{d.Pass}</td>
                            <td>
                            <Link to={`/updateAdmin/${d.AdminID}`}>
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
                                    <AddAdmin />
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
                    <button className='logout'>Log Out</button>
                } position={'bottom center'} contentStyle={{width: "200px"}}>
                    Confirm Logout <br />
                    <Link to="/"><button className='deleteBtn'>Yes</button></Link>
                </Popup>
                </center>
                <br />
            </>
    )

}

export default Admin;
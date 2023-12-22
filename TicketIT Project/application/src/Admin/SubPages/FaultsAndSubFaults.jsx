import React, { useEffect, useState } from 'react';
import Nav from "../HomeScreen" ;
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import AddFault from './Add/AddFaults';
import AddSubFaults from './Add/AddSubFaults';
import axios from 'axios';

function Faults() {
    const [faults, setFaults] = useState([])
    useEffect(()=> {
        fetch('http://localhost:8082/getFault1')
    .then(res=> res.json())
    .then(faults=> setFaults(faults))
    .catch(err=> console.log(err));
    }, [])

    const handleDelete = async(id) => {
        try{
            axios.delete('http://localhost:8082/deleteSubFault/'+id)
            window.location.reload();
        }
        catch (err){
            console.log(err)
        }
    }

    return (
<>
        <Nav />
        <center><h1>Here are the Faults and Sub faults available: </h1>
        <div className='tableContainer'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Fault</th>
                        <th>Sub Fault</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {faults.map((d, i)=>(
                    <tr key={d.SubFaultID}>
                        <td>{d.Fault}</td>
                        <td>{d.SubFault}</td>
                        <td>
                            <Popup trigger={
                                <button className="deleteBtn">Delete</button>
                            } position={'top center'} contentStyle={{width: "200px"}}>
                                Are you sure you want to delete <br />
                                <button className="deleteBtn" onClick={e => handleDelete(d.SubFaultID)}>Yes</button>
                            </Popup>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </center>
        <center>      
        <br /> 
        <Popup trigger={
            
                <button>Add Fault</button>
           } modal nested>
                {
                close => (
                    <>
                    <div>
                        <AddFault />
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
          
                <button>Add Sub Fault</button>
            } modal nested>
                {
                close => (
                    <>
                    <div>
                        <AddSubFaults />
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
</>     
   )
}
export default Faults;


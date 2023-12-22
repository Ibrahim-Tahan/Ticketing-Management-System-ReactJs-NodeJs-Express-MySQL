import React, { useEffect, useState } from "react";
import Nav from "../HomeScreen" ;
import Popup from "reactjs-popup";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

function AllTickets(){

    const [tickets, setTickets] = useState([])
    useEffect(()=>{
        fetch("http://localhost:8082/getDoneTickets")
        .then(res=> res.json())
        .then(tickets=> setTickets(tickets))
        .catch(err=> console.log(err))
    }, []);

    const handleDelete = async(id) => {
        try{
            axios.delete('http://localhost:8082/deleteTicket/'+id)
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
        alert("Ticket is Deleted");
    }

    return(
        <>
            <Nav />
            <center><h1>Here are all the tickets done:</h1>
            <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fault</th>
                        <th>SubFault</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Priority</th>
                        <th>Description</th>
                        <th>Cause</th>
                        <th>Solution</th>
                        <th>Sent From</th>
                        <th>Done in</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((data, i)=>(
                        <tr key={i}>
                            <td>{data.TicketID}</td>
                            <td>{data.Fault}</td>
                            <td>{data.SubFault}</td>
                            <td>{data.Name}</td>
                            <td>{data.DeptName}</td>
                            <td>{data.Priority}</td>
                            <td>{data.Description}</td>
                            <td>{data.Cause}</td>
                            <td>{data.Solution}</td>
                            <td>{moment(data.SentOn).format('YYYY-MM-DD')}</td>
                            <td>{data.DoneIn} min</td>
                            
                        </tr> 
                    ))}
                </tbody>
            </table>
            </div>
            <br />
            <Popup trigger={
                    <button className="logout">Log Out</button>
                } position={'right center'} contentStyle={{width: "200px"}}>
                    Confirm Logout <br />
                    <Link to="/"><button className='deleteBtn'>Yes</button></Link>
                </Popup>

            </center>
        </>
    )
}

export default AllTickets;
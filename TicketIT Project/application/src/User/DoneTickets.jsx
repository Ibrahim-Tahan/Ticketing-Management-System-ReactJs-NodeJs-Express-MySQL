import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import moment from "moment";

function DoneTickets(){

    const [tickets, setTickets] = useState([])
    const url = window.location.href;
    const id = url.split('/').pop();
    useEffect(()=>{
        fetch('http://localhost:8082/getDoneTicketsUser/'+ id)
        .then(res=> res.json())
        .then(tickets=> setTickets(tickets))
        .catch(err=> console.log(err))
    }, [])
    
    function PendingTickets(){
        
        const url = window.location.href;
        const id = url.split('/').pop();
            window.open('http://localhost:3000/ticket/'+ id, '_self')
        }
    
    function DoneTickets(){
            
        const url = window.location.href;
        const id = url.split('/').pop();
            window.open('http://localhost:3000/allTicketsUser/'+ id, '_self')
        }

    return(
        <>
            <center>
            <div className='WelcomeMessage'>
                <h1>Please find the pending tickets assigned for your department:</h1>
            </div>
        <br /> 
        <ul>
            <li className='sortBy'>Please choose to manage: </li>
            <li> <a onClick={DoneTickets}>Done Tickets </a></li>
            <li><a onClick={PendingTickets}>Pending Tickets</a></li>
        </ul>
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        <td><b>ID         </b>  </td>
                        <td><b>Fault      </b>  </td>
                        <td><b>SubFault   </b>  </td>
                        <td><b>Sender     </b>  </td>
                        <td><b>Receiver   </b>  </td>
                        <td><b>Priority   </b>  </td>
                        <td><b>Description</b>  </td>
                        <td><b>Cause      </b>  </td>
                        <td><b>Solution   </b>  </td>
                        <td><b>Sent From  </b>  </td>
                        <td><b>Done in    </b>  </td>
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
                } position={'bottom center'} contentStyle={{width: "200px"}}>
                    Confirm Logout <br />
                    <Link to="/"><button className='deleteBtn'>Yes</button></Link>
                </Popup>

                </center>
        </>
    )
}

export default DoneTickets;
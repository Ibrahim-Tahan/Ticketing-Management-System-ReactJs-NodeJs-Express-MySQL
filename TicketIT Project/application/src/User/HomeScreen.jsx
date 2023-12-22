import React from 'react';
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './HomeScreen.css';
import SendTicket from './Popups/SendTicket';
import { Link } from "react-router-dom";
import moment from 'moment';

const Ticket = () => 
{
    const [ticketData, setTicketData] = useState([])


    const url = window.location.href;
    const id = url.split('/').pop();
    useEffect(()=> {
        fetch('http://localhost:8082/getTicketView/'+id)
        .then(res=> res.json())
        .then(ticketData=> setTicketData(ticketData))
        .catch(err=> console.log(err));
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
        <div className='WelcomeMessage'>
            <h1>Please find the pending tickets assigned for your department:</h1>
        </div>
        <br /> 
        <ul>
            <li className='sortBy'>Please choose to manage: </li>
            <li> <a onClick={DoneTickets}>Done Tickets </a></li>
            <li><a onClick={PendingTickets}>Pending Tickets</a></li>
        </ul>
        {ticketData.map((d, i) => (
            <div className="container">
                <table style={{backgroundColor: "white"}}>
                    <tbody>
                    <tr  key={d.TicketID}>
                        <td style={{width: '150px'}} ><b>ID:</b> #{d.TicketID} <br/> <b>Priority:</b> {d.Priority} </td>
                        <td style={{width: '250px'}}> <b>{d.Fault} </b>- {d.SubFault} <br /> <b>Description:</b> {d.Description} </td>
                        <td rowSpan={2} style={{width: '90px'}}>
                            <Link to={`/updateTicket/${d.TicketID}`}>
                                <button  className='viewBtn-Ticket'>View</button>
                            </Link>
                        </td>    
                    </tr>
                    <tr>
                        <td className='BottomTbl'>
                            <b>Sent From: </b>{d.Name}
                        </td>
                        <td className="BottomTbl" colSpan={2}>
                            <b>Sent On: </b>{moment(d.SentOn).format('YYYY-MM-DD')}
                        </td>
                    </tr>
                    </tbody>
                </table>                
                <br />
            </div>
        ))}
                  
            <center className='button-holder'>
                <Popup trigger=
                {
                    <button>Send Ticket</button>
                }
                modal nested>
                {
                    close=>
                    (
                        <div className='Modal'>
                            <div className='Content'><SendTicket /></div>
                            <div>

                            <Popup trigger={
                                <button className='deleteBtn'> Close </button>
                            } position={'right center'} contentStyle={{width: "200px"}}>
                                Are you sure? (All Data Will be Lost) <br />
                               <button className='deleteBtn'  onClick={()=>close ()}>Yes</button>
                             </Popup>
                        
                            </div>
                        </div>
                    )
                }
                </Popup>
                <Popup trigger={
                    <button className='logout'>Log Out</button>
                } position={"bottom center"} contentStyle={{width: "200px"}}>
                    Confirm Logout <br />
                    <Link to="/"><button className='deleteBtn'>Yes</button></Link>
                 
                </Popup>
                    
            </center>       
        </>
    );
}

export default Ticket;
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Popup from "reactjs-popup";
import { Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function SubmitTicket() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [ticketData, setTicketData] = useState([]);

    const url = window.location.href;
    const id = url.split('/').pop();

    useEffect(()=>{
        fetch('http://localhost:8082/getTicketUpdate/'+id)
        .then(res=> res.json())
        .then(ticketData=> setTicketData(ticketData))
        .catch(err=> console.log(err));
    }, []);

    function onSubmit(event){
        const url = window.location.href;
        const id = url.split('/').pop();

        const Cause = event.cause;
        const Solution = event.solution;
        const DoneIn = event.DoneIn;

        axios.put('http://localhost:8082/updateTicket/'+id,
        {Cause, Solution, DoneIn})
        .then(res=> console.log(res))
        .catch(err=> console.log(err))
        alert('Ticket Submitted');

        window.open('http://localhost:3000/ticket/'+ ticketData[0].ReceiverID,'_self');
    }



    return (
<div>
    <center>
        <h1>Submit Ticket</h1></center>        
    <div className='data-parent-container'>
        {ticketData.map((data, i)=>(
        <div className='data-child-container OLD'>
            <h3>Ticket ID: #{data.TicketID} - Priority {data.Priority}</h3>
            <p> <b>Fault: </b> {data.Fault} </p>
            <p> <b>SubFault: </b> {data.SubFault} </p>
            <p> <b>Description: </b> {data.Description}</p>
            <p> <b>Sent From: </b> {data.Name}</p>
            <p> <b>Sent To: </b> {data.DeptName}</p>
            <p> <b>Sent On: </b> {moment(data.SentOn).format('YYYY-MM-DD')}</p>
      
                <br />
            <Popup trigger={
                <button className="deleteBtn">Back</button>
                } position={'right center'} contentStyle={{width: "200px"}}>
                    Non Updated content will be lost <br />
                <Link to={'/ticket/'+ data.ReceiverID}>
                    <button className="deleteBtn">Okay</button>
                </Link>                            
            </Popup>
        </div>
        ))}

        <div className='data-child-container New'>
            <h3>Enter Data and Close the Ticket</h3>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
               
                <Form.Field>
                    <p><b>Enter Cause: </b><input type='text' className='DataInput'
                     id='cause' onChange={e=> setCause(e.target.value)}
                     {...register("cause",{required: true, maxLength: 25})}
                    /> <br />
                    {errors.cause && <span style={{color: 'red'}}>Check Cause</span>}</p>
                </Form.Field>

                <Form.Field>
                    <p><b>Enter Solution:</b><input type='text' className='DataInput'
                     id='solution' onChange={e=> setSolution(e.target.value)}
                     {...register("solution",{required: true, maxLength: 25})}
                    /> <br />
                    {errors.solution && <span style={{color: 'red'}}>Check Solution</span>}</p>
                </Form.Field>
                
                <Form.Field>
                    <p><b>Done in: </b><input type='number' id='DoneIn'
                    min={1} max={999}{...register("DoneIn",{required:true})}
                    />  Minutes <br />
                    {errors.DoneIn && <span style={{color: 'red'}}>Check Done in</span>}
                    </p>
                </Form.Field>
                
            <button type="submit" className='updateBtn'>Update</button>
            
            </Form>
        </div>

        </div>
</div>
    );
}
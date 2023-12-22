import React from "react";
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
 
function SendTicket(){

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [sender, setSender] = useState([]);
    const [receiver, setReceiver] = useState([]);
    const [faults, setFaults] = useState([]);

    const url = window.location.href;
    const id = url.split('/').pop();

    useEffect(()=> {
        fetch('http://localhost:8082/getSender/'+id)
        .then(res=> res.json())
        .then(sender=> setSender(sender))
        .catch(err=> console.log(err));
    }, [])

    useEffect(()=>{
        fetch('http://localhost:8082/getDept1')
        .then(res=> res.json())
        .then(receiver=> setReceiver(receiver))
        .catch(err=> console.log(err));
    })

    useEffect(()=>{
        fetch('http://localhost:8082/getFault1')
        .then(res=> res.json())
        .then(faults=> setFaults(faults))
        .catch(err=> console.log(err));
    })
        
  const [post, setPost] = useState([]);

    function sendFeedback (templateId, variables){
    window.emailjs.send(
        'service_6wg7eh3',
        templateId,
        variables
    )
    .then(res => console.log('Email Sent!'))
    .catch(err=>console.error( err))       
    }

    const onSubmit = (data) => {
    
        const templateId = 'template_hlpeq6t';
        const SenderID = data.sender;
        const ReceiverID = data.receiver;
        const Priority = data.priority;
        const SubFaultID = data.Fault;
        const Description = data.description;

        
        var today = new Date()
        const SentOn = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        axios.post('http://localhost:8082/insertTicket',
        {Priority, SubFaultID, Description, SenderID, ReceiverID, SentOn})
        .then(res=> console.log(res))
        .catch(err=> console.log(err));
        alert("Ticket Sent");

        axios.get('http://localhost:8082/getNewTicket')
        .then((response) => {
            setPost(response.data);
            response.data.map((data, i) => (
                sendFeedback(templateId,{Department: data.receiver, Sender: data.sender, TicketID: data.TicketID, Priority: data.Priority, Fault: data.Fault, SubFault: data.SubFault, Description: data.Description })   
            ))
        })
        .catch(err=> console.log(err));
    }

    return(
        <center>
        <Form onSubmit={handleSubmit(onSubmit)}>
                <h1> Send Ticket </h1>
            
            <table className="formTable">  
            <Form.Field>       
            <tr>   
                <td>
                    <label htmlFor="sender">Sender: </label>
                </td>
                <td>
                    <select name="sender" className="DataInput"
                    id="sender" {...register("sender",{required: true})}>
                    <option value={""}></option>
                    {sender.map((d, i) => (
                        <option key={d.UserID} value={d.UserID}>{d.Name}</option>
                    ))}
                    </select> <br />
                    {errors.sender && <span style={{color: "red"}}>Please check Sender</span>}
                </td>
            </tr>
            </Form.Field>
                
            
   
            <Form.Field>
            <tr>   
                <td>
                    <label htmlFor="receiver">Receiver: </label>
                </td>
                <td>
                    <select name="receiver" className="DataInput"
                    id="receiver" {...register("receiver",{required: true})}>
                        <option value={""}></option>
                        {receiver.map((d, i) => (
                            <option key={d.DeptID} value={d.DeptID}>{d.DeptName}</option>
                        ))}
                    </select> <br />
                    {errors.receiver && <span style={{color: "red"}}>Please check Receiver</span>}        
                </td>
            </tr>
            </Form.Field>
            
            <Form.Field>
                <tr>   
                    <td>
                        <label htmlFor="Priority">Priority: </label>   
                    </td>
                    <td>         
                        <select name="Priority" className="DataInput"
                        id="Priority" {...register("priority", {required: true})}>
                            <option value={""}></option>
                            <option value={"High"}>High</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"Low"}>Low</option>
                        </select> <br />
                        {errors.priority && <span style={{color: "red"}}>Please select a Priority</span>}        
                    </td>
                </tr>
            </Form.Field>
   
            <Form.Field>    
                <tr>   
                    <td>
                        <label htmlFor="Fault">Fault: </label>
                    </td>
                    <td>
                        <select name="Fault" className="DataInput"
                        id="Fault" {...register("Fault",{ required: true})}>
                            <option value={""}></option>
                            {faults.map((d, i) => (
                                <option key={d.SubFaultID} value={d.SubFaultID}> {d.SubFault} - {d.Fault} </option>
                            ))}
                        </select> <br />
                        {errors.Fault && <span style={{color: "red"}}>Please check Fault</span>}        
                     </td>
                </tr>
            </Form.Field>
            
            <Form.Field>    
                <tr>   
                    <td>
                        <label htmlFor="">Description: </label>
                    </td>
                    <td>
                        <textarea rows={4} cols={50} className="DataInput"
                        id="Description" {...register("description", {required: true, maxLength: 200})}
                        /> <br />
                        {errors.description && <span style={ {color: "red"}}>Please check Description</span>}        
                    </td>
                </tr>
            </Form.Field>
            </table>
            <br />
            <button type="submit">Send Ticket</button>
        </Form>
        
        </center>
    )
}

export default SendTicket;


import React from "react";
import { Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddFault(){
    const { register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit=(data)=>{
        const fault = data.fault;
        axios.post('http://localhost:8082/insertFault',
        {fault})
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));
        alert("fault Created");
        window.location.reload();
    };


    return(
        <div className="container">
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add Faults</h1>
            <Form.Field>
                <label htmlFor="fault">Add Fault</label><br/>
                <input type='text' className="DataInput" 
                id="fault" onChange={e => setFaults(e.target.value)}
                {...register("fault",{required: true, maxLength: 25})} 
                />  <br />
                {errors.fault && <span style={{color: "red"}}>Check Fault</span>}
            </Form.Field>
        <br />
        <button type="submit" className="createBtn">Create</button>
        </Form>
        </div>


    )
}

export default AddFault;
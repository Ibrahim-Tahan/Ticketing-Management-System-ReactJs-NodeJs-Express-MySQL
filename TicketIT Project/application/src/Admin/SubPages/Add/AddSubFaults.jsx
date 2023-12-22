import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";
import axios from "axios";

function AddSubFaults() {
    const { register, handleSubmit, formState: {errors}} = useForm();
    
    const [FaultID, setFaultID] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8082/getFault')
        .then(res => res.json())
        .then(FaultID => setFaultID(FaultID))
        .catch(err => console.log(err));
    }, []);

    function onSubmit(event) {
        const subFault = event.subFault;       
        const FaultID = event.FaultID
        axios.post('http://localhost:8082/insertSubFault',
        {subFault, FaultID})
        .then(res=>console.log(res))
        .catch(err => console.log(err));
        alert('SubFault Created!');
    window.location.reload();
}


    return(
        <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add Sub Faults</h1>
            <table className="formTable">
                <Form.Field>
                    <tr>
                        <td>
                            <label htmlFor="SubFault">Add Sub Fault: </label>
                        </td>
                        <td>
                            <input type="text" className="DataInput" 
                            onChange={e => setSubFault(e.target.value)}
                            {...register("subFault",{required: true, maxLength: 25})}
                            />  <br />
                            {errors.subFault && <span style={{color: "red"}}>Check Sub Fault</span>}
                        </td>
                    </tr>
                </Form.Field>
                            
                <Form.Field>
                    <tr>
                        <td>
                            <label htmlFor="FaultID">Assign SubFault to a Fault: </label>
                        </td>
                        <td>
                            <select className="DataInput" onChange={e=>setFaultID(e.target.value)}
                            {...register('FaultID',{required: true})}>
                                <option value={""}></option>
                                {FaultID.map((data, i) => (
                                    <option key={i} value={data.FaultID}>{data.Fault}</option>
                                ))}
                            </select>  <br />
                            {errors.FaultID && <span style={{color: 'red'}}>Choose a fault</span>}
                        </td>
                    </tr>
                </Form.Field></table>
                <br />
                <button type="submit" className="createBtn">Create</button>
            </Form>
        </div>
    )
}
export default AddSubFaults;
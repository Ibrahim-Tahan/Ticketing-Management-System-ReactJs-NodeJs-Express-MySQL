import React from "react";
import { Link } from "react-router-dom";



const Admin = () => {

return(
<>
    <div className='WelcomeMessage'>
        <br />      
        <ul>
            <li className='sortBy'>Please choose to manage: </li>
            <li><Link to='/allTickets'>Tickets</Link></li>
            <li><Link to="/Faults">Faults</Link></li>
            <li><Link to="/Users">Employees</Link></li>
            <li><Link to="/Depts">Departments</Link></li>
            <li><Link to="/Admin">Admin</Link></li>
        </ul>
    </div>
</>
    )
}

export default Admin;
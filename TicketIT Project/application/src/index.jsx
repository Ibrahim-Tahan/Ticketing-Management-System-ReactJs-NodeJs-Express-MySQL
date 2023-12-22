import React from 'react';
import ReactDOM from 'react-dom/client';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import './index.css';
import Header from './Header';
import Ticket from './User/HomeScreen';
import Login from './Login/loginPane';
import Users from './Admin/SubPages/Users';
import Admin from './Admin/SubPages/Admin';
import Depts from './Admin/SubPages/Departments';
import Faults from './Admin/SubPages/FaultsAndSubFaults';
import AllTickets from './Admin/SubPages/Tickets';
import UpdateUser from './Admin/SubPages/Update/UpdateUser';
import UpdateDept from './Admin/SubPages/Update/UpdateDept';
import UpdateAdmin from './Admin/SubPages/Update/UpdateAdmin';
import SubmitTicket from './User/ViewTicket';
import DoneTickets from './User/DoneTickets';

function App()
{
    return( 
        <>
        <Header />
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/ticket' component={Ticket} />
                    <Route path='/Users' component={Users} />
                    <Route path='/Admin' component={Admin} />
                    <Route path='/Depts' component={Depts} />
                    <Route path='/Faults' component={Faults} />
                    <Route path='/allTickets' component={AllTickets} />
                    <Route path='/allTicketsUser/:id' component={DoneTickets} />
                    <Route path='/update/:id' component={UpdateUser} />
                    <Route path='/updateDept/:id' component={UpdateDept}/>
                    <Route path='/updateAdmin/:id' component={UpdateAdmin}/>
                    <Route path='/updateTicket/:id' component={SubmitTicket} />
                </Switch>
            </BrowserRouter>
        </>
    );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />,
    document.getElementById("root")
);

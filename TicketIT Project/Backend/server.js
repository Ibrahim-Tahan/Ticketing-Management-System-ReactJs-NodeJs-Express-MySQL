import express from 'express';
import cors from 'cors';
import mysql from 'mysql';


const app=express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors()); 

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"ticketing"
});

/*--------------------------User-Login----------------------------*/
app.post('/loginUser', (req, res) => {
    const sql = "SELECT * FROM users WHERE Username=? AND Pass=?;";
    db.query(sql, [req.body.Username, req.body.Pass], (err, data) => {
        if (err) return res.json({Message: "Server Side Error"});
        if(data != 0)
        return res.json(data);
    else
        return res.json({Message: "Not Nice."});
})});
/*---------------------------Admin-Login--------------------------*/
app.post('/loginAdmin', (req, res) => {
    const sql = "SELECT * FROM admintb WHERE Username=? AND Pass=?;";
    db.query(sql, [req.body.Username, req.body.Pass], (err, data) => {
        if (err) return res.json({Message: "Server Side Error"});
        if(data != 0)
        return res.json(data);
   else
        return res.json({Message: "Not Nice."});
})});
//------------------------------------------------------------------Start-Of-Ticket-Section
/*--------------------------Get-Sender----------------------------*/
app.get('/getSender/:id',(req, res)=> {
    const sql = 'SELECT UserID, Name FROM `users` Where DeptID = ?;'
    const id = req.params.id
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*--------------------------Get-Newest-Ticket---------------------*/
app.get('/getNewTicket',(req, res)=>{
    const sql = 'SELECT TicketID, Priority, Description, SentOn, users.Name sender, dept.DeptName receiver, faults.Fault, subfaults.SubFault FROM `tickets`,`users`,`dept`,`subfaults`,`faults` WHERE tickets.SenderID = users.UserID AND tickets.ReceiverID = dept.DeptID AND tickets.subFaultID = subfaults.SubFaultID AND subfaults.FaultID = faults.FaultID AND DoneIn IS NULL ORDER  BY TicketID DESC LIMIT  1;'
    db.query(sql,(err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
})});
/*--------------------------Get-Not-Done-Tickets------------------*/
app.get('/getTicketView/:id',(req, res)=> {
    const sql = 'SELECT TicketID, Priority, Description, SentOn, users.Name, dept.DeptName, faults.Fault, subfaults.SubFault FROM `tickets`,`users`,`dept`,`subfaults`,`faults` WHERE tickets.SenderID = users.UserID AND tickets.ReceiverID = dept.DeptID AND tickets.subFaultID = subfaults.SubFaultID AND subfaults.FaultID = faults.FaultID AND DoneIn IS NULL AND ReceiverID = ? ORDER BY `tickets`.`TicketID` DESC;';
    const id = req.params.id
    db.query(sql,[id],(err , data )=>{
        if (err) return res.json(err);
        return res.json(data);
})});
/*--------------------------Get-Not-Done-Tickets-ID---------------*/
app.get('/getTicketUpdate/:id',(req, res)=> {
    const sql = 'SELECT TicketID, Priority, tickets.ReceiverID,Description, SentOn, users.Name, dept.DeptName, faults.Fault, subfaults.SubFault FROM `tickets`,`users`,`dept`,`subfaults`,`faults` WHERE tickets.SenderID = users.UserID AND tickets.ReceiverID = dept.DeptID AND tickets.subFaultID = subfaults.SubFaultID AND subfaults.FaultID = faults.FaultID AND DoneIn IS NULL AND tickets.TicketID = ?;';
    const id = req.params.id;
    db.query(sql, [id],(err , data )=>{
        if (err) return res.json(err);
        return res.json(data);
})});
/*--------------------------Insert-Ticket-------------------------*/
app.post('/insertTicket', (req, res) => {
    var query = 'INSERT INTO `tickets`( `Priority`, `SubFaultID`, `Description`, `SenderID`, `ReceiverID`, `SentOn`) VALUES (?)';
    const values=[req.body.Priority, req.body.SubFaultID, req.body.Description, req.body.SenderID, req.body.ReceiverID, req.body.SentOn]
    db.query(query,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Get-Done-Tickets-User----------------*/
app.get('/getDoneTicketsUser/:id', (req, res)=> {
    const sql = 'SELECT TicketID, Priority, Description, SentOn, users.Name, dept.DeptName, faults.Fault, subfaults.SubFault, Cause, Solution, DoneIn FROM `tickets`,`users`,`dept`,`subfaults`,`faults` WHERE tickets.SenderID = users.UserID AND tickets.ReceiverID = dept.DeptID AND tickets.subFaultID = subfaults.SubFaultID AND subfaults.FaultID = faults.FaultID AND DoneIn Is NOT NULL AND dept.DeptID = ? ORDER BY `tickets`.`TicketID` ASC;'
    const id = req.params.id;
    db.query( sql, [id], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Get-Done-Tickets-Admin---------------*/
app.get('/getDoneTickets',(req, res) => {
    const sql='SELECT TicketID, Priority, Description, SentOn, users.Name, dept.DeptName, faults.Fault, subfaults.SubFault, Cause, Solution, DoneIn FROM `tickets`,`users`,`dept`,`subfaults`,`faults` WHERE tickets.SenderID = users.UserID AND tickets.ReceiverID = dept.DeptID AND tickets.subFaultID = subfaults.SubFaultID AND subfaults.FaultID = faults.FaultID AND DoneIn Is NOT NULL ORDER BY `tickets`.`TicketID` ASC;'
    db.query(sql,(err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Delete-Tickets-----------------------*/
app.delete("/deleteTicket/:id", (req, res) =>{
    const sql = "DELETE FROM tickets WHERE `tickets`.`TicketID` = ?";
    const id = req.params.id;
    db.query(sql, [id],(err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Update-Tickets-----------------------*/
app.put("/updateTicket/:id", (req,res)=>{
    const sql = 'UPDATE `tickets` SET `Cause`=?,`Solution`=?,`DoneIn`=? WHERE `TicketID`=?;';
    const values = [req.body.Cause, req.body.Solution, req.body.DoneIn]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
})});
//------------------------------------------------------------------End-Of-Ticket-Section


//------------------------------------------------------------------Start-Of-User-Section
/*---------------------------Get-User-Data------------------------*/
app.get('/getUser',(req, res)=> {
    const sql = "SELECT UserID, Name, Username, Pass, DeptName FROM `users`,dept WHERE users.DeptID = dept.DeptID ORDER BY `UserID` ASC; ";
    db.query(sql,(err , data )=>{
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Insert-User--------------------------*/
app.post('/insertUser', (req, res) => {
    var query = 'INSERT INTO users (Name, Username, Pass, DeptID) VALUES (?)';
    const values=[req.body.name, req.body.username, req.body.pass, req.body.deptid]
    db.query(query,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Delete-User--------------------------*/
app.delete('/deleteUser/:id',(req, res) => {
    const sql = "DELETE FROM `users` WHERE `users`.`UserID` = ?";
    const id = req.params.id;
    db.query(sql, [id],(err,data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Update-User--------------------------*/
app.put('/updateUser/:id',(req, res) => {
    const sql= "UPDATE `users` SET `Name`=?,`Username`=?,`Pass`=?,`DeptID`=? WHERE `UserID`=?;";
    const values = [req.body.name, req.body.username, req.body.pass, req.body.deptid]
    const id = req.params.id;
    db.query(sql,[...values,id],(err,data) => {
        if(err) return res.json(err);
        return res.json(data);
})});
//------------------------------------------------------------------End-Of-User-Section


//------------------------------------------------------------------Start-Of-Department-Section
/*---------------------------Get-Dept-----------------------------*/
app.get('/getDept',(req, res)=> {
    const sql = "SELECT dept.DeptID, DeptName, admintb.Name, Count(UserID) NumOfUsers FROM `dept`, admintb, users Where dept.AdminID = admintb.AdminID AND dept.DeptID = users.DeptID GROUP BY DeptID;";
    db.query(sql,(err , data )=>{
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Get-Dept-1---------------------------*/
app.get('/getDept1',(req, res)=> {
    const sql = "SELECT dept.DeptID, DeptName, admintb.Name FROM `dept`, admintb Where dept.AdminID = admintb.AdminID GROUP BY DeptID;";
    db.query(sql,(err , data )=>{
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Insert-Dept--------------------------*/
app.post('/insertDept',(req, res) => {
    const sql = 'INSERT INTO `dept`(`DeptName`, `AdminID`) VALUES (?);';
    const values = [req.body.deptName, req.body.adminID]
    db.query(sql,[values],(err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Delete-Dept--------------------------*/
app.delete('/deleteDept/:id',(req, res) => {
    const sql = "DELETE FROM dept WHERE `dept`.`DeptID` = ?;";
    const id = req.params.id;
    db.query(sql, [id],(err,data)=>{
        if (err)return res.json(err);
        return res.json(data);
})});
/*---------------------------Update-Dept--------------------------*/
app.put('/updateDept/:id', (req, res) => {
    const sql = "UPDATE `dept` SET `DeptName`=?,`AdminID`=? WHERE `DeptID`=?;";
    const values = [req.body.DeptName, req.body.AdminID]
    const id = req.params.id;
    db.query(sql,[...values,id],(err,data) =>{
        if (err)  return res.json(err);
        return res.json(data);
})});
//------------------------------------------------------------------End-Of-Department-Section


//------------------------------------------------------------------Start-Of-Admin-Section
/*---------------------------Get-Admin-Data-----------------------*/
app.get('/getAdmin',(req, res)=> {
    const sql = 'Select * From admintb;';
    db.query(sql,(err , data )=>{
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Insert-Admin-------------------------*/
app.post('/insertAdmin', (req, res) => {
    var query = 'INSERT INTO admintb (Name, Username, Pass) VALUES (?);';
    const values=[req.body.name, req.body.username, req.body.pass]
    db.query(query,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Delete-Admin-------------------------*/
app.delete('/deleteAdmin/:id',(req, res) => {
    const sql = "DELETE FROM `admintb` WHERE `admintb`.`AdminID` = ?;";
    const id = req.params.id;
    db.query(sql,[id],(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Update-Admin-------------------------*/
app.put('/updateAdmin/:id',(req, res)=>{
    const sql = "UPDATE `admintb` SET `Name`=?, `Username`=?, `Pass`=? WHERE `AdminID`=?;";
    const values = [req.body.name, req.body.username, req.body.pass];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err)   return res.json(err);
        return res.json(data);
})});
//------------------------------------------------------------------End-Of-Admin-Section


//------------------------------------------------------------------Start-Of-Fault-Section
/*---------------------------Get-Faults---------------------------*/
app.get('/getFault', (req, res)=>{
    db.query('Select * From faults', (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Get-Fault-and-Sub-Fault--------------*/
app.get('/getFault1', (req, res) => {
    db.query(' SELECT  subfaults.SubFaultID, subfaults.SubFault, faults.FaultID, faults.Fault FROM  faults, subfaults where faults.FaultID = subfaults.FaultID ORDER BY `faults`.`FaultID` ASC;'
    , (err, data)=> {
        if(!err){
            return res.send(data); 
        } else {
            return console.log(`Error ${err}`);
        }
})});
/*---------------------------Insert-Fault-------------------------*/
app.post('/insertFault',(req, res) => {
    const sql = "INSERT INTO `faults`(`Fault`) VALUES (?)";
    const fault= [req.body.fault];
    db.query(sql, [fault], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Insert-Sub-Fault---------------------*/
app.post('/insertSubFault', (req, res) => {
    const sql = 'Insert INTO `subfaults` (SubFault, FaultID) Values (?)';
    const values =[req.body.subFault, req.body.FaultID];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Delete-Sub-Faults--------------------*/
app.delete('/deleteSubFault/:id',(req, res) =>{
    const sql = "DELETE FROM `subfaults` WHERE SubFaultID =?;";
    const id = req.params.id;
    db.query(sql, [id], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
})});
/*---------------------------Delete-Fault-------------------------*///To Apply later
app.delete('/deleteFault/:id',(req, res) =>{
    const sql = "DELETE FROM `faults` WHERE FaultID =?;";
    const id = req.params.id;
    db.query(sql, [id], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
})});
//------------------------------------------------------------------Connecting-To-Port

app.listen(8082, () => {
    console.log(`Listening....`);
});





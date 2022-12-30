const express=require('express')
const {createTicket,updateTicket,getAllTicket ,getOneTicket}=require('../controller/ticket')
const {validTicket}=require('../middleware/ticket')
const {verifyToken}=require('../middleware/user')
const routes2=express.Router();

routes2.post('/crm/createticket',[verifyToken,validTicket],createTicket)
routes2.put('/crm/updateticket/:id',[verifyToken],updateTicket)
routes2.get('/crm/getallticket',[verifyToken],getAllTicket)
routes2.get('/crm/getoneticket/:id',[verifyToken],getOneTicket)

module.exports=routes2
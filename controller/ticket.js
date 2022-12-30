const User = require("../models/user");
const Ticket = require("../models/ticket");
const { ticketStatus, userStatus, userTypes } = require("../utils/constants");
const user = require("../models/user");

async function createTicket(req, res) {
  const ticketObj = {
    title: req.body.title,
    ticketPriority: req.body.ticketPriority,
    description: req.body.description,
    ticketStatus: req.body.ticketStatus,
    reporter: req.userId,
  };

  //finding an enginner to assign the ticket
  const engineer = await User.findOne({
    userType: userTypes.engineer,
    userStatus: userStatus.approved,
  });
  console.log(engineer);
  ticketObj.assignee = engineer.userId;

  try {
    const ticket = await Ticket.create(ticketObj);
    if (ticket) {
      //update the User
      const user = await User.findOne({ userId: req.userId });
      user.ticketsCreated.push(ticket._id);
      await user.save();

      //Update the Enginner
      engineer.ticketsAssigned.push(ticket._id);
      await engineer.save();

      res.status(201).send(ticket);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Internal server Error" });
  }
}

async function updateTicket(req, res) {
  const ticket = await Ticket.findOne({ _id: req.params.id });

  const user = await User.findOne({ userId: req.body });
  // Only the user who created ticket,enginner and admin can update the ticket
  if (
    ticket.reporter == req.body ||
    ticket.assignee == req.body ||
    user.userType == userTypes.admin
  ) {
    ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
    ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
    ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
    ticket.ticketStatus = req.body.ticketStatus != undefined ? req.body.ticketStatus : ticket.ticketStatus;
    ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee;

    await ticket.save();
    res.status(200).send(ticket)
  } else {
    res.status(400).send({ msg: "You are not authorised to update ticket" });
  }
}

async function getOneTicket(req,res){
const ticket =await Ticket.findOne({_id:req.params.id})
if(ticket){
    res.status(200).send(ticket)
}
else{
    res.status(400).send({msg:"ticket not found"})
}

}
async function getAllTicket(req,res){

    const ticketObj={}
    if(req.query.ticketStatus!=undefined){
        ticketObj.ticketStatus=req.query.ticketStatus
    }
    //Now find who is the user: customer/engineer/admin

    const user=await User.findOne({userId:req.userId})
    //if user is admin   
    if(user.userType==userTypes.admin){

       }
    //if user is Engineer 
       else if(user.userType==userTypes.engineer){
        ticketObj.assignee=req.userId
       }
    //if user is Customer
       else{
        ticketObj.reporter=req.userId
       }

    const tickets= await Ticket.find(ticketObj)
    res.status(200).send(tickets)

}

module.exports = { createTicket, updateTicket ,getAllTicket ,getOneTicket};

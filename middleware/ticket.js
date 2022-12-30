async function validTicket(req,res,next){
    if(!req.body.title||!req.body.description){
        res.send({msg:"Title and description is mandatory"})
    }
    else{
        next();
    }
}

module.exports={validTicket}
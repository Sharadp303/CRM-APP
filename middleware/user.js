const User=require('../models/user')
const {secret}=require('../config/auth')
const jwt=require('jsonwebtoken')

async function verifyToken(req,res,next){
    const token=req.headers['access-token']
    console.log(token)
   if(token){ try{
    const result= await jwt.verify(token,secret)
          if(result){
            req.userId=result.id;
            next()
          }
          else{
            res.status(400).send({msg : 'auth token has expired. Please relogin'})
				return;
          }
    }
    catch(err){
        res.status(500).send({msg:'Internal server error'})
    }}

    else{
        res.status(401).send({msg:"token is  missing"})
    }
}
 async function isAdmin(req,res,next){
    
      const result=await User.findOne({userId:req.userId})
      if(result){
        try{
          if(result.userId=='ADMIN'){
            next()
          }
          else{
          res.status(400).send({msg:"Required Admin role"})
          return;
          }

        }
        catch{
          res.status(400).send({msg:"e admin role"})
        }
      }
      else{
          console.log("Not a valid user")
          return;
      }
 
 }

module.exports={verifyToken,isAdmin}
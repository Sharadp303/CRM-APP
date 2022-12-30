const User=require('../models/user')
const {userDetails}=require('../utils/objectConverter')
async function findAllUser(req,res){
   const userType=req.query.userType;
   const userStatus=req.query.userStatus;
   const username=req.query.name;

    try{
                     if(userType){
               const result=await User.find({userType:userType})
                  res.status(200).send(userDetails(result))          }

                  else if(userStatus){
                     const result=await User.find({userStatus:userStatus})
                     res.status(200).send(userDetails(result)) 
                           }

              else  if(username){
                  const result=await User.find({name:username})
                  res.status(200).send(userDetails(result)) 
                        }  
            else  if(userStatus && userType){
                  const result=await User.find({userStatus:userStatus,userType:userType})
                  res.status(200).send(userDetails(result)) 
                        }         
                  else{
               const result=await User.find()
               res.status(200).send(userDetails(result)) 
                   }
    }
    catch(err)
    { console.log(err)
       res.status(401).send({msg:'Internal server error'})
    }
}

async function userByID(req,res){
   const userID= req.params.userId;
  
   try{
const result= await User.find({userId:userID})
if(result){
   res.status(201).send(userDetails(result))
}else{
   res.send({msg:"User not found"})
}
   }
   catch(err){
      console.log(err)
      res.status(401).send({msg:'Internal server Error'})
   }

}
async function userUpdate(req,res){
   const userID= req.params.userId;
  
   try{
const result= await User.findOneAndUpdate({userId:userID},{userStatus:'APPROVED'})
if(result){
   res.status(201).send("User Successfully Updated")
}else{
   res.send({msg:"User not found"})
}
   }
   catch(err){
      console.log(err)
      res.status(401).send({msg:'Internal server Error'})
   }
}
module.exports={findAllUser,userByID,userUpdate}
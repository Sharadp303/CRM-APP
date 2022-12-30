const User=require('../models/user')
const{secret}=require('../config/auth')

const{userTypes,userStatus}=require('../utils/constants')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

async function Signup(req,res){
  if(req.body.userType==userTypes.admin||req.body.userType==userTypes.engineer){
    req.body.userStatus=userStatus.pending;
  }
   const userObj ={ name: req.body.name,
     userId: req.body.userId,
       email: req.body.email,
       userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus:req.body.userStatus,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt  }
    try{
   const result= await User.create(userObj)
   res.status(201).send(result)
}
catch(err){
  console.log(err)
    res.status(500).send({msg : 'Internal Server error'})
}
}

async function signIn(req,res){
    const email=req.body.email;
    const password=req.body.password;
    try{
      const result =await User.findOne({email:email})
      if(result){
        const vaildpassword=bcrypt.compareSync(password,result.password)
        if(!vaildpassword){
          res.status(400).send({msg:'Incorrect email/ password '})
          return;
        }
        if(result.userStatus!=userStatus.approved){
          res.status(200).send({msg:'User not allowed'})
          return;
        }

         const token=await jwt.sign({id:result.userId},secret,{expiresIn:'1h'})

        res.send(token)
      }
      else{
        res.status(400).send({msg:'Incorrect email/ password '})
      }

    }
    catch(err){
      console.log(err)
      res.status(500).send({msg:'Internal server Error'})
    }
}
module.exports={Signup,signIn}
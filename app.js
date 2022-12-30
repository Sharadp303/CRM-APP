const mongoose=require('mongoose')
mongoose.set('strictQuery', false)
const express= require('express')
const bcrypt=require('bcrypt')
const {dbconfig}=require('./config/db.config')
const User= require('./models/user')
const routes=require('./routes/auth')
const routes1=require('./routes/user')
const routes2=require('./routes/ticket')

const app=express()
app.use(express.json())
app.use(routes)
app.use(routes1)
app.use(routes2)

 mongoose.connect(dbconfig)
  .then(  async ()=>{ console.log('Connected!') 
                await init() })
                 .catch(console.log);


 async function init(){
   const user=await User.findOne({userId:'ADMIN'})
      try{
             if(user){
                console.log({msg:'Admin already exists'})
                  }
             else{
                const result=await User.create({
                 name: "Sharad",
                 userId:"ADMIN",
                 email:"sharad.patels03@gmail.com",
                 password:bcrypt.hashSync("helloworld",8),
                 userType:'ADMIN'
                })
                }
                  }
      catch(err){
                  console.log(err)
                }
     }


app.listen(8000,()=>{
    console.log('Server is running on localhost:8000')
})
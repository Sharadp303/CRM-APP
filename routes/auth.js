const express=require('express')
const {Signup,signIn}=require('../controller/auth')
const routes=express.Router()

routes.post('/crm/signin',signIn)
routes.post('/crm/signup',Signup)

module.exports=routes
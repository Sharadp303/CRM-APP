const express=require('express')

const {findAllUser,userByID,userUpdate}=require('../controller/user')
const {verifyToken,isAdmin}=require('../middleware/user')

const routes1=express.Router()

routes1.get('/crm/getall',[verifyToken,isAdmin],findAllUser)

routes1.get('/crm/getall/:userId',[verifyToken,isAdmin],userByID)
routes1.put('/crm/updateuser/:userId',[verifyToken,isAdmin],userUpdate)


module.exports=routes1
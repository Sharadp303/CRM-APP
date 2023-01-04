const Client=require('node-rest-client').Client

const client=new Client();

module.exports=(subject,content,receipientEmails,requester,ticketId)=>{
  var reqBody={
    subject:subject,
    content:content,
    receipientEmails:receipientEmails,
    requester:requester,
    ticketId:ticketId
}
  
var args={
    data:reqBody,
    headers:{ "Content-Type": "application/json" }
}

    client.post('http://localhost:5000/notification/create',args,function (data,response){
        console.log("Request sent")
        console.log(data)

        //console.log(response)
    } )
}


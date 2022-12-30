function userDetails(result){
    let arr=[];
          
    result.forEach((user)=>{
     arr.push({ name:user.name,
        email:user.email,
        userId:user.userId,
        userType:user.userType,
        userStatus:user.userStatus})
    })
    return arr;
}

module.exports = {userDetails}
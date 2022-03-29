const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
    try{
    let token=req.headers["x-api-token"]
    if(!token)
    return res.status(400).send({status:false,msg:"please enter token"})

    let decodeToken=jwt.verify(token,"group05")
    const userLogIn=decodeToken.userID
    req.setHeader("userID",userLogIn)

    if(!decodeToken)
    return res.status(400).send({status:false,msg:"token is invalid please enter valid token"})
    }
    catch(err){
    return res.status(500).send({status:false,msg:err.message})
    }
   

    next()

    
}


const authorization=(req,res,next)=>{
    try{






    }catch(err){
        return res.status(500).status({status:false,msg:err.message})
    }
}
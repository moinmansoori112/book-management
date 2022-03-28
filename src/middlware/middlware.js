const jwt=require("jsonwebtoken")

const authentication=(req,res=>{
    try{
    let token=req.headers["x-api-token"]
    if(!token)
    return res.status(400).send({status:false,msg:"please enter token"})

    let decodeToken=jwt.verify(token,"group05")

    if(!decodeToken)
    return res.status(400).send({status:false,msg:"token is invalid please inter valid token"})
    }
    catch(err){
    return res.status(500).send({status:false,msg:err.messageS})
    }
    next()

    
})
const jwt=require("jsonwebtoken")
const bookModel = require("../models/booksModel")
const mongoose = require("mongoose")

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const authentication=(req,res,next)=>{
    try{
    let token=req.headers["x-api-token"]
    if(!token)
    return res.status(400).send({status:false,msg:"please enter token"})

    let decodeToken=jwt.verify(token,"group05")
    
    if(!decodeToken)
    return res.status(401).send({status:false,msg:"token is invalid please enter valid token"})

    req['userId']= decodeToken.userId

    next()
    }
    catch(err){
    return res.status(500).send({status:false,msg:err.message})
    }
   

    

    
}

const authorization=async (req,res,next)=>{
    try{ 
        const id = req.userId
        const bookId = req.params.bookId
        if (!bookId) {
            return res.status(400).send({ status: false, msg: "please provide bookId" })
        }
        if (!isValidobjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "please provide valid bookId" })
        }

        const book = await bookModel.findOne({_id : bookId,isDeleted: false})
        if(!book){
            return res.status(400).send({status:false,msg:"No such Book Exists"})
        }

        const user = book.userId.toString()
       
        if(user !== id ){
            return res.status(400).send({status:false,msg:"User Is Not Authorized to Edit"})
        }

        next()

         


    }catch(err){
        return res.status(500).status({status:false,msg:err.message})
    }
}

module.exports.authentication=authentication
module.exports.authorization=authorization




















// const authorization=(req,res,next)=>{
//     try{






//     }catch(err){
//         return res.status(500).status({status:false,msg:err.message})
//     }
// }
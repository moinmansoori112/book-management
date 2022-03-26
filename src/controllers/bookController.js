const booksModel = require("../models/booksModel")
const bookModel = require("../models/booksModel")

const userModel=require("../models/userModel")

const isValidObject = async (requestBody) => {
    return (Object.keys(requestBody).length > 0)
}

const isValid = async (value) => {
    if (typeof value === "undifined" || value === null) return false

    if (typeof value === "string" && value.trim().length > 0) return true

    else {
        return false
    }
}
const createBook = async (req, res) => {
    try{
    let body = req.body                   //this is wprking fine but only some edge case not handle
    let id=req.body.userId

    if (!isValidObject(body))
        return res.status(400).send({ status: false, msg: "please enter some data to create book" })

    const { title, excerpt, userId, category, subcategory, } = body

    if(!isValid(title))
    return res.send(400).send({status:false,msg:"please enter title"})

    let findTitle=await bookModel.findOne({title})                   
    if(findTitle) return res.status(400).send("title already exist please enter unique title")



    if(!isValid(excerpt))
    return res.status(400).send({status:false,msg:"please enter excerpt"})


    if(!isValid(userId))
    return res.status(400).send({status:false,msg:"please enter userId"})


    

    let findUSerId=await userModel.findById(userId)
    if(!findUSerId) return res.status(404).send({status:false,msg:"please enter valid userId"})

    if(!isValid(category))
    return res.status(400).send({status:false,msg:"pelase enter category"})

    if(!isValid(subcategory))
    return res.status(400).send({status:false,msg:"please enter subcategory"})

    let input=await bookModel.create(body)
    
    res.status(201).send({status:true,msg:"book created succcessfully",data:input})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }

}

const getBook=async(req,res)=>{
    try{                                              //it is working fine but not giving same outout as we want
    const body=req.query
    if(!isValidObject(body))
    return res.status(400).send({msg:false,msg:"plase enter some data to find book"})

    

    const book=await bookModel.find(body,{isDeleted:false}).populate("userId")

    if(!book) return res.send({status:false,msg:"no such  data found"})

    return res.status(200).send({status:true,data:book})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }

}








module.exports.getBook=getBook


module.exports.createBook=createBook




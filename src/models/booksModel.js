const mongoose=require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

const bookModel= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    excerpt:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        required:true,
        ref:"User"
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    reviews:{
        type:Number,
        default:0,
        comments:Number
        //comment: Holds number of reviews of this book},

    },
    deletedAt:{
        type:Date,
        required:false,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    releasedAt:{
        type:Date,
        required:true,
        
    },



},
{timestamps:true})

module.exports=mongoose.model("book",bookModel)




// title: {string, mandatory, unique},
//   excerpt: {string, mandatory}, 
//   userId: {ObjectId, mandatory, refs to user model},
//   ISBN: {string, mandatory, unique},
//   category: {string, mandatory},
//   subcategory: {string, mandatory},
//   reviews: {number, default: 0, comment: Holds number of reviews of this book},
//   deletedAt: {Date, when the document is deleted}, 
//   isDeleted: {boolean, default: false},
//   releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
//   createdAt: {timestamp},
//   updatedAt: {timestamp},


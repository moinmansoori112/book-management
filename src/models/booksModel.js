const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const bookModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    ISBN: {
        type: String,
        required: true,
        unique: true

    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    reviews: {
        type: Number,
        default: 0,
        //comments: Number
        //comment: Holds number of reviews of this book},

    },
    deletedAt: {
        type: Date,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true,
        //         const dateNow = new Date();
        // postman.setGlobalVariable("todayDate", dateNow.toLocaleDateString());   //think about this

    },



},
    { timestamps: true })

module.exports = mongoose.model("book", bookModel)






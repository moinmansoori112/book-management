const booksModel = require("../models/booksModel")
const bookModel = require("../models/booksModel")
const mongoose = require("mongoose")

//const ObjectId=mongoose.Types.ObjectId

const userModel = require("../models/userModel")


const isValidRequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}


const isValid = (value) => {
    {
        if (typeof value === "undefined" || value === null)
            return false

        if (typeof value === "string" && value.trim().length === 0)
            return false
    }
    return true
}

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}



//CREATE BOOK API

const createBook = async function (req, res) {
    try {
        body = req.body

        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = body

        if (!isValidRequestBody(body)) {
            return res.status(400).send({ status: false, msg: "Invalid request parameters, please provide valid book details" })
        }

        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please provide title" })
        }

        let isUsedTitle = await bookModel.findOne({ title, isDeleted: false })

        if (isUsedTitle) {
            return res.status(400).send({ status: false, msg: `this ${title} is already used` })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please provide exceprt" })
        }

        if (!isValid(userId)) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please provide userId" })
        }

        if (!isValidobjectId(userId)) {
            return res.status(400).send({ status: false, msg: "Invalid userId, please enter valid userId" })
        }

        let userDetails = await userModel.findById(userId)

        if (!userDetails) {
            return res.status(404).send({ status: false, msg: "no user found" })
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please provide ISBN" })
        }

        let isUsedISBN = await bookModel.findOne({ ISBN })

        if (isUsedISBN) {
            return res.status(400).send({ status: false, msg: `this ${ISBN} is already used` })
        }



        //please find the regex for isbn



        
        if (!isValid(category)) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please provide category" })
        }

        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please provide subCategory" })
        }

        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST, please provide releasedAt details" })
        }
        else {
            let bookDetails = await bookModel.create(body)
            return res.status(201).send({ status: true, msg: "book creted successfully", data: bookDetails })
        }
    }

    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const getBook = async (req, res) => {
    try {
        const input = req.query
        const { userId, category, subcategory } = input


        if (!((userId) || (category) || (subcategory)))

            return res.status(400).send({ msg: false, msg: "plase enter some data to find book" })

        // title, excerpt, userId, category, releasedAt, reviews      

        const book = await bookModel.find(input, { isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })

        if (!book) return res.send({ status: false, msg: "no such  data found" })

        return res.status(200).send({ status: true, data: book })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}


module.exports.getBook = getBook


module.exports.createBook = createBook





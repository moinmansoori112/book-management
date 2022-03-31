const { default: mongoose } = require("mongoose")
const reviewModel = require("../models/reviewModel")
const review = require("../models/reviewModel")

const bookModel = require("../models/booksModel")
const objectId = mongoose.Schema.Types.ObjectId


const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}
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


const createPost = async (req, res) => {
    try {
        const data = req.body
        const book = req.params.bookId
        if (!isValidRequestBody(data))

            return res.status(400).send({ status: false, msg: "please enter valid review details" })

        const { reviewedAt, rating, reviewedBy, bookId } = data

        if (!isValid(rating))
            return res.status(400).send({ status: false, msg: "please enter ratings" })

        if (!(rating > 1 && rating <= 5)) {
            return res.status(400).send({ status: false, msg: " Rating ranges from  1 to 5" })
        }
        if (!isValid(reviewedBy))
            return res.status(400).send({ status: false, msg: "please enter reviedname" })

        if (!isValid(bookId))//add something here
            return res.status(400).send({ status: false, msg: "please enter bookId" })

        const findBook = await bookModel.find({ _id: book, isDeleted: false })    //find by id is not handle isdeleted CASE
        if (!findBook)
            return res.status(400).send({ status: false, msg: "bookId not found please enter valid bookId" })

        if (!book)
            return res.status(400).send({ status: false, msg: "please enter bookId to find the book" })

        if (!isValidobjectId(book))
            return res.status(400).send({ status: false, msg: "enter valid bookId" })

        const reviewdatails = await reviewModel.create(data)

        const count = await bookModel.findOneAndUpdate({ _id: book, isDeleted: false }, { $inc: { reviews: 1 } })//this is good practice
        //{ $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
        const details = {
            _id: reviewdatails._id,
            bookId: reviewdatails.bookId,
            reviewedBy: reviewdatails.reviewedBy,         //this way to use create and some usefull data(we can say here we select who data we want)
            reviewedAt: reviewdatails.reviewedAt,
            rating: reviewdatails.rating,
            review: reviewdatails.review

        }

        return res.status(201).send({ status: true, msg: "reviewer created", data: details })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const updataReview = async (req, res) => {
    try {
        let data = req.body
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "enter some data to update" })
        }

        const { review, rating, reviewedBy } = data

        if (!bookId) {
            return res.status(400).send({ status: false, msg: "please enter bookId" })
        }

        if (!isValidobjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "bookId id is not valid" })
        }

        if (!reviewId) {
            return res.status(400).send({ status: false, msg: "please enter reviewId" })
        }

        if (!isValidobjectId(reviewId)) {
            return res.status(400).send({ status: false, msg: "reviewId in not valid" })
        }

        if (!isValid(reviewedBy)) {
            return res.status(400).send({ status: false, msg: "please enter reviewedBy" })
        }

        if (!isValid(rating)) {
            return res.status(400).send({ status: false, msg: "please enter rating" })

        }
        const findBook = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false })
        if (!findBook) {
            return res.status(400).send({ status: false, msg: "bookId or reviewId is not matching " })
        }

        const updatedData = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, data, { new: true, updatedAt: Date.now() })
        const findbook = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
        if (updatedData) {
            let bookData = {
                bookId: findbook._id,
                title: findbook.title,
                exceprt: findbook.exceprt,
                category: findbook.category,
                subcategory: findbook.subcategory,
                reviews: findbook.reviews,
                reviewsData: []
            }

            let reviewsData = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
            bookData.reviewsData = reviewsData
            return res.status(200).send({ status: true, message: "Review updated successfully", data: bookData })  //think something

        }

        else {
            res.status(404).send({ status: false, message: "Either your book is deleted or your review is not present" })

        }
    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.messsaga })
    }

}

// DELETE /books/:bookId/review/:reviewId

const deletedReviewById = async (req, res) => {
    try {

        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!bookId) {
            return res.status(400).send({ status: false, msg: "please enter bookId" })
        }

        if (!isValidobjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "bookId id is not valid" })
        }

        if (!reviewId) {
            return res.status(400).send({ status: false, msg: "please enter reviewId" })
        }

        if (!isValidobjectId(reviewId)) {
            return res.status(400).send({ status: false, msg: "reviewId in not valid" })
        }

        const findreviewer = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, { isDeleted: true, deletedAt: Date.now(), new: true })
        if (!findreviewer) {
            return res.status(400).send({ status: false, msg: "reviewer not exist's " })
        }

        const updated = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: (-1) } })
        return res.status(200).send({ status: true, msg: "successfully deleted" })




    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}




module.exports.createPost = createPost
module.exports.updataReview = updataReview

module.exports.deletedReviewById = deletedReviewById
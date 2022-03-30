const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")

const mid=require("../middlware/middlware")

const reviewController=require("../controllers/reviewController")

const bookController=require("../controllers/bookController");
const { route } = require('express/lib/application');
// const internController=require("../controllers/internController")

router.post('/register', UserController.CreateUser)

router.post("/login",UserController.logIn)

router.post("/books",mid.authentication,bookController.createBook)

router.get("/getbooks",bookController.getBook)

router.post("/books/:bookId/review",reviewController.createPost)

router.get("/books/:bookId",mid.authentication,bookController.getById)

router.put("/books/:bookId",mid.authentication,mid.authorization,bookController.update)

router.delete("/books/:bookId",bookController.deleteById)

router.put("/books/:bookId/review/:reviewId",reviewController.updataReview)

router.delete("/books/:bookId/review/:reviewId",reviewController.deletedReviewById)


module.exports = router
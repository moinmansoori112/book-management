const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")

const bookController=require("../controllers/bookController")
// const internController=require("../controllers/internController")

router.post('/register', UserController.CreateUser)

router.post("/login",UserController.logIn)

router.post("/books",bookController.createBook)

router.get("/getbooks",bookController.getBook)


module.exports = router
const userModel = require("../models/userModel")
const UserModel = require("../models/userModel")


const isrequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}


const isValidTitle = (title) => {
    ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
    return
}


const isValid = (value) => {
    if (typeof value === "undefined" || value === null)
        return false
    if (typeof value === "string" && value.trim().length === 0)
        return false
    else
        return true
}


const CreateUser = async function (req, res) {
    try {
        let body = req.body
        if (!isrequestBody(body)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters, please provide user details" })
        }
        const { title, name, phone, email, password } = body

        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: "please provide title" })

        }

        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, msg: "please provide title from enum" })

        }


        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "please provide name" })

        }

        if (!isValid(phone)) {
            return res.status(400).send({ status: false, msg: "please provide phone" })

        }

        if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone))) {
            return res.status(400).send({ status: false, message: `Mobile Number is not valid` })

        }

        let duplicatephone = await userModel.findOne({ phone });
        if (duplicatephone) {
            return res.status(404).send({ status: false, msg: "phone is already in use" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "please provide email" })

        }

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: `email is not valid` })

        }

        let isDuplicateEmail = await userModel.findOne({ email });
        if (isDuplicateEmail) {
            return res.status(404).send({ status: false, msg: "Email is already in use" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "please provide password" })

        }

        if (!(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, message: `password is not valid` })

        }

        const user = await userModel.create(body)
        return res.status(201).send({ status: true, msg: "user created successfully", data: user })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })

    }
}


module.exports.CreateUser = CreateUser


var express = require('express')
let router = express.Router()

const { displayHome, createUser } = require('../../controllers/Home/HomeController')
let middleware = require('../../middlewares/middlewares')

router.get("/", displayHome)

//add middleware to check email exists
router.post("/register", createUser)

module.exports = router;
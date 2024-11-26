const express = require('express')
const router = express.Router()
const {ask} = require("../controllers/chatController")

router.post('/query',ask)

module.exports = router
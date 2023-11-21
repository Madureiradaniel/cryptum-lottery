const express = require("express")
const route = express.Router()
const controller = require("../controller/Bet")

route.post("/", controller.createBet)
route.post("/check", controller.checkWinner)
route.get("/:wallet", controller.listBets)

module.exports = route
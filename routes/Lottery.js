const express = require("express")
const router = express.Router()
const controller = require("../controller/Lottery")

router.post("/", controller.findOrCreateLottery)
router.get("/:id", controller.getLottery)
router.post("/subscription", controller.createSubscription)
router.post("/automation", controller.createAutomation)
router.post("/registerUpkeep", controller.registerUpkeep)

router.get("/start/:id", controller.unpauseLottery)
router.get("/stop/:id", controller.pauseLottery)
// router.get("/cancel/:id")

router.get("/randomWords/:id", controller.getLatestRandomWord)

module.exports = router
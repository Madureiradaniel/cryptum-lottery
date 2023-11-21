const express = require("express")
const router = express.Router()
const controller = require("../controller/Wallet")

router.post("/", controller.findOrCreateWalletByEmail)
router.get("/:address", controller.balanceWallet)

module.exports = router
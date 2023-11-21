require("./db")
require("./cron")
const express = require("express")
const cors = require("cors")
const app = express()

const entryWallet = require("./routes/Wallet")
const entryLottery = require("./routes/Lottery")
const entryBet = require("./routes/Bet")

app.use(cors());
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ extended: true }))

app.get("/healthcheck", (req, res) => res.send({ health: true }))

app.use("/wallet", entryWallet)
app.use("/lottery", entryLottery)
app.use("/bet", entryBet)

module.exports = app
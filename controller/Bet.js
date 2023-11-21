const Bet = require("../service/Bet")
const Cryptum = require("../service/Cryptum")
const Lottery = require("../service/Lottery")

exports.createBet = async (req, res) => {
    const { idLottery, wallet_address } = req.body;

    const lottery = await Lottery.getLotteryById(idLottery)
    if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })

    const subscriptionVRF = await Cryptum.getSubscriptionVRF(lottery.subscriptionContract)

    const data = {
        betNumbers: req.body.betNumbers,
        round: Number(subscriptionVRF.fulfillments) + 1,
        wallet_address
    }

    if (data.betNumbers.length > 10) return res.status(401).send({ error: true, message: "Max length betNumber : 10!" })

    const bet = await Bet.getBet()

    if (bet) return res.send({ error: false, message: "Alread exist!", bet })

    const newBet = await Bet.createBet(data)

    res.send({ error: false, bet: newBet })
}

exports.listBets = async (req, res) => {
    const { wallet } = req.params;
    const bets = await Bet.list(wallet)
    res.send(bets)
}

exports.checkWinner = async (req, res) => {
    const { random_word, idBet, round } = req.body;
    const bet = await Bet.checkWinner(idBet, random_word, round)
    res.send(bet)
}

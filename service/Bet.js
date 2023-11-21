const BetDb = require("../model/Bet")
const Cryptum = require("../service/Cryptum")
const WalletDb = require("../model/Wallet")
const logger = require("../logger")

exports.createBet = async (params) => {
    return await new BetDb(params).save()
}
exports.getBet = async () => await BetDb.findOne({ isClosed: false })
exports.getBetByID = async (id) => await BetDb.findOne({ _id: id })
exports.updateBet = async (id, params) => await BetDb.updateOne({ _id: id }, params)
exports.list = async (wallet_address) => await BetDb.find({ wallet_address }).sort({ createdAt: -1 }).limit(5)

exports.listAll = async () => await BetDb.find({ isClosed: false })

exports.checkWinner = async (idBet, random_word, round) => {

    const bet = await BetDb.findOne({ isClosed: false, _id: idBet })
    if (!bet) return { error: true, message: "Not found!" }

    if (bet.round != round) return { error: true, message: "Round Error!" }

    const random_word_split = random_word.match(/.{1,2}/g)

    var count = 0;
    for (let bet_number of bet.betNumbers) {
        if (random_word_split.includes(bet_number)) count++
    }

    const wallet_owner = await Cryptum.getWalletOwner()

    logger.info("count: ", count)
    if (count >= 6) {
        logger.info("winner")
        bet.winner = true
        let response = await Cryptum.transferTokenNativeAsset("0.025", wallet_owner, bet.wallet_address)
        logger.info({ hash: response })
    }
    else {
        logger.info("lost")
        bet.winner = false
        const wallet = await WalletDb.findOne({ address: bet.wallet_address })
        let response = await Cryptum.transferTokenNativeAsset("0.025", wallet, wallet_owner.address)
        logger.info({ hash: response })
    }

    bet.sorted_numbers = random_word_split
    bet.isClosed = true
    bet.hits = count

    await bet.save()

    return bet
}
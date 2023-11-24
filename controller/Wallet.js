const logger = require("../logger")
const Wallet = require("../service/Wallet")
const Cryptum = require("../service/Cryptum")

/**
 * Implementation mentioned in: https://github.com/cryptum-official/cryptum-sdk/blob/master/docs/chainlink/examples/lottery.md#step-3
 */
exports.findOrCreateWalletByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const wallet = await Wallet.findOrCreateWalletByEmail(email)

        const balance = await Cryptum.balaceWallet(wallet.address)

        res.send({ wallet, balance })

    } catch (e) {
        logger.error({ message: JSON.stringify(e) })
        res.status(500).send({ error: true, message: e.toString() })
    }
}

exports.balanceWallet = async (req, res) => {
    try {
        const { address } = req.params;

        const balace = await Cryptum.balaceWallet(address)

        res.send(balace)

    } catch (e) {
        logger.error({ message: JSON.stringify(e) })
        res.status(500).send({ error: true, message: e.toString() })
    }
}
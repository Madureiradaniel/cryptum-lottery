const WalletDb = require("../model/Wallet")
const Cryptum = require("./Cryptum")

exports.findOrCreateWalletByEmail = async (email) => {
    const wallet = await WalletDb.findOne({ email }, "protocol testnet address")

    if (wallet) return wallet;

    const wallet_cryptum = await Cryptum.createWallet()

    const new_wallet = new WalletDb({
        email,
        ...wallet_cryptum
    })

    await new_wallet.save()

    return {
        _id: new_wallet._id,
        protocol: new_wallet.protocol,
        testnet: new_wallet.testnet,
        address: new_wallet.address
    }
}
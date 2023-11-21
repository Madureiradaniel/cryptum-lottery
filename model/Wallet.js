const mongoose = require('mongoose')


const walletSchema = new mongoose.Schema({
    email: { index: true, type: String, unique: true },
    protocol: String,
    privateKey: String,
    publicKey: String,
    address: String,
    xpub: String,
    testnet: { type: Boolean, default: true }
}, { timestamps: true })

const Wallet = mongoose.model('wallet', walletSchema);
module.exports = Wallet
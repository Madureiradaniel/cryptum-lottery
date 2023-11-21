const mongoose = require('mongoose')

const betSchema = new mongoose.Schema({
    amount : String,
    winner: Boolean,
    betNumbers: [String],
    sorted_numbers: [String],
    transfered: Boolean,
    round: Number,
    hits: Number,
    wallet_address: String,
    isClosed: { type: Boolean, default : false }
}, { timestamps: true })

const Bet = mongoose.model('bet', betSchema);
module.exports = Bet
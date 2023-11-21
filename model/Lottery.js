const mongoose = require('mongoose')

const lotterySchema = new mongoose.Schema({
    upkeepId: String,
    upkeepContract: String,
    subscriptionVRFID: String,
    subscriptionContract: String,
    latestRequestID: String,
    owner: String,
    protocol: String,
    testnet: { type: Boolean, default: true },
    acitvated: { type: Boolean, default: true }
}, { timestamps: true })

const Loterry = mongoose.model('lottery', lotterySchema);
module.exports = Loterry
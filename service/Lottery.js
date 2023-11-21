const LotteryDb = require("../model/Lottery")

exports.findActiveLottery = async () => {
    return await LotteryDb.findOne({ acitvated: true })
}
exports.getLotteryById = async (id) => await LotteryDb.findById(id)
exports.createLottery = async () => await LotteryDb({}).save()
exports.updateLottery = async (id, params) => await LotteryDb.updateOne({ _id: id }, { ...params })
exports.checkWinner = async (idBet, random_word) => {
    
    const bet_numbers = ["03", "10", "13", "25", "11", "75", "98", "12", "23", "74"]
    const random_word_split = random_word.match(/.{1,2}/g)
    console.log(random_word_split)

    var count = 0;
    for (let bet_number of bet_numbers) {
        if (random_word_split.includes(bet_number)) count++
    }

    console.log("count: ", count)
    if (count >= 6) console.log("winner")
    else console.log("lost")
}
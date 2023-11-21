const cron = require("node-cron")
const logger = require("../logger")
const Bet = require("../service/Bet")
const Lottery = require("../service/Lottery")
const Cryptum = require("../service/Cryptum")


cron.schedule("* * * * *", async () => {
    try{
        const bets = await Bet.listAll()
        const lottery = await Lottery.findActiveLottery()
        
        if(!lottery){
            logger.info({ message: "Lottery not found!"})
            return
        }

        const requests = await Cryptum.getRequestsIDVRF(lottery.subscriptionContract)
        // console.log(requests)

        for(let bet of bets){
            if(bet.round > requests.length){
                logger.info({ betId: bet._id, round: bet.round, message: "round not found"})
                continue;
            }

            const requestID = requests[bet.round - 1]

            console.log("requestID: ", requestID)

            // get random words
            const randomWords = await Cryptum.getRandomWord(lottery.subscriptionContract, requestID)
            console.log(randomWords)

            // verifica se já foi executado
            if(!randomWords.fulfilled){
                logger.info({ message: "random words not executed"})
                continue;
            }

            const result = await Bet.checkWinner(bet._id, randomWords.randomWords[0], bet.round)
            console.log(result)
        } 

    }catch(e){
        logger.error({ message: e.toString( )})
    }
})
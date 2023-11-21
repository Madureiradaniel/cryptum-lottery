const Lottery = require("../service/Lottery")
const Cryptum = require("../service/Cryptum")

exports.findOrCreateLottery = async (req, res) => {
    const lottery = await Lottery.findActiveLottery()
    if (lottery) return res.send(lottery);
    const new_lottery = await Lottery.createLottery()
    res.send(new_lottery)
}

exports.createAutomation = async (req, res) => {
    const { idLottery } = req.body;

    const lottery = await Lottery.getLotteryById(idLottery)
    if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })

    const hash = await Cryptum.createAutomation()
    const contractAddress = await Cryptum.getContractAddress(hash)
    await Cryptum.tranferTokens("20", contractAddress)

    await Lottery.updateLottery(idLottery, {
        upkeepContract: contractAddress
    })

    res.send({ automation: contractAddress })
}


exports.createSubscription = async (req, res) => {
    const { idLottery } = req.body;

    const lottery = await Lottery.getLotteryById(idLottery)
    if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })
    if (lottery.subscriptionContract) return res.status(401).send({ error: true, message: "Subscription already exists!", subscription: lottery.subscriptionContract })

    const walletOwner = await Cryptum.getWalletOwner()
    const hash = await Cryptum.createVRF()
    const contractAddress = await Cryptum.getContractAddress(hash)
    await Cryptum.topUpVRF(contractAddress)
    const subscriptionVRF = await Cryptum.getSubscriptionVRF(contractAddress)

    await Lottery.updateLottery(idLottery, {
        protocol: walletOwner.protocol,
        subscriptionContract: contractAddress,
        subscriptionVRFID: subscriptionVRF.subscription_id,
        owner: walletOwner.address
    })

    res.send(subscriptionVRF)
}

exports.registerUpkeep = async (req, res) => {
    const { idLottery } = req.body;
    const lottery = await Lottery.getLotteryById(idLottery)
    if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })

    const hash = await Cryptum.registerUpkeep({
        address: lottery.upkeepContract,
        name: 'Cryptum Random Words',
        encryptedEmail: '0x',
        upkeepContract: lottery.subscriptionContract,
        gasLimit: 500000,
        triggerType: 0,
        checkData: '0x',
        triggerConfig: '0x',
        offchainConfig: '0x',
        amount: '20' // lINK
    })

    await Cryptum.getContractAddress(hash)

    const upkeep = await Cryptum.listUpkeeps(lottery.upkeepContract)

    await Lottery.updateLottery(idLottery, {
        upkeepId: upkeep[0]
    })

    res.send({ hash, upkeepId: upkeep[0] })
}

exports.getLottery = async (req, res) => {
    try {
        const { id } = req.params;
        const lottery = await Lottery.getLotteryById(id)
        if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })

        const subscription = await Cryptum.getSubscriptionVRF(lottery.subscriptionContract)
        const automation = await Cryptum.getUpkeep(lottery.upkeepId)

        const latestRequestID = await Cryptum.getLatestRequestVRF(lottery.subscriptionContract)

        if (latestRequestID != lottery.latestRequestID) {
            await Lottery.updateLottery(id, { latestRequestID: latestRequestID })
        }

        const randomWords = await Cryptum.getRandomWord(lottery.subscriptionContract, latestRequestID)

        const price = await Cryptum.getPrice()

        res.send({
            lottery,
            price,
            interval: Number(process.env.INTERVAL_UPKEEP),
            automation,
            subscription,
            requestIdOld: lottery.latestRequestID,
            requestId: latestRequestID,
            ...randomWords
        })
    } catch (e) {
        logger.error(e)
        res.status(500).send({ error: true })
    }
}

exports.pauseLottery = async (req, res) => {
    const { id } = req.params;
    const lottery = await Lottery.getLotteryById(id)
    if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })
    const hash = await Cryptum.pauseUpkeep(lottery.upkeepId)
    res.send({ hash })
}

exports.unpauseLottery = async (req, res) => {
    const { id } = req.params;
    const lottery = await Lottery.getLotteryById(id)
    if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })
    const hash = await Cryptum.unpauseUpkeep(lottery.upkeepId)
    res.send({ hash })
}

exports.getLatestRandomWord = async (req, res) => {
    const { id } = req.params;
    const lottery = await Lottery.getLotteryById(id)
    if (!lottery) return res.status(404).send({ error: true, message: "Not found!" })

    const subscription = await Cryptum.getSubscriptionVRF(lottery.subscriptionContract)
    const latestRequestID = await Cryptum.getLatestRequestVRF(lottery.subscriptionContract)

    if (latestRequestID != lottery.latestRequestID) {
        await Lottery.updateLottery(id, { latestRequestID: latestRequestID })
    }

    const randomWords = await Cryptum.getRandomWord(lottery.subscriptionContract, latestRequestID)

    res.send({
        subscription,
        requestIdOld: lottery.latestRequestID,
        requestId: latestRequestID,
        ...randomWords
    })
}
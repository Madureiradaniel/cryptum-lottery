const CryptumSDK = require('cryptum-sdk')
const { LINK_TOKEN_POLYGON_MUMBAI } = require('../constants')
const protocol = process.env.PROTOCOL
const logger = require("../logger")
const { delay } = require('./utils')

const sdk = new CryptumSDK({
    environment: "testnet", // 'testnet' or 'development', 'mainnet' or 'production'
    apiKey: process.env.API_KEY,
})

module.exports = class {
    static async createWallet() {
        return await sdk.wallet.generateWallet({ protocol })
    }

    static async getWalletOwner() {

        const wallet = await sdk.wallet.generateWallet({
            protocol,
            mnemonic: process.env.WALLET_ADMIN_MNEMONIC
        })

        return wallet
    }

    static async getPrice(){
        const price = await sdk.chainlink.getPrices({
            asset: "MATIC", 
            protocol
        })

        return price
    }

    static async balaceWallet(address) {
        return await sdk.wallet.getWalletInfo({
            protocol,
            address,
            tokenAddresses: [LINK_TOKEN_POLYGON_MUMBAI]
        })
    }

    static async createVRF() {
        const wallet = await this.getWalletOwner()
        const { hash } = await sdk.chainlink.createVRF({
            protocol,
            wallet,
            updateIntervalUpkeep: Number(process.env.INTERVAL_UPKEEP) // requisitar uma nova palavra a cada 40 blocos
        })
        logger.info({ hash })
        return hash
    }

    static async topUpVRF(address) {
        const wallet = await this.getWalletOwner()
        const { hash } = await sdk.chainlink.topUpVRF({
            protocol,
            address,
            wallet,
            amount: 10
        })
        logger.info({ hash })
        return hash
    }

    static async getSubscriptionVRF(address) {
        const subscription = await sdk.chainlink.getSubscriptionVRF({
            protocol,
            address
        })
        return subscription
    }

    static async getUpkeep(upkeepID){
        const upkeep = await sdk.chainlink.getUpkeep({
            protocol,
            upkeepID
        })
        return upkeep
    }

    static async pauseUpkeep(upkeepID){
        const wallet = await this.getWalletOwner()
        const { hash } = await sdk.chainlink.pauseUpkeep({
            protocol,
            wallet,
            upkeepID
        })
        return hash
    }

    static async unpauseUpkeep(upkeepID){
        const wallet = await this.getWalletOwner()
        const { hash } = await sdk.chainlink.unpauseUpkeep({
            protocol,
            wallet,
            upkeepID
        })
        return hash
    }

    static async getLatestRequestVRF(address){
        const latestRequestID = await sdk.chainlink.latestRequestVRF({
            protocol,
            address
        })
        return latestRequestID.latestRequest
    }

    static async getRequestsIDVRF(address){
        const { requests } = await sdk.chainlink.requestsVRF({
            protocol,
            address
        })

        return requests
    }

    static async getRandomWord(address, requestId){
        const randomWords = await sdk.chainlink.getRandomWordsVRF({
            protocol,
            address,
            requestId
        })

        return randomWords
    }

    static async createAutomation() {
        const wallet = await this.getWalletOwner()
        const { hash } = await sdk.chainlink.createAutomation({
            protocol,
            wallet
        })
        logger.info({ hash })
        return hash
    }


    static async registerUpkeep(params) {
        const wallet = await this.getWalletOwner()
        const { hash } = await sdk.chainlink.registerUpkeep({
            protocol,
            wallet,
            ...params
        })
        logger.info({ hash })
        return hash
    }

    static async listUpkeeps(address){
        const upkeeps = await sdk.chainlink.listUpkeeps({
            protocol,
            address
        })
        return upkeeps
    }

    static async tranferTokens(amount, contractAddress) {
        const wallet = await this.getWalletOwner()
        const { hash } = await sdk.token.transfer({
            protocol,
            amount,
            wallet,
            token: LINK_TOKEN_POLYGON_MUMBAI,
            destination: contractAddress
        })
        logger.info({ hash })
        return hash
    }

    static async transferTokenNativeAsset(amount, from, to){
        const { hash } = await sdk.token.transfer({
            protocol,
            amount,
            wallet: from,
            token: "MATIC",
            destination: to
        })
        logger.info({ hash })
        return hash
    }

    static async getContractAddress(hash) {
        let error = true;
        let attempts = 5;

        while (error && attempts > 0) {
            try {
                const { contractAddress } = await sdk.transaction.getTransactionReceiptByHash({
                    protocol,
                    hash
                })
                console.log('contractAddress: ', contractAddress)
                error = false;
                return contractAddress
            } catch (e) {
                logger.error({ message: e.toString() })
                logger.info({ message: "attempts: " + attempts })
                await delay(6000)
            }
            attempts--;
        }
    }

}
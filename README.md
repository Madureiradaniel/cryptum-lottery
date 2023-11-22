# About The Project

This code provides a practical example of how to use the Chainlink functions implemented with the [Cryptum-sdk](https://github.com/cryptum-official/cryptum-sdk)

In this project, we utilized the following functionalities:

- Price Feeds
- VRF
- Automation

This project was developed based on the POLYGON network on TESTNET.

It's necessary to have MATIC and at least 20 LINK in your wallet for it to function correctly.

The game generates random numbers every 100 generated blocks.

The player must define a sequence of 10 numbers; if the player matches 6 numbers or more, they will win a reward. If they match fewer than 6, the player will pay the game's admin.

## About Cryptum

The Cryptum infrastructure allows clients to integrate and interact with the most diverse blockchain protocols - you don't need to start from scratch! We already laid the foundation for you to build upon. </b> Learn more about Cryptum <a href="https://cryptum.io" target="_blank">here</a>.


## About Chainlink

Chainlink is the industry-standard Web3 services platform that has enabled trillions of dollars in transaction volume across DeFi, insurance, gaming, NFTs, and other major industries. As the leading decentralized oracle network, Chainlink enables developers to build feature-rich Web3 applications with seamless access to real-world data and off-chain computation across any blockchain and provides global enterprises with a universal gateway to all blockchains.

## Playground

Use this playground to simulate bets and observe the functionality of Chainlink VRF generating random numbers every 100 mined blocks on the POLYGON network - MUMBAI.

https://lottery.danielmadureira.dev

Provide your email and start playing.

If the game is paused, you can press to initiate the number generation.

## Faucets

- MATIC - https://mumbaifaucet.com/
- LINK - https://faucets.chain.link/mumbai

[Read more about the Chainlink integration](docs/chainlink.md).


## First Steps

Create your account on [Cryptum Dashboard](https://dashboard.cryptum.io)

### Requirements

- Docker
- docker-compose

### Run

```bash
docker-compose up --build
```

### START LOTTERY

"Access the documentation through Postman:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/7996144-0ad56245-2d6a-4172-a984-84ace10a9436?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D7996144-0ad56245-2d6a-4172-a984-84ace10a9436%26entityType%3Dcollection%26workspaceId%3Da00e2d23-653b-41f5-a0fa-236b846175c2#?env%5BLottery%5D=W3sia2V5IjoiaG9zdCIsInZhbHVlIjoibG9jYWxob3N0OjgwODAiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCJ9XQ==)

Follow these steps to create a new game:

- Create Lottery (POST | /lottery/create)

- Create Subscription (POST | /lottery/subscription)

- Create Automation (POST | /lottery/automation)

- Register Upkeep ( POST | /lottery/registerUpkeep)
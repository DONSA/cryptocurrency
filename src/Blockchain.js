const fs = require('fs')
const Block = require('./Block.js')
const Transaction = require('./Transaction.js')

module.exports = class Blockchain
{
    constructor()
    {
        this.chain = []
        this.difficulty = 3
        this.transactionPool = []
        this.miningReward = 10

        this.loadBlockchain()
    }

    loadBlockchain()
    {
        let blockchain = []
        fs.readdirSync('./blockchain/').forEach((fileName) => {
            blockchain.push(
                Block.deserialize(fs.readFileSync('./blockchain/' + fileName))
            )
        })

        this.chain = blockchain.sort((a, b) => {
            return b.id - a.id
        })
    }

    mine(minerAddress)
    {
        let block = this.chain[0]
        this.transactionPool.forEach(transaction => {
            block.transactions.push(transaction)
        })

        block.mine(this.difficulty).persist()
        console.log('Block mined:', block.hash)

        let rewardTransaction = new Transaction('coinbase', minerAddress, this.miningReward)

        this.chain.push(
            new Block(block.id + 1, Date.now(), [rewardTransaction], block.hash).persist()
        )
    }

    broadcast(transaction)
    {
        this.transactionPool.push(transaction)
    }

    balance(address = null)
    {
        if (!address) {
            throw new Error('No user address provided')
        }

        let balance = 0
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }

                if (trans.toAddress === address) {
                    balance += trans.amount
                }
            }
        }

        return '$' + balance
    }
}
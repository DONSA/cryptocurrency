const SHA256 = require("crypto-js/sha256")
const fs = require('fs')

module.exports = class Block
{
    constructor(id, timestamp, transactions, prev = '')
    {
        this.id = id
        this.timestamp = timestamp
        this.transactions = transactions
        this.prev = prev
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash()
    {
        return SHA256(this.prev + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString()
    }

    mine(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }

        return this
    }

    persist()
    {
        fs.writeFileSync('./blockchain/' + this.id + '.json', this.serialize())

        return this
    }

    serialize()
    {
        return JSON.stringify(this, null, 4)
    }

    static deserialize(data)
    {
        data = JSON.parse(data);

        return new Block(data.id, data.timestamp, data.transactions, data.prev)
    }
}
const Blockchain = require('./Blockchain.js')
const Transaction = require('./Transaction.js')

let cryptocurrency = new Blockchain()

console.log('Transacting...')
for (let i = 0; i < 100; i++) {
    cryptocurrency.broadcast(new Transaction('user1-pubkey', 'user2-pubkey', Math.random()))
    cryptocurrency.broadcast(new Transaction('user2-pubkey', 'user1-pubkey', Math.random()))
}

console.log('Miner balance:', cryptocurrency.balance('miner-pubkey'))
cryptocurrency.mine('miner-pubkey')
console.log('Miner balance:', cryptocurrency.balance('miner-pubkey'))

console.log('User 1 balance:', cryptocurrency.balance('user1-pubkey'))
console.log('User 2 balance:', cryptocurrency.balance('user2-pubkey'))
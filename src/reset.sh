#!/usr/bin/env bash

cd $(dirname $0)

echo "> Removing blocks"
rm ./blockchain/*

echo "> Creating genesis block"
echo '{
    "id": 1,
    "timestamp": 1514764800000,
    "transactions": [
        {
            "fromAddress": "coinbase",
            "toAddress": "user1-pubkey",
            "amount": 10
        },
        {
            "fromAddress": "coinbase",
            "toAddress": "user2-pubkey",
            "amount": 10
        }
    ],
    "prev": "",
    "hash": "84f9496d14f0d5e865b53d15583b47f3454b0a31cb61e1e23d647c5f45fa87af",
    "nonce": 0
}' > ./blockchain/1.json
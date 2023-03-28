const SHA256 = require("crypto-js/sha256");

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(transactions, previousHash = "") {
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.timestamp = Date.now();
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
            console.log(this.hash);
        }
        console.log(`new block nonce: ${this.nonce}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.maximumTransactions = 4;
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block([], "0");
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);

        if (this.pendingTransactions.length >= this.maximumTransactions) {
            this.minePendingTransactions();
        }
    }

    minePendingTransactions() {
        const newBlock = new Block(
            this.pendingTransactions,
            this.getLastBlock().hash
        );
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        this.pendingTransactions = [];
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = { Blockchain, Transaction };

const { Blockchain, Transaction } = require("../blockchain");
const { expect } = require("chai");

describe("Blockchain", () => {
    let simpleBlockchainTest = new Blockchain();

    it("starts with a genesis block", () => {
        expect(simpleBlockchainTest.chain.length).to.equal(1);
    });

    it("adds a transaction and mines a new block when 4 transactions are pending", () => {
        const initialLength = simpleBlockchainTest.chain.length;
        simpleBlockchainTest.addTransaction(new Transaction("Alice", "Bob", 50));
        simpleBlockchainTest.addTransaction(new Transaction("Alice", "Charlie", 25));
        simpleBlockchainTest.addTransaction(new Transaction("Bob", "Charlie", 10));
        simpleBlockchainTest.addTransaction(new Transaction("Charlie", "Alice", 5));

        expect(simpleBlockchainTest.chain.length).to.equal(initialLength + 1);
    });

    it("correctly validates a valid chain", () => {
        expect(simpleBlockchainTest.isValid()).to.be.true;
    });

    it("correctly detects an invalid chain", () => {
        simpleBlockchainTest.chain[1].transactions[0].amount = 100;
        expect(simpleBlockchainTest.isValid()).to.be.false;
    });
});

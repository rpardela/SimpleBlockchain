const express = require("express");
const bodyParser = require("body-parser");
const { Blockchain, Transaction } = require("./blockchain");

const app = express();
app.use(bodyParser.json());

const simpleBlockchain = new Blockchain();

app.get("/lastBlock", (req, res) => {
    res.send(simpleBlockchain.getLastBlock());
});

app.post("/addTransaction", (req, res) => {
    const { fromAddress, toAddress, amount } = req.body;
    const transaction = new Transaction(fromAddress, toAddress, amount);
    simpleBlockchain.addTransaction(transaction);
    res.send("Transaction added successfully.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

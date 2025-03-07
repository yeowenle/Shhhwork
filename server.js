require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const Web3 = require("web3");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// Load Web3 & Smart Contract ABI
const web3 = new Web3("https://sepolia-rpc.scroll.io/");
const contractABI = JSON.parse(fs.readFileSync("confessionABI.json", "utf-8"));
const contractAddress = "0x8DFEf91AcE87F7FD453c5E260A8B80516e5c98bf";
const confessionContract = new web3.eth.Contract(contractABI, contractAddress);

// Sender address and private key (for signing transactions)
const sender = process.env.SENDER_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

// Helper function to generate a pseudonym
function generatePseudonym(address, secret) {
    return crypto.createHash("sha256").update(address + secret).digest("hex");
}

// Serve the frontend
app.get("/confess", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/first.html"));
});

// Generate a pseudonym for a user
app.post("/generate-pseudonym", (req, res) => {
    const { address, secret } = req.body;

    if (!address || !secret) {
        return res.status(400).json({ error: "Address and secret are required" });
    }

    const pseudonym = generatePseudonym(address, secret);
    res.json({ pseudonym });
});

// Add new confession (using pseudonym)
app.post("/confess", async (req, res) => {
    const { pseudonym, message, company } = req.body;

    if (!pseudonym || !message || !company) {
        return res.status(400).json({ error: "Pseudonym, message, and company are required" });
    }

    try {
        const tx = confessionContract.methods.addConfession(pseudonym, message, company);
        const gas = await tx.estimateGas({ from: sender });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data,
                gas,
                gasPrice
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ success: true, transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Like a confession (using pseudonym)
app.post("/like", async (req, res) => {
    const { pseudonym, confessionId } = req.body;

    if (!pseudonym || confessionId === undefined) {
        return res.status(400).json({ error: "Pseudonym and confessionId are required" });
    }

    try {
        const tx = confessionContract.methods.likeConfession(pseudonym, confessionId);
        const gas = await tx.estimateGas({ from: sender });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data,
                gas,
                gasPrice
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ success: true, transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Comment on a confession (using pseudonym)
app.post("/comment", async (req, res) => {
    const { pseudonym, confessionId, message } = req.body;

    if (!pseudonym || confessionId === undefined || !message) {
        return res.status(400).json({ error: "Pseudonym, confessionId, and message are required" });
    }

    try {
        const tx = confessionContract.methods.commentOnConfession(pseudonym, confessionId, message);
        const gas = await tx.estimateGas({ from: sender });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data,
                gas,
                gasPrice
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ success: true, transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
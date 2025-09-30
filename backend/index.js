require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(bodyParser.json());

// ----------------------
// Configuración DB local
// ----------------------
const db = new sqlite3.Database("./access.db");
db.run(`CREATE TABLE IF NOT EXISTS access_log (
    address TEXT,
    timestamp TEXT,
    status TEXT,
    event TEXT
)`);

// ----------------------
// Configuración blockchain
// ----------------------
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`
);

const contractABI = [
  "function hasAccess(address user) external view returns(bool)",
  "event AccessGranted(address indexed user, address indexed grantedBy)",
  "event AccessRevoked(address indexed user, address indexed revokedBy)"
];

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// ----------------------
// Gestión de nonces
// ----------------------
let nonces = {};

app.get("/nonce", (req, res) => {
    const { address } = req.query;
    if (!address) return res.status(400).json({ error: "Address missing" });

    const nonce = Math.floor(Math.random() * 1000000).toString();
    nonces[address.toLowerCase()] = nonce;
    res.json({ nonce });
});

// ----------------------
// Verificación de acceso
// ----------------------
app.post("/verify", async (req, res) => {
    const { address, signature } = req.body;
    if (!address || !signature) return res.status(400).json({ error: "Missing fields" });

    const nonce = nonces[address.toLowerCase()];
    if (!nonce) return res.status(400).json({ error: "Nonce not found" });

    try {
        // Verifica firma
        const recoveredAddress = ethers.utils.verifyMessage(nonce, signature);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ status: "Access Denied" });
        }

        // Consulta contrato seguro
        const access = await contract.hasAccess(address);
        const status = access ? "Access Granted" : "Access Denied";

        // Guardar log en DB
        const event = status === "Access Granted" ? "login_success" : "login_fail";
        db.run(
            "INSERT INTO access_log (address, timestamp, status, event) VALUES (?, datetime('now'), ?, ?)",
            [address, status, event]
        );

        res.json({ status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Verification failed" });
    }
});

// ----------------------
// Escuchar eventos del contrato
// ----------------------
contract.on("AccessGranted", (user, grantedBy) => {
    db.run(
        "INSERT INTO access_log (address, timestamp, status, event) VALUES (?, datetime('now'), ?, ?)",
        [user, "Access Granted", "AccessGrantedEvent"]
    );
    console.log(`AccessGranted event: ${user} by ${grantedBy}`);
});

contract.on("AccessRevoked", (user, revokedBy) => {
    db.run(
        "INSERT INTO access_log (address, timestamp, status, event) VALUES (?, datetime('now'), ?, ?)",
        [user, "Access Revoked", "AccessRevokedEvent"]
    );
    console.log(`AccessRevoked event: ${user} by ${revokedBy}`);
});

// ----------------------
// Iniciar servidor
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

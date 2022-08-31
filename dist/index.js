"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keypair_1 = require("./lib/keypair");
const express_1 = __importDefault(require("express"));
const web3_js_1 = require("@solana/web3.js");
const dotenv = __importStar(require("dotenv"));
const zod_1 = require("zod");
const token_1 = require("./lib/token");
dotenv.config();
if (!process.env.PRIVATE_KEY || !process.env.TOKEN_PUBLIC_KEY) {
    throw new Error("Private key not found");
}
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"), "confirmed");
const keypair = (0, keypair_1.getKeyPair)(process.env.PRIVATE_KEY);
(async function () {
    try {
        // await requestAirDrop(connection, keypair, 2);
    }
    catch (e) {
        console.log(e);
    }
})();
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.post("/mint", async (req, res) => {
    const schema = zod_1.z.object({
        amount: zod_1.z.number().positive(),
        address: zod_1.z.string().min(43).max(44),
    });
    try {
        schema.parse(req.body);
    }
    catch (e) {
        res.status(401).json({ error: "Invalid request parameters" }).end();
    }
    await (0, token_1.mintToken)({
        connection,
        payer: keypair,
        mintAuthority: keypair,
        amount: 1,
        token: new web3_js_1.PublicKey(process.env.TOKEN_PUBLIC_KEY),
        solAddress: new web3_js_1.PublicKey(req.body.address),
    });
    res
        .json({
        message: "Minted 1 PIKAKASUKMADIQUECOIN successfully",
    })
        .end();
});
server.listen(8080);

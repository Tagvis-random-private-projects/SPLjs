"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAirDrop = void 0;
const web3_js_1 = require("@solana/web3.js");
async function requestAirDrop(connection, keypair, solAmount) {
    const airdropSignature = await connection.requestAirdrop(keypair.publicKey, web3_js_1.LAMPORTS_PER_SOL * solAmount);
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature: airdropSignature,
    });
}
exports.requestAirDrop = requestAirDrop;

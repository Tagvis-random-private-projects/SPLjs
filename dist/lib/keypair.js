"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyPair = void 0;
const web3_js_1 = require("@solana/web3.js");
function getPrivateKey(privateKey) {
    return Uint8Array.from(privateKey
        .slice(1, -1)
        .split(",")
        .map((n) => Number(n.trim())));
}
function getKeyPair(privateKey) {
    return web3_js_1.Keypair.fromSecretKey(getPrivateKey(privateKey));
}
exports.getKeyPair = getKeyPair;

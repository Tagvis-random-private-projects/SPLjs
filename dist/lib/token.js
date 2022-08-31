"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateHolderAccount = exports.mintToken = exports.createToken = void 0;
const spl_token_1 = require("@solana/spl-token");
async function createToken(params) {
    const { connection, payer, mintAuthority, freezeAuthority } = params;
    return await (0, spl_token_1.createMint)(connection, payer, mintAuthority, freezeAuthority, 9);
}
exports.createToken = createToken;
async function mintToken(params) {
    const { connection, payer, mintAuthority, amount, token, solAddress } = params;
    const { address: destination } = await getOrCreateHolderAccount({
        connection,
        payer,
        token,
        for: solAddress,
    });
    await (0, spl_token_1.mintTo)(connection, payer, token, destination, mintAuthority, 10_000_000_000 * amount);
}
exports.mintToken = mintToken;
async function getOrCreateHolderAccount(params) {
    const { connection, payer, token, for: owner } = params;
    return await (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, payer, token, owner);
}
exports.getOrCreateHolderAccount = getOrCreateHolderAccount;

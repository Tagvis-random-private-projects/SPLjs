import { Connection, PublicKey, Signer } from "@solana/web3.js";
declare type CreateTokenParams = {
    connection: Connection;
    payer: Signer;
    mintAuthority: PublicKey;
    freezeAuthority: PublicKey;
};
export declare function createToken(params: CreateTokenParams): Promise<PublicKey>;
declare type MintTokenParams = {
    connection: Connection;
    payer: Signer;
    mintAuthority: Signer;
    amount: number;
    token: PublicKey;
    solAddress: PublicKey;
};
export declare function mintToken(params: MintTokenParams): Promise<void>;
declare type createHolderAccountParams = {
    connection: Connection;
    payer: Signer;
    token: PublicKey;
    for: PublicKey;
};
export declare function getOrCreateHolderAccount(params: createHolderAccountParams): Promise<import("@solana/spl-token").Account>;
export {};

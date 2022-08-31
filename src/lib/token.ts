import { Connection, PublicKey, Signer } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";

type CreateTokenParams = {
  connection: Connection;
  payer: Signer;
  mintAuthority: PublicKey;
  freezeAuthority: PublicKey;
};
export async function createToken(params: CreateTokenParams) {
  const { connection, payer, mintAuthority, freezeAuthority } = params;
  return await createMint(connection, payer, mintAuthority, freezeAuthority, 9);
}

type MintTokenParams = {
  connection: Connection;
  payer: Signer;
  mintAuthority: Signer;
  amount: number;
  token: PublicKey;
  solAddress: PublicKey;
};
export async function mintToken(params: MintTokenParams) {
  const { connection, payer, mintAuthority, amount, token, solAddress } =
    params;
  const { address: destination } = await getOrCreateHolderAccount({
    connection,
    payer,
    token,
    for: solAddress,
  });
  await mintTo(
    connection,
    payer,
    token,
    destination,
    mintAuthority,
    10_000_000_000 * amount
  );
  return destination;
}
type createHolderAccountParams = {
  connection: Connection;
  payer: Signer;
  token: PublicKey;
  for: PublicKey;
};
export async function getOrCreateHolderAccount(
  params: createHolderAccountParams
) {
  const { connection, payer, token, for: owner } = params;
  return await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    token,
    owner
  );
}

import { Keypair } from "@solana/web3.js";

function getPrivateKey(privateKey: string) {
  return Uint8Array.from(
    privateKey
      .slice(1, -1)
      .split(",")
      .map((n) => Number(n.trim()))
  );
}
export function getKeyPair(privateKey: string) {
  return Keypair.fromSecretKey(getPrivateKey(privateKey));
}

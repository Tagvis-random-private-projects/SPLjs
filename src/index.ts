import { getKeyPair } from "./lib/keypair";
import express from "express";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import * as dotenv from "dotenv";
import { z } from "zod";
import { mintToken } from "./lib/token";

if (!process.env.PRIVATE_KEY || !process.env.TOKEN_PUBLIC_KEY) {
  throw new Error("Private key not found");
}

const server = express();
dotenv.config();
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const keypair = getKeyPair(process.env.PRIVATE_KEY);

server.use(express.json());
server.post("/mint", async (req, res) => {
  if (!isValidRequest(req)) {
    return res.status(401).json({ error: "Invalid request parameters" });
  }
  await mintToken({
    connection,
    payer: keypair,
    mintAuthority: keypair,
    amount: 1,
    token: new PublicKey(process.env.TOKEN_PUBLIC_KEY!),
    solAddress: new PublicKey(req.body.address),
  });
  res
    .json({
      message: `Minted ${req.body.amount} testCoin successfully`,
    })
    .end();
});

export function isValidRequest(req: any): boolean {
  const schema = z.object({
    amount: z.number().positive(),
    address: z.string().min(43).max(44),
  });
  try {
    schema.parse(req.body);
  } catch (e) {
    return false;
  }
  return true;
}
server.listen(8080);

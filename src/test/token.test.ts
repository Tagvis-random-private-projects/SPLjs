import { createToken, mintToken } from "../lib/token";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { requestAirDrop } from "../lib/airDrop";
import { getAccount } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const keyPair = Keypair.generate();
jest.setTimeout(10000);

describe("Token stuff", () => {
  // Airdrop some sol
  beforeAll(async () => {
    await requestAirDrop({
      connection,
      address: keyPair.publicKey,
      solAmount: 2,
    });
  });
  test("Creates a token", async () => {
    const token = await createToken({
      connection,
      payer: keyPair,
      mintAuthority: keyPair.publicKey,
      freezeAuthority: keyPair.publicKey,
    });
    expect(token).toBeDefined();
  });
  test("Mints some tokens", async () => {
    const token = await createToken({
      connection,
      payer: keyPair,
      mintAuthority: keyPair.publicKey,
      freezeAuthority: keyPair.publicKey,
    });
    const address = await mintToken({
      payer: keyPair,
      mintAuthority: keyPair,
      amount: 2,
      connection,
      solAddress: keyPair.publicKey,
      token,
    });
    expect(
      Number((await getAccount(connection, address)).amount) / 10_000_000_000
    ).toBe(2);
  });
});

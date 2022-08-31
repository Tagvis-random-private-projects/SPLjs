import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

type Params = { connection: Connection; address: PublicKey; solAmount: number };
export async function requestAirDrop({
  connection,
  address,
  solAmount,
}: Params) {
  const signature = await connection.requestAirdrop(
    address,
    LAMPORTS_PER_SOL * solAmount
  );
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature,
  });
}

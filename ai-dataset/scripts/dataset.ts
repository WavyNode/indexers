import { ethers } from "ethers";
import * as dotenv from "dotenv";
import supabase from "./supabase";
import { stringify } from "csv-stringify/sync";
import { writeFileSync } from "fs";
import type { ITx, IAddress, IDataset } from "./data-set.type";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const FINAL_BLOCK = 184504605; 
const BLOCK_RANGE = 2000; 

const IGNORED_WALLETS = new Set([
    "0x00000000000000000000000000000000000A4B05",
    "0x5E0b746e3Ad0911Bad831f7b24a0149B5A0F0FFb"
]);

async function getTransactions(address: string): Promise<ITx[]> {
    if (IGNORED_WALLETS.has(address)) return [];

    try {
        const latestBlock = await provider.getBlockNumber();
        let currentBlock = latestBlock;
        const txs: ITx[] = [];

        while (currentBlock > 0) {
            const fromBlock = Math.max(currentBlock - BLOCK_RANGE, 0);

            const logs = await provider.getLogs({
                fromBlock,
                toBlock: currentBlock,
                address: address,
            });

            for (const log of logs) {
                const tx = await provider.getTransaction(log.transactionHash);
                if (!tx || tx.blockNumber === undefined) continue;

                const block = await provider.getBlock(tx.blockNumber);
                if (!block) continue;

                txs.push({
                    txHash: tx.hash,
                    block: block.number,
                    timestamp: block.timestamp,
                    amount: ethers.utils.formatEther(tx.value || "0"),
                    from: tx.from,
                    to: tx.to || "0x0000000000000000000000000000000000000000",
                });
            }

            currentBlock = fromBlock - 1;
        }

        return txs;
    } catch (error) {
        console.error(`Error en ${address}:`, error);
        return [];
    }
}

function saveToCSV(dataset: IDataset) {
    try {
        const records = dataset.addresses.flatMap(address =>
            address.txs.map(tx => ({
                address: address.address,
                type: address.type,
                txHash: tx.txHash,
                block: tx.block,
                timestamp: tx.timestamp,
                amount: tx.amount,
                from: tx.from,
                to: tx.to
            }))
        );

        if (records.length === 0) return;

        const csv = stringify(records, { header: true });
        writeFileSync("dataset.csv", csv);
    } catch (error) {
        console.error("❌ Error al guardar CSV:", error);
    }
}

(async () => {
    const { data: addresses, error } = await supabase.from("cleanwallet").select("from_address");

    if (error || !addresses || addresses.length === 0) return;

    const filteredAddresses = addresses.filter(({ from_address }) => !IGNORED_WALLETS.has(from_address));

    const formattedAddresses: IAddress[] = await Promise.all(
        filteredAddresses.map(async ({ from_address }) => ({
            address: from_address,
            type: "clean",
            txs: await getTransactions(from_address)
        }))
    );

    saveToCSV({ addresses: formattedAddresses });
})();

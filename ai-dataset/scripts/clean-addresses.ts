import { ethers } from "ethers";
import * as dotenv from "dotenv";
import supabase from "./supabase";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function getLatestBlock() {
    
    const latestBlockNumber = await provider.getBlockNumber();
    const block = await provider.getBlockWithTransactions(latestBlockNumber);

    console.log (`xD bloque actual: ${block.number}`)
    return block;
}

async function getAddressesFromBlock() {
    const block = await getLatestBlock();
    if (!block || !block.transactions || block.transactions.length === 0) return[];

    const validTransactions= block.transactions.filter(tx => tx?.from && tx?.to);

    const first10Addresses = validTransactions.slice(0, 20).map(tx =>({
        form:tx.from,
        to:tx.to
    }));
    
    console.log("Primeras transaciones con from y to:", first10Addresses);
    return first10Addresses;    
}
getAddressesFromBlock();
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import supabase from "./supabase";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function getLatestBlock() {
    const latestBlockNumber = await provider.getBlockNumber();
    return provider.getBlockWithTransactions(latestBlockNumber);
}

async function getAddressesFromBlock() {
    const block = await getLatestBlock();
    if (!block || !block.transactions) return [];

    return block.transactions
        .filter(tx => tx.from && tx.to)
        .slice(0, 50)
        .map(tx => ({ from: tx.from, to: tx.to || "0x0000000000000000000000000000000000000000" }));
}

async function getBlacklistedAddresses(addresses: { from: string; to: string }[]) {
    const blacklistTables = ["ofac", "events", "eventstornado", "tornado"];
    const blacklisted = new Set<string>();

    await Promise.all(
        blacklistTables.map(async table => {
            const { data } = await supabase.from(table).select("address").in("address", addresses.map(a => a.from));
            data?.forEach(record => blacklisted.add(record.address));
        })
    );
    
    return addresses.filter(a => !blacklisted.has(a.from));
}

async function saveCleanAddresses(addresses: { from: string; to: string }[]) {
    if (addresses.length < 50) return;

    for (const { from, to } of addresses) {
        const { data: existing } = await supabase.from("cleanwallet").select("from_address, to_address").eq("from_address", from).eq("to_address", to).single();
        if (existing) continue;
        await supabase.from("cleanwallet").insert([{ from_address: from, to_address: to }]);
    }
}

(async function processBlocks() {
    let cleanAddresses: { from: string; to: string }[] = [];
    while (cleanAddresses.length < 50) {
        const addresses = await getAddressesFromBlock();
        const filteredAddresses = await getBlacklistedAddresses(addresses);
        cleanAddresses = [...new Set([...cleanAddresses, ...filteredAddresses])];
    }
    await saveCleanAddresses(cleanAddresses);
    console.log("🔥🥵 cleanAddresses");
})();

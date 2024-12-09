const ethers = require("ethers");
const supabase = require("./supabase");
const { tornadocashAbi } = require("./abis/tornado");
const { usdcAbi } = require("./abis/usdc");
const { usdtAbi } = require("./abis/usdt");

// Usar la dirección actualizada para USDC
const usdcMainnetAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
const usdtMainnetAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const tornadoArbEth1Address = "0xd47438C816c9E7f2E2888E060936a499Af9582b3";

const mainnetProvider = new ethers.providers.JsonRpcProvider(
  "https://arb-rpc.wavynode.com"
);

const insertInBatches = async (data, batchSize = 100) => {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    console.log(
      `Inserting batch ${i / batchSize + 1} of ${Math.ceil(
        data.length / batchSize
      )}`
    );
    const { error } = await supabase.from("eventstornado").insert(batch);

    if (error) {
      console.error(
        `Error inserting batch ${i / batchSize + 1}:`,
        error.message
      );
      throw error;
    }
  }
  console.log("All batches inserted successfully!");
};

const queryEvents = async ({
  contractName,
  provider,
  event,
  contractAddress,
  abi,
}) => {
  let addresses = [];

  try {
    const contractInstance = new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    const block = await provider.getBlock("latest");

    const events = await contractInstance.queryFilter(
      event,
      200000,
      block.number
    );

    for (let log of events) {
      try {
        const blockData = await provider.getBlock(log.blockNumber);

        if (!blockData) {
          console.warn(`Block data is null for event: ${log.transactionHash}`);
          continue;
        }

        const { transactionHash, args } = log;
        const timestamp = blockData.timestamp;

        const address = args?.[0] || "N/A";
        const amount = args?.value?.toString() || "0";

        console.log(`[${contractName}]: ${event} event ${transactionHash}`);
        addresses.push({
          contract: contractName,
          address: address,
          timestamp: timestamp || "N/A",
          tx_hash: transactionHash,
          amount: amount,
          block_number: log.blockNumber,
        });
      } catch (innerError) {
        console.error(`Error processing event: ${innerError.message}`);
      }
    }
  } catch (error) {
    console.error(`Error querying events: ${error.message}`);
  }

  return addresses;
};

const main = async () => {
  console.log("Main started...");
  try {
    const [
      tornadoDepositAddresses,
      tornadoWithdrawalAddresses,
      usdcAddresses,
      usdtAddresses,
    ] = await Promise.all([
      queryEvents({
        contractName: "tornado",
        provider: mainnetProvider,
        event: "Deposit",
        contractAddress: tornadoArbEth1Address,
        abi: tornadocashAbi,
      }),
      queryEvents({
        contractName: "tornado",
        provider: mainnetProvider,
        event: "Withdrawal",
        contractAddress: tornadoArbEth1Address,
        abi: tornadocashAbi,
      }),
      queryEvents({
        contractName: "usdc",
        provider: mainnetProvider,
        event: "Blacklisted",
        contractAddress: usdcMainnetAddress,
        abi: usdcAbi,
      }),
      queryEvents({
        contractName: "usdt",
        provider: mainnetProvider,
        event: "AddedBlackList",
        contractAddress: usdtMainnetAddress,
        abi: usdtAbi,
      }),
    ]);

    console.log({
      tornadoDeposit: tornadoDepositAddresses.length,
      tornadoWithdrawal: tornadoWithdrawalAddresses.length,
      usdcAddresses: usdcAddresses.length,
      usdtAddresses: usdtAddresses.length,
    });

    console.log("Inserting to db...");

    await insertInBatches([
      ...tornadoDepositAddresses,
      ...tornadoWithdrawalAddresses,
      ...usdcAddresses,
      ...usdtAddresses,
    ]);

    console.log("Success!");
  } catch (error) {
    console.error(error);
  }
};

main();

const { ethers } = require("ethers");
const supabase = require("./supabase");
const { usdcAbi } = require("./abis/usdc");

const provider = new ethers.providers.JsonRpcProvider(
  "https://arb-rpc.wavynode.com"
);

// Updated USDC contract information
const usdcContract = {
  abi: usdcAbi,
  address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  events: ["Blacklisted", "UnBlacklisted"],
};

const endBlock = 283082491;
const chainId = 42161;

async function queryUSDCEvents(contractAddress) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      usdcContract.abi,
      provider
    );
    const events = usdcContract.events;
    let latestProcessedBlock = endBlock;

    for (const eventName of events) {
      try {
        const eventFilter = contract.filters[eventName]();
        console.log(
          `Searching for ${eventName} events from genesis block to block ${endBlock}...`
        );

        const queriedEvents = await contract.queryFilter(
          eventFilter,
          0,
          endBlock
        );
        console.log(
          `Found ${queriedEvents.length} ${eventName} events up to block ${endBlock}.`
        );

        if (queriedEvents.length > 0) {
          const customData = queriedEvents.map((event) => ({
            chain_id: chainId,
            contract: contractAddress,
            event_type: eventName,
            address: event.args?._account || null,
            tx_hash: event.transactionHash,
            block: event.blockNumber,
            timestamp: new Date(),
            amount: event.args?._amount || null,
          }));

          await saveToSupabaseInBatches(customData);
        }
      } catch (error) {
        console.error(`Error querying ${eventName} events: ${error.message}`);
      }
    }

    // Continue monitoring new blocks after the target block
    provider.on("block", async (blockNumber) => {
      console.log(`New block detected: ${blockNumber}`);
      for (const eventName of events) {
        try {
          const eventFilter = contract.filters[eventName]();
          const queriedEvents = await contract.queryFilter(
            eventFilter,
            latestProcessedBlock + 1,
            blockNumber
          );
          console.log(
            `Found ${queriedEvents.length} new ${eventName} events from block ${
              latestProcessedBlock + 1
            } to block ${blockNumber}.`
          );

          if (queriedEvents.length > 0) {
            const customData = queriedEvents.map((event) => ({
              chain_id: chainId,
              contract: contractAddress,
              event_type: eventName,
              address: event.args?._account || null,
              tx_hash: event.transactionHash,
              block: event.blockNumber,
              timestamp: new Date(), // Adjust if you can fetch exact block timestamp
              amount: event.args?._amount || null, // Adjust based on your event ABI
            }));

            await saveToSupabaseInBatches(customData);
            latestProcessedBlock = blockNumber;
          }
        } catch (error) {
          console.error(
            `Error querying new ${eventName} events: ${error.message}`
          );
        }
      }
    });
  } catch (error) {
    console.error(
      `Error querying events for USDC (${contractAddress}): ${error.message}`
    );
  }
}

// Save events to Supabase in batches
async function saveToSupabaseInBatches(data, batchSize = 100) {
  const validData = validateData(data);
  if (!validData.length) {
    console.log("No valid data to insert.");
    return;
  }

  for (let i = 0; i < validData.length; i += batchSize) {
    const batch = validData.slice(i, i + batchSize);
    console.log(
      `Inserting batch ${i / batchSize + 1} of ${Math.ceil(
        validData.length / batchSize
      )} into the events table...`
    );
    try {
      const { error } = await supabase.from("events").insert(batch);
      if (error) {
        console.error("Error inserting batch:", error.message);
        console.error("Failed batch data:", batch);
      } else {
        console.log("Batch inserted successfully!");
      }
    } catch (error) {
      console.error("Unexpected error inserting batch:", error.message);
    }
  }
}

// Validate data before insertion
function validateData(data) {
  return data.filter((item) => {
    if (
      !item.chain_id ||
      !item.contract ||
      !item.event_type ||
      !item.tx_hash ||
      !item.block ||
      !item.timestamp
    ) {
      console.error("Invalid data found:", item);
      return false;
    }
    return true;
  });
}

// Run for the USDC contract
queryUSDCEvents(usdcContract.address);

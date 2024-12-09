const { ethers } = require("ethers");
const supabase = require("./supabase");
const { usdtAbi } = require("./abis/usdt");

// Configuración del proveedor para Arbitrum
const provider = new ethers.providers.JsonRpcProvider(
  "https://arb-rpc.wavynode.com"
);

// Dirección del contrato USDT en Arbitrum
const usdtContract = {
  abi: usdtAbi,
  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // Dirección del contrato USDT
  events: ["AddedBlackList", "RemovedBlackList"], // Eventos relacionados con la lista negra
};

const endBlock = 283082491; // Bloque final para la búsqueda inicial

async function queryUSDTEvents(contractAddress) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      usdtContract.abi,
      provider
    );
    const events = usdtContract.events;
    let latestProcessedBlock = endBlock;

    // Buscar eventos desde el bloque génesis hasta el bloque objetivo
    for (const eventName of events) {
      try {
        const eventFilter = contract.filters[eventName]();
        console.log(
          `Buscando eventos ${eventName} desde el bloque génesis hasta el bloque ${endBlock}...`
        );

        const queriedEvents = await contract.queryFilter(
          eventFilter,
          0,
          endBlock
        );
        console.log(
          `Se encontraron ${queriedEvents.length} eventos de ${eventName} hasta el bloque ${endBlock}.`
        );

        if (queriedEvents.length > 0) {
          const customData = queriedEvents.map((event) => ({
            contract: contractAddress,
            eventType: eventName,
            account: event.args?._user || null,
            txHash: event.transactionHash,
            block: event.blockNumber,
          }));

          await saveToSupabaseInBatches(customData);
        }
      } catch (error) {
        console.error(
          `Error al consultar eventos ${eventName}: ${error.message}`
        );
      }
    }

    // Continuar escuchando nuevos bloques después del bloque objetivo
    provider.on("block", async (blockNumber) => {
      console.log(`Nuevo bloque detectado: ${blockNumber}`);
      for (const eventName of events) {
        try {
          const eventFilter = contract.filters[eventName]();
          const queriedEvents = await contract.queryFilter(
            eventFilter,
            latestProcessedBlock + 1,
            blockNumber
          );
          console.log(
            `Se encontraron ${
              queriedEvents.length
            } nuevos eventos de ${eventName} desde el bloque ${
              latestProcessedBlock + 1
            } hasta el bloque ${blockNumber}.`
          );

          if (queriedEvents.length > 0) {
            const customData = queriedEvents.map((event) => ({
              contract: contractAddress,
              eventType: eventName,
              account: event.args?._user || null,
              txHash: event.transactionHash,
              block: event.blockNumber,
            }));

            await saveToSupabaseInBatches(customData);
            latestProcessedBlock = blockNumber; // Actualizar el último bloque procesado
          }
        } catch (error) {
          console.error(
            `Error al consultar nuevos eventos ${eventName}: ${error.message}`
          );
        }
      }
    });
  } catch (error) {
    console.error(
      `Error al consultar eventos para USDT (${contractAddress}): ${error.message}`
    );
  }
}

// Guardar eventos en Supabase por lotes
async function saveToSupabaseInBatches(data, batchSize = 100) {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    console.log(
      `Insertando lote ${i / batchSize + 1} de ${Math.ceil(
        data.length / batchSize
      )} en la tabla eventstornado...`
    );
    try {
      const { error } = await supabase.from("eventstornado").insert(batch);
      if (error) {
        console.error("Error al insertar lote:", error.message);
      } else {
        console.log("¡Lote insertado exitosamente!");
      }
    } catch (error) {
      console.error("Error inesperado al insertar lote:", error.message);
    }
  }
}

// Ejecutar la consulta de eventos para el contrato de USDT
queryUSDTEvents(usdtContract.address);

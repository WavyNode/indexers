const { ethers } = require("ethers");
const supabase = require("./supabase");
const { usdcAbi } = require("./abis/usdc");

const provider = new ethers.providers.JsonRpcProvider(
  "https://arb-rpc.wavynode.com"
);

// Dirección del contrato USDC actualizada
const usdcContract = {
  abi: usdcAbi,
  address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  events: ["Blacklisted", "UnBlacklisted"],
};

const endBlock = 283082491; // Bloque final para la búsqueda inicial

async function queryUSDCEvents(contractAddress) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      usdcContract.abi,
      provider
    );
    const events = usdcContract.events;
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
            account: event.args?._account || null,
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
              account: event.args?._account || null,
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
      `Error al consultar eventos para USDC (${contractAddress}): ${error.message}`
    );
  }
}

// Guardar eventos en Supabase por lotes
async function saveToSupabaseInBatches(data, batchSize = 100) {
  const validData = validateData(data);
  if (!validData.length) {
    console.log("No hay datos válidos para insertar.");
    return;
  }

  for (let i = 0; i < validData.length; i += batchSize) {
    const batch = validData.slice(i, i + batchSize);
    console.log(
      `Insertando lote ${i / batchSize + 1} de ${Math.ceil(
        validData.length / batchSize
      )} en la tabla eventstornado...`
    );
    try {
      const { error } = await supabase.from("eventstornado").insert(batch);
      if (error) {
        console.error("Error al insertar lote:", error.message);
        console.error("Datos del lote fallido:", batch);
      } else {
        console.log("¡Lote insertado exitosamente!");
      }
    } catch (error) {
      console.error("Error inesperado al insertar lote:", error.message);
    }
  }
}

// Validar datos antes de la inserción
function validateData(data) {
  return data.filter((item) => {
    if (!item.contract || !item.eventType || !item.txHash || !item.block) {
      console.error("Datos inválidos encontrados:", item);
      return false;
    }
    return true;
  });
}

// Ejecutar para el contrato de USDC
queryUSDCEvents(usdcContract.address);

const { ethers } = require("ethers");
const supabase = require("./supabase");
const { tornadocashAbi } = require("./abis/tornado");
const { usdcAbi } = require("./abis/usdc");
const { usdtAbi } = require("./abis/usdt");

// Configuración de contratos y eventos
const contracts = {
  TornadoCash: {
    abi: tornadocashAbi,
    addresses: {
      eth01: "0x84443CFd09A48AF6eF360C6976C5392aC5023a1F",
      eth1: "0xd47438C816c9E7f2E2888E060936a499Af9582b3",
      eth10: "0x330bdFADE01eE9bF63C209Ee33102DD334618e0a",
      eth100: "0x1E34A77868E19A6647b1f2F47B51ed72dEDE95DD",
    },
    events: ["Deposit", "Withdrawal"],
  },
  USDC: {
    abi: usdcAbi,
    addresses: {
      mainnet: "0xA0b86991C6218B36c1d19D4a2e9Eb0cE3606eB48",
    },
    events: ["Blacklisted"],
  },
  USDT: {
    abi: usdtAbi,
    addresses: {
      mainnet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    },
    events: ["AddedBlackList"],
  },
};

// Proveedor RPC
const provider = new ethers.providers.JsonRpcProvider(
  "https://arb-rpc.wavynode.com"
);

// Crear filtros de eventos
function createEventFilter(contract, eventName) {
  try {
    return contract.filters[eventName]();
  } catch (error) {
    console.error(`Error creando filtro para el evento ${eventName}:`, error);
    throw error;
  }
}

// Consultar eventos por rango de bloques
async function queryEventsInRange(
  contract,
  eventFilter,
  fromBlock,
  toBlock,
  step = 5000
) {
  const events = [];
  for (let start = fromBlock; start <= toBlock; start += step) {
    const end = Math.min(start + step - 1, toBlock);
    console.log(`Obteniendo eventos desde el bloque ${start} hasta ${end}`);
    try {
      const partialEvents = await contract.queryFilter(eventFilter, start, end);
      if (partialEvents.length > 0) {
        console.log(
          `Se encontraron ${partialEvents.length} eventos en el rango ${start}-${end}.`
        );
        events.push(...partialEvents);
      }
    } catch (error) {
      console.error(
        `Error al obtener eventos para el rango ${start}-${end}: ${error.message}`
      );
    }
  }
  return events;
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
      )}...`
    );
    try {
      const { error } = await supabase.from("custom_data").insert(batch);
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

// Consultar eventos por contrato y tipo de evento
async function queryEvents(contractAddress, contractAbi, eventName) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );
    const latestBlock = await provider.getBlockNumber();
    const eventFilter = createEventFilter(contract, eventName);

    // Buscar eventos desde el bloque 0 hasta el bloque más reciente
    const events = await queryEventsInRange(
      contract,
      eventFilter,
      0,
      latestBlock
    );

    console.log(
      `Se encontraron ${events.length} eventos de ${eventName} en toda la cadena.`
    );

    if (events.length > 0) {
      const customData = events.map((event) => ({
        contract: contractAddress,
        eventType: eventName,
        sender: event.args?.from || null,
        recipient: event.args?.to || null,
        amount: event.args?.value?.toString() || null,
        txHash: event.transactionHash,
        block: event.blockNumber,
      }));

      console.log("Datos preparados para insertar:", custom_data);

      // Guardar los eventos en Supabase
      await saveToSupabaseInBatches(custom_data);
    }
  } catch (error) {
    console.error(
      `Error al consultar eventos ${eventName} para ${contractAddress}: ${error.message}`
    );
  }
}

// Función principal
async function main() {
  try {
    console.log("Iniciando consulta de eventos...");
    for (const [contractName, contractData] of Object.entries(contracts)) {
      for (const [addressName, contractAddress] of Object.entries(
        contractData.addresses
      )) {
        for (const eventName of contractData.events) {
          console.log(
            `Consultando ${eventName} para ${contractName} (${addressName}) en toda la cadena...`
          );
          await queryEvents(contractAddress, contractData.abi, eventName);
        }
      }
    }
  } catch (error) {
    console.error("Error en la función principal:", error.message);
  }
}

// Manejadores globales de errores
process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error.message);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error.message);
});

// Iniciar el proceso
main();

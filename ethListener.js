const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider({
  url: "https://arb-rpc.wavynode.com",
  timeout: 60000,
  name: "arbitrum",
  chainId: 42161,
});

// Función para obtener un bloque con lógica de reintentos
async function getBlockWithRetries(
  provider,
  blockNumber,
  retries = 3,
  delay = 2000
) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(
        `Intentando obtener el bloque ${blockNumber}, intento ${i + 1}`
      );
      const block = await provider.getBlockWithTransactions(blockNumber);
      return block; // Retorna el bloque si la solicitud tiene éxito
    } catch (error) {
      console.error(
        `Error al obtener el bloque ${blockNumber} (intento ${
          i + 1
        } de ${retries}):`,
        error.message
      );
      if (i === retries - 1) throw error; // Si es el último intento, lanza el error
    }
    await new Promise((resolve) => setTimeout(resolve, delay)); // Espera antes de reintentar
  }
}

// Función para procesar un bloque
async function processBlock(blockNumber) {
  try {
    const block = await getBlockWithRetries(provider, blockNumber);
    console.log(
      `Procesando el bloque ${blockNumber} con ${block.transactions.length} transacciones`
    );

    // Procesa las transacciones del bloque
    block.transactions.forEach((tx) => {
      if (tx.value.gt(ethers.BigNumber.from(0))) {
        console.log(`Transacción confirmada:
          - Hash: ${tx.hash}
          - De: ${tx.from}
          - A: ${tx.to}
          - Cantidad de ETH: ${ethers.utils.formatEther(tx.value)}
        `);
      }
    });
  } catch (error) {
    console.error(`Error al procesar el bloque ${blockNumber}:`, error.message);
  }
}

// Escuchar nuevos bloques y procesarlos
provider.on("block", async (blockNumber) => {
  console.log(`Nuevo bloque detectado: ${blockNumber}`);
  await processBlock(blockNumber);
});

// Manejo de errores en el proveedor
provider.on("error", (error) => {
  console.error("Error en el proveedor JSON-RPC:", error.message);
});

// Manejador global para errores no capturados
process.on("uncaughtException", (error) => {
  console.error("Error no capturado:", error.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("Rechazo no manejado:", reason);
});

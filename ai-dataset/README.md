# AI-dataset | scripts
## Script para obtener las direcciones limpias
### Requisitos
- Mínimo 50 direcciones
- >5 txs
- Comparar cada dirección con nuestros registros

### Dónde guardar las direcciones
- Una tabla de test

## Script para jalar 1y de data de cada dirección
### Dónde guardar las direcciones
- Una tabla de test
- Un archivo csv

#### Esquema del dataset
```typescript
interface IDataset {
    addresses: IAddress[]
}

interface IAddress {
    address: string,
    type: 'clean' | 'dirty',
    txs: ITx[] // txs.lenght para saber cuántas tiene
}

interface ITx {
    txHash: string,
    block: number,
    timestamp: number,
    amount: string,
    from: string,
    to: string
}
```

```json
[
    {
        "address": "0x...",
        "type": "dirty",
        "txs": [
            {
                "txHash": "0x...",
                "block": 123,
                "timestamp" : 456,
                "amount": "0.2",
                "from": "0x...",
                "to": "0x..."
            },
            {
                "txHash": "0x...",
                "block": 123,
                "timestamp" : 456,
                "amount": "0.2",
                "from": "0x...",
                "to": "0x..."
            }
        ]
    },
    {
        "address": "0x...",
        "type": "clean",
        "txs": [
            {
                "txHash": "0x...",
                "block": 123,
                "timestamp" : 456,
                "amount": "0.2",
                "from": "0x...",
                "to": "0x..."
            },
            {
                "txHash": "0x...",
                "block": 123,
                "timestamp" : 456,
                "amount": "0.2",
                "from": "0x...",
                "to": "0x..."
            }
        ]
    }
]
```

## Flujo
![[diagrama de flujo]](diagram.png)

# Quickstart (bun.sh)
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.38. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

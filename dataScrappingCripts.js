  // @DEVELOPER: THIS SCRIPTS REQUIRE ETHERS JS LIBRARY VERSION 5.7.2 IN ORDER TO WORK.
  
  
  //////////////////////////////////////////////////////////
  //  ARBITRUM TORNADO CASH                              ///
  //////////////////////////////////////////////////////////

  //  TORNADO CASH DEPOSIT                               ///

  async function queryArbitrumTornadocashEth01DepositEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0x84443CFd09A48AF6eF360C6976C5392aC5023a1F";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Deposit", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      // console.log("INDEX: ", index);
      // eventsArray.push(events[index].args.to); 
      let txHash = events[index].transactionHash; 
      // console.log("TX_HASH: ", txHash);
      // console.log(txHash);

      const transaction = await arbitrumProvider.getTransaction(txHash);
      // console.log("TX");
      // console.log(transaction);
      const sender = transaction.from;
      // console.log("SENDER: ", sender);
    
      // Store the desired parameters in constants
      // const sender = transaction.from;

      // let senderAndHash = [sender, txHash];
      eventsArray.push(sender); 
    }

    // // console.log("EVENT:");
    // // console.log(events[0].event);
    // // console.log("ARGS:");
    // // console.log(events[0].args);

    console.log("ADDRESS ARRAY");
    console.log(eventsArray);

    // console.log(" ");
  }

  async function queryArbitrumTornadocashEth1DepositEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0xd47438C816c9E7f2E2888E060936a499Af9582b3";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Deposit", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      // console.log("INDEX: ", index);
      // eventsArray.push(events[index].args.to); 
      let txHash = events[index].transactionHash; 
      // console.log("TX_HASH: ", txHash);
      // console.log(txHash);

      const transaction = await arbitrumProvider.getTransaction(txHash);
      // console.log("TX");
      // console.log(transaction);
      const sender = transaction.from;
      // console.log("SENDER: ", sender);
    
      // Store the desired parameters in constants
      // const sender = transaction.from;

      // let senderAndHash = [sender, txHash];
      eventsArray.push(sender); 
    }

    // // console.log("EVENT:");
    // // console.log(events[0].event);
    // // console.log("ARGS:");
    // // console.log(events[0].args);

    console.log("ADDRESS ARRAY");
    console.log(eventsArray);

    // console.log(" ");
  }

  async function queryArbitrumTornadocashEth10DepositEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0x330bdFADE01eE9bF63C209Ee33102DD334618e0a";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Deposit", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      // console.log("INDEX: ", index);
      // eventsArray.push(events[index].args.to); 
      let txHash = events[index].transactionHash; 
      // console.log("TX_HASH: ", txHash);
      // console.log(txHash);

      const transaction = await arbitrumProvider.getTransaction(txHash);
      // console.log("TX");
      // console.log(transaction);
      const sender = transaction.from;
      // console.log("SENDER: ", sender);
    
      // Store the desired parameters in constants
      // const sender = transaction.from;

      // let senderAndHash = [sender, txHash];
      eventsArray.push(sender); 
    }

    // // console.log("EVENT:");
    // // console.log(events[0].event);
    // // console.log("ARGS:");
    // // console.log(events[0].args);

    console.log("ADDRESS ARRAY");
    console.log(eventsArray);

    // console.log(" ");
  }

  async function queryArbitrumTornadocashEth100DepositEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0x1E34A77868E19A6647b1f2F47B51ed72dEDE95DD";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH DEPOSIT EVENTS DATA SCRAPPING         ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Deposit", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      // console.log("INDEX: ", index);
      // eventsArray.push(events[index].args.to); 
      let txHash = events[index].transactionHash; 
      // console.log("TX_HASH: ", txHash);
      // console.log(txHash);

      const transaction = await arbitrumProvider.getTransaction(txHash);
      // console.log("TX");
      // console.log(transaction);
      const sender = transaction.from;
      // console.log("SENDER: ", sender);
    
      // Store the desired parameters in constants
      // const sender = transaction.from;

      // let senderAndHash = [sender, txHash];
      eventsArray.push(sender); 
    }

    // // console.log("EVENT:");
    // // console.log(events[0].event);
    // // console.log("ARGS:");
    // // console.log(events[0].args);

    console.log("ADDRESS ARRAY");
    console.log(eventsArray);

    // console.log(" ");
  }

  //  TORNADO CASH WITHDRAWAL                            ///

  async function queryArbitrumTornadocashEth01WithdrawalEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0x84443CFd09A48AF6eF360C6976C5392aC5023a1F";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Withdrawal", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      eventsArray.push(events[index].args.to);  
    }

    // console.log("EVENT:");
    // console.log(events[0].event);
    // console.log("ARGS:");
    // console.log(events[0].args);

    console.log("ADDRESS ARRAY:");
    console.log(eventsArray);

    console.log(" ");
  }

  async function queryArbitrumTornadocashEth1WithdrawalEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0xd47438C816c9E7f2E2888E060936a499Af9582b3";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Withdrawal", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      eventsArray.push(events[index].args.to);  
    }

    // console.log("EVENT:");
    // console.log(events[0].event);
    // console.log("ARGS:");
    // console.log(events[0].args);

    console.log("ADDRESS ARRAY:");
    console.log(eventsArray);

    console.log(" ");
  }

  async function queryArbitrumTornadocashEth10WithdrawalEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0x330bdFADE01eE9bF63C209Ee33102DD334618e0a";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Withdrawal", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      eventsArray.push(events[index].args.to);  
    }

    // console.log("EVENT:");
    // console.log(events[0].event);
    // console.log("ARGS:");
    // console.log(events[0].args);

    console.log("ADDRESS ARRAY:");
    console.log(eventsArray);

    console.log(" ");
  }

  async function queryArbitrumTornadocashEth100WithdrawalEvents()
  {
    //////////////////////////////////////////////////////////
    //  TORNADO CASH CONTRACT INTERACTION OBJECT SETUP     ///
    //////////////////////////////////////////////////////////
    const tornadocashArbitrumAddress = "0x1E34A77868E19A6647b1f2F47B51ed72dEDE95DD";

    let tornadocashAbi = [
      {
        "inputs": [
          {
            "internalType": "contract IVerifier",
            "name": "_verifier",
            "type": "address"
          },
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_denomination",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "_merkleTreeHeight",
            "type": "uint32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "leafIndex",
            "type": "uint32"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "nullifierHash",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "relayer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "FIELD_SIZE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ROOT_HISTORY_SIZE",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ZERO_VALUE",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "commitments",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentRootIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "denomination",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_commitment",
            "type": "bytes32"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "filledSubtrees",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLastRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IHasher",
            "name": "_hasher",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_left",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_right",
            "type": "bytes32"
          }
        ],
        "name": "hashLeftRight",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hasher",
        "outputs": [
          {
            "internalType": "contract IHasher",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          }
        ],
        "name": "isKnownRoot",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          }
        ],
        "name": "isSpent",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32[]",
            "name": "_nullifierHashes",
            "type": "bytes32[]"
          }
        ],
        "name": "isSpentArray",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "spent",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "levels",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextIndex",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "nullifierHashes",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "roots",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "verifier",
        "outputs": [
          {
            "internalType": "contract IVerifier",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_proof",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "_root",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "_nullifierHash",
            "type": "bytes32"
          },
          {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_relayer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_refund",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "zeros",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    let arbitrumProvider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/3188b3a12dcc4c7db1790ddbaee01150");
    let arbitrumTornadocashSmartContractInstance = new ethers.Contract(tornadocashArbitrumAddress, tornadocashAbi, arbitrumProvider);


    //////////////////////////////////////////////////////////
    //  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  TORNADO CASH WITHDRAWAL EVENTS DATA SCRAPPING      ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData:");
    console.log(block);
    console.log("actualBlockNumber:");
    console.log(block.number);
    console.log(" ");

    const events = await arbitrumTornadocashSmartContractInstance.queryFilter("Withdrawal", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);
    
    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      eventsArray.push(events[index].args.to);  
    }

    // console.log("EVENT:");
    // console.log(events[0].event);
    // console.log("ARGS:");
    // console.log(events[0].args);

    console.log("ADDRESS ARRAY:");
    console.log(eventsArray);

    console.log(" ");
  }

  //////////////////////////////////////////////////////////
  //  STABLECOINS BLACKLIST                              ///
  //////////////////////////////////////////////////////////

  async function queryMainnetUsdcEvents()
  {
    //////////////////////////////////////////////////////////
    //  USDC CONTRACT INTERACTION OBJECT SETUP             ///
    //////////////////////////////////////////////////////////
    const usdcMainnetAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

    let usdcAbi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "authorizer",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          }
        ],
        "name": "AuthorizationCanceled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "authorizer",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          }
        ],
        "name": "AuthorizationUsed",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_account",
            "type": "address"
          }
        ],
        "name": "Blacklisted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "newBlacklister",
            "type": "address"
          }
        ],
        "name": "BlacklisterChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "burner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Burn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "newMasterMinter",
            "type": "address"
          }
        ],
        "name": "MasterMinterChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "minter",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Mint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "minter",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "minterAllowedAmount",
            "type": "uint256"
          }
        ],
        "name": "MinterConfigured",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "oldMinter",
            "type": "address"
          }
        ],
        "name": "MinterRemoved",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Pause",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "newAddress",
            "type": "address"
          }
        ],
        "name": "PauserChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "newRescuer",
            "type": "address"
          }
        ],
        "name": "RescuerChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_account",
            "type": "address"
          }
        ],
        "name": "UnBlacklisted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Unpause",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "CANCEL_AUTHORIZATION_TYPEHASH",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "RECEIVE_WITH_AUTHORIZATION_TYPEHASH",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "authorizer",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          }
        ],
        "name": "authorizationState",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_account",
            "type": "address"
          }
        ],
        "name": "blacklist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "blacklister",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "authorizer",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "cancelAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "authorizer",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "name": "cancelAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "minter",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "minterAllowedAmount",
            "type": "uint256"
          }
        ],
        "name": "configureMinter",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currency",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "decrement",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "increment",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tokenSymbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tokenCurrency",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "tokenDecimals",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "newMasterMinter",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "newPauser",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "newBlacklister",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "newName",
            "type": "string"
          }
        ],
        "name": "initializeV2",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "lostAndFound",
            "type": "address"
          }
        ],
        "name": "initializeV2_1",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address[]",
            "name": "accountsToBlacklist",
            "type": "address[]"
          },
          {
            "internalType": "string",
            "name": "newSymbol",
            "type": "string"
          }
        ],
        "name": "initializeV2_2",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_account",
            "type": "address"
          }
        ],
        "name": "isBlacklisted",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "isMinter",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "masterMinter",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "minter",
            "type": "address"
          }
        ],
        "name": "minterAllowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "nonces",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "paused",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pauser",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validAfter",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validBefore",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "name": "receiveWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validAfter",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validBefore",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "receiveWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "minter",
            "type": "address"
          }
        ],
        "name": "removeMinter",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract IERC20",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "rescueERC20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "rescuer",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validAfter",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validBefore",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "name": "transferWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validAfter",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "validBefore",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "nonce",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "transferWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_account",
            "type": "address"
          }
        ],
        "name": "unBlacklist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_newBlacklister",
            "type": "address"
          }
        ],
        "name": "updateBlacklister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_newMasterMinter",
            "type": "address"
          }
        ],
        "name": "updateMasterMinter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_newPauser",
            "type": "address"
          }
        ],
        "name": "updatePauser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newRescuer",
            "type": "address"
          }
        ],
        "name": "updateRescuer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "version",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      }
    ];

    let mainnetProvider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/408559c55ba7479b9f3adee094af9d80");
    let mainnetUsdcSmartContractInstance = new ethers.Contract(usdcMainnetAddress, usdcAbi, mainnetProvider);


    //////////////////////////////////////////////////////////
    //  USDC EVENTS DATA SCRAPPING                         ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  USDC EVENTS DATA SCRAPPING                         ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData");
    console.log(block);
    console.log("actualBlockNumber");
    console.log(block.number);
    console.log(" ");

    const events = await mainnetUsdcSmartContractInstance.queryFilter("Blacklisted", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);

    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      eventsArray.push(events[index].args[0]);  
    }

    // console.log("EVENT:");
    // console.log(events[0].event);
    // console.log("ARGS:");
    // console.log(events[0].args);

    console.log("ADDRESS ARRAY:");
    console.log(eventsArray);

    console.log(" ");
  }

  async function queryMainnetUsdtEvents()
  {
    //////////////////////////////////////////////////////////
    //  USDT CONTRACT INTERACTION OBJECT SETUP             ///
    //////////////////////////////////////////////////////////
    const usdtMainnetAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    let usdtAbi = [
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_upgradedAddress",
            "type": "address"
          }
        ],
        "name": "deprecate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_spender",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "deprecated",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_evilUser",
            "type": "address"
          }
        ],
        "name": "addBlackList",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_from",
            "type": "address"
          },
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "upgradedAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "balances",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "maximumFee",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "_totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_maker",
            "type": "address"
          }
        ],
        "name": "getBlackListStatus",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "allowed",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "paused",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newBasisPoints",
            "type": "uint256"
          },
          {
            "name": "newMaxFee",
            "type": "uint256"
          }
        ],
        "name": "setParams",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "issue",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "redeem",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "_spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "name": "remaining",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "basisPointsRate",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "isBlackListed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_clearedUser",
            "type": "address"
          }
        ],
        "name": "removeBlackList",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "MAX_UINT",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_blackListedUser",
            "type": "address"
          }
        ],
        "name": "destroyBlackFunds",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_initialSupply",
            "type": "uint256"
          },
          {
            "name": "_name",
            "type": "string"
          },
          {
            "name": "_symbol",
            "type": "string"
          },
          {
            "name": "_decimals",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Issue",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Redeem",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "newAddress",
            "type": "address"
          }
        ],
        "name": "Deprecate",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "feeBasisPoints",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "maxFee",
            "type": "uint256"
          }
        ],
        "name": "Params",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_blackListedUser",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_balance",
            "type": "uint256"
          }
        ],
        "name": "DestroyedBlackFunds",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "AddedBlackList",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "RemovedBlackList",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Pause",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [],
        "name": "Unpause",
        "type": "event"
      }
    ];

    let mainnetProvider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/408559c55ba7479b9f3adee094af9d80");
    let mainnetUsdtSmartContractInstance = new ethers.Contract(usdtMainnetAddress, usdtAbi, mainnetProvider);


    //////////////////////////////////////////////////////////
    //  USDT EVENTS DATA SCRAPPING                         ///
    //////////////////////////////////////////////////////////

    console.log(" ");

    console.log("//////////////////////////////////////////////////////////");
    console.log("//  USDT EVENTS DATA SCRAPPING                         ///");
    console.log("//////////////////////////////////////////////////////////");

    console.log(" ");

    let block = await provider.getBlock("latest");
    console.log("actualBlockData");
    console.log(block);
    console.log("actualBlockNumber");
    console.log(block.number);
    console.log(" ");

    const events = await mainnetUsdtSmartContractInstance.queryFilter("AddedBlackList", 0, block.number);
    let length = events.length;
    let eventsArray = [];

    console.log("EVENT:");
    console.log(events[0].event);
    console.log(" ");

    console.log("txEvents:")
    console.log("Events length: ", events.length);
    console.log(events);

    console.log(" ");

    for (let index = 0; index < length; index++) 
    {
      eventsArray.push(events[index].args[0]);  
    }

    // console.log("EVENT:");
    // console.log(events[0].event);
    // console.log("ARGS:");
    // console.log(events[0].args);

    console.log("ADDRESS ARRAY:");
    console.log(eventsArray);

    console.log(" ");
  }
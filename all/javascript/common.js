

    window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                        // Request account access if needed
                        await ethereum.enable();
                        // Acccounts now exposed
                    web3.eth.sendTransaction({/* ... */});
                } catch (error) {
                    // User denied account access...
                }
            }
                // Legacy dapp browsers...
                else if (window.web3) {
                    window.web3 = new Web3(web3.currentProvider);
                // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }
            // Non-dapp browsers...
            else {

                alert('Install MetaMask Chrome Extension, read below for Instructions !!');
            }
        });

        var rentContract = web3.eth.contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "_status",
                "type": "bool"
            }
        ],
        "name": "approveTenant",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "confirmContract",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_email",
                "type": "string"
            },
            {
                "name": "_aadhaar",
                "type": "uint256"
            },
            {
                "name": "_sign",
                "type": "string"
            }
        ],
        "name": "createNewUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "feePayment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "governLogin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_lat",
                "type": "string"
            },
            {
                "name": "_lon",
                "type": "string"
            },
            {
                "name": "_sqFt",
                "type": "uint256"
            },
            {
                "name": "_rooms",
                "type": "uint256"
            },
            {
                "name": "_extra",
                "type": "string"
            },
            {
                "name": "_ipfs",
                "type": "string"
            }
        ],
        "name": "newDetails",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_add",
                "type": "string"
            },
            {
                "name": "_type",
                "type": "string"
            },
            {
                "name": "_timeMonths",
                "type": "uint256"
            },
            {
                "name": "_rent",
                "type": "uint256"
            },
            {
                "name": "_security",
                "type": "uint256"
            }
        ],
        "name": "newHome",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tenant",
                "type": "address"
            }
        ],
        "name": "registerParties",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "tenantLogin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            }
        ],
        "name": "startMessage",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "status",
                "type": "uint256"
            }
        ],
        "name": "registerParty",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "status",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "FeePayable",
                "type": "uint256"
            }
        ],
        "name": "registerHome",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "status",
                "type": "uint256"
            }
        ],
        "name": "registerDetails",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            }
        ],
        "name": "feePay",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "index",
                "type": "int256"
            }
        ],
        "name": "tenantLogs",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            }
        ],
        "name": "tenantApproves",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "array",
                "type": "int256[]"
            },
            {
                "indexed": false,
                "name": "arraySize",
                "type": "uint256"
            }
        ],
        "name": "govLogin",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            }
        ],
        "name": "confirmGovern",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "allHouses",
        "outputs": [
            {
                "name": "addressHouse",
                "type": "string"
            },
            {
                "name": "type_of_property",
                "type": "string"
            },
            {
                "name": "duration",
                "type": "uint256"
            },
            {
                "name": "rentAmount",
                "type": "uint256"
            },
            {
                "name": "securityFee",
                "type": "uint256"
            },
            {
                "name": "governFee",
                "type": "uint256"
            },
            {
                "name": "completed",
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
                "type": "uint256"
            }
        ],
        "name": "allOtherDetails",
        "outputs": [
            {
                "name": "time_of_deploy",
                "type": "uint256"
            },
            {
                "name": "latitude",
                "type": "string"
            },
            {
                "name": "longitude",
                "type": "string"
            },
            {
                "name": "ipfs_url",
                "type": "string"
            },
            {
                "name": "squareFootage",
                "type": "uint256"
            },
            {
                "name": "numberBedrooms",
                "type": "uint256"
            },
            {
                "name": "others",
                "type": "string"
            },
            {
                "name": "feePaid",
                "type": "bool"
            },
            {
                "name": "isValid",
                "type": "bool"
            },
            {
                "name": "completed",
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
                "type": "uint256"
            }
        ],
        "name": "allParties",
        "outputs": [
            {
                "name": "tenantApprove",
                "type": "bool"
            },
            {
                "name": "govApprove",
                "type": "bool"
            },
            {
                "name": "landlord",
                "type": "address"
            },
            {
                "name": "tenant",
                "type": "address"
            },
            {
                "name": "government",
                "type": "address"
            },
            {
                "name": "completed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]);

var rentInfo = rentContract.at('0x98906834bf09d94ab356ef5af7ba7ae184a3257e');

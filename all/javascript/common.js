    
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

                alert('Install MetaMask for using Charter Contracts ');
            }
        });

var rentContract = web3.eth.contract([
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
                "name": "sign",
                "type": "string"
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
                "name": "_rate",
                "type": "uint256"
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
        "inputs": [
            {
                "name": "_security",
                "type": "uint256"
            },
            {
                "name": "sign",
                "type": "string"
            }
        ],
        "name": "tenantAccept",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "tenantReject",
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
                "name": "str",
                "type": "string"
            }
        ],
        "name": "rejection",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "addressToPerson",
        "outputs": [
            {
                "name": "eth",
                "type": "address"
            },
            {
                "name": "legalName",
                "type": "string"
            },
            {
                "name": "email",
                "type": "string"
            },
            {
                "name": "aadhaar",
                "type": "uint256"
            },
            {
                "name": "sign",
                "type": "string"
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
        "name": "allChecks",
        "outputs": [
            {
                "name": "isValid",
                "type": "bool"
            },
            {
                "name": "registerFee",
                "type": "bool"
            },
            {
                "name": "securityfee",
                "type": "bool"
            },
            {
                "name": "time_of_deploy",
                "type": "uint256"
            },
            {
                "name": "end_date",
                "type": "uint256"
            },
            {
                "name": "rate",
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
            },
            {
                "name": "sign_landlord",
                "type": "string"
            },
            {
                "name": "sign_tenant",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tenantApproval1",
        "outputs": [
            {
                "name": "landlordName",
                "type": "string"
            },
            {
                "name": "landlordAadhaar",
                "type": "uint256"
            },
            {
                "name": "addressHouse",
                "type": "string"
            },
            {
                "name": "typeProperty",
                "type": "string"
            },
            {
                "name": "duration",
                "type": "uint256"
            },
            {
                "name": "rent",
                "type": "uint256"
            },
            {
                "name": "security",
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
        "name": "tenantApproval2",
        "outputs": [
            {
                "name": "registration",
                "type": "uint256"
            },
            {
                "name": "lat",
                "type": "string"
            },
            {
                "name": "long",
                "type": "string"
            },
            {
                "name": "sqFt",
                "type": "uint256"
            },
            {
                "name": "rooms",
                "type": "uint256"
            },
            {
                "name": "extra",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]);

var rentInfo = rentContract.at('0xb3df82b7696a8b95cf50151ab2dfec0d2ed7dfaa');
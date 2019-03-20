    
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
		"constant": true,
		"inputs": [],
		"name": "tenantData2",
		"outputs": [
			{
				"name": "security",
				"type": "uint256"
			},
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
		"constant": false,
		"inputs": [
			{
				"name": "_currentRate",
				"type": "uint256"
			}
		],
		"name": "tenantReject",
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
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "_currentRate",
				"type": "uint256"
			}
		],
		"name": "govReject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tenantData1",
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
				"name": "startEpoch",
				"type": "uint256"
			},
			{
				"name": "endEpoch",
				"type": "uint256"
			},
			{
				"name": "rent",
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
				"name": "_sign",
				"type": "string"
			},
			{
				"name": "_currentRate",
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
				"name": "signTerms",
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
		"name": "allParties",
		"outputs": [
			{
				"name": "landlord",
				"type": "address"
			},
			{
				"name": "tenant",
				"type": "address"
			},
			{
				"name": "signLandlord",
				"type": "string"
			},
			{
				"name": "signTenant",
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
				"name": "startEpoch",
				"type": "uint256"
			},
			{
				"name": "endEpoch",
				"type": "uint256"
			},
			{
				"name": "monthDuration",
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
				"name": "registerFee",
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
		"name": "allChecks",
		"outputs": [
			{
				"name": "isValid",
				"type": "bool"
			},
			{
				"name": "tenantApprove",
				"type": "bool"
			},
			{
				"name": "govApprove",
				"type": "bool"
			},
			{
				"name": "tenantCheck",
				"type": "bool"
			},
			{
				"name": "paidRegisterFee",
				"type": "bool"
			},
			{
				"name": "paidSecurityFee",
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
				"name": "_add",
				"type": "string"
			},
			{
				"name": "_type",
				"type": "string"
			},
			{
				"name": "_startEpoch",
				"type": "uint256"
			},
			{
				"name": "_endEpoch",
				"type": "uint256"
			},
			{
				"name": "_months",
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
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "_currentRate",
				"type": "uint256"
			}
		],
		"name": "govApproval",
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
				"name": "_sign",
				"type": "string"
			},
			{
				"name": "_currentRate",
				"type": "uint256"
			}
		],
		"name": "tenantAccept",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "govLogin",
		"outputs": [
			{
				"name": "message",
				"type": "string"
			},
			{
				"name": "array",
				"type": "uint256[]"
			},
			{
				"name": "size",
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
		"name": "getDetails",
		"outputs": [
			{
				"name": "_aadhaar",
				"type": "uint256"
			},
			{
				"name": "_owned",
				"type": "uint256[]"
			},
			{
				"name": "_rented",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
	}
]);

var rentInfo = rentContract.at('0xb30cdffde29a168ed01218499397337475f73ee1');


// ------------------------------------------------------------------

// getting the ETH - RATE HERE
var price;

var request = new XMLHttpRequest();
request.open('GET', "https://api.coinbase.com/v2/prices/ETH-INR/buy", true);

request.onload = function () {
    
    var data = JSON.parse(this.response);
    price = parseInt(data["data"]["amount"]);

    alert('\nThe current ETH vs INR Rate is,\n1 Ether - ' + (price) + " INR \n\nSource - Coinbase API");
}

request.send();
pragma solidity ^0.4.19;

contract Owned {

	address owner;

	function Owned() public {

		owner = msg.sender;
	}

	modifier onlyOwner() {

		require(msg.sender == owner);
		_;
	}
}

contract Rent is Owned {

	struct Person {

		address eth;
		string legalName;
		string email;
		uint aadhaar;

		string sign;
		
		uint[] myOwned;
		uint[] myRented;
	}

	struct Parties {

		bool tenantApprove;
		bool govApprove;

		address landlord;
		address tenant;
		address government;

		bool completed;

		string sign_landlord;
		string sign_tenant;
	}

	struct House {

		string addressHouse;
		string type_of_property;

		uint duration;
		uint rentAmount;

		uint securityFee;
		uint governFee; /// (also listed as registration fee)

		bool completed;
	}

	struct OtherDetails {

		string latitude;
		string longitude;
		string ipfs_url;

		uint squareFootage;
		uint numberBedrooms;

		string others;
		bool completed;
	}
	
	struct Checks {
		
		bool isValid;
		bool registerFee;
		bool securityFee;

		uint time_of_deploy;
		uint end_date;
	}
	
	uint private last_index;
	
	Parties[] public allParties; 
	House[] public allHouses;
	OtherDetails[] public allOtherDetails;
	Checks[] public allChecks;

	mapping(address => Person) public addressToPerson;
	mapping(address => bool) private checkUser;
	mapping(uint => bool) private checkAadhaar;
	
	mapping(address => uint) private landlordRegister;
	mapping(address => uint) private tenantSecurity;


	function Rent() public {

		checkUser[owner] = true;
		var govt = Person(owner, 'Government = Owner', 'Contact Government', 0, 'No Sign',  new uint[](0), new uint[](0));
		
		addressToPerson[owner] = govt;
		
		last_index = 0;
	}

	// --------------------------------------------------------------------------------------------------------------------------------

	event startMessage(string message);

	function createNewUser(string _name, string _email, uint _aadhaar, string _sign) external {

		if((checkUser[msg.sender] == true)||(checkAadhaar[_aadhaar] == true))
		{
			startMessage('Failed !! User already registered..');
		}

		else if((checkUser[msg.sender] != true)&&(checkAadhaar[_aadhaar] != true))
		{
			var newUser = Person(msg.sender, _name, _email, _aadhaar, _sign, new uint[](0), new uint[](0));
			addressToPerson[msg.sender] = newUser;

			checkUser[msg.sender] = true;
			checkAadhaar[_aadhaar] = true;

			startMessage('Welcome !! Successfully registered..');
		}
	}
}

	
	
	
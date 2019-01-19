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
		uint governFee;

		bool completed;
	}

	struct OtherDetails {

		uint time_of_deploy;

		string latitude;
		string longitude;

		string ipfs_url;

		uint squareFootage;
		uint numberBedrooms;

		string others;

		bool feePaid;

		bool isValid;	
		bool completed;
	}


	Parties[] public allParties; 
	House[] public allHouses;
	OtherDetails[] public allOtherDetails;

	mapping(address => Person) public addressToPerson;
	mapping(address => bool) private checkUser;
	mapping(uint => bool) private checkAadhaar;

	// -------------------------------------------------------------------------------------------------------

	function Rent() public {

		checkUser[owner] = true;
	}

	// -------------------------------------------------------------------------------------------------------

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

	// -------------------------------------------------------------------------------------------------------

	event registerParty(string message, uint status);

	function registerParties(address _tenant) external 	{

		require(msg.sender != _tenant);

		if(checkUser[msg.sender] == true)
		{
			if(checkUser[_tenant] == true)
			{
				var newParty = Parties(false, false, msg.sender, _tenant, owner, true, 'N/A', 'N/A');
				var index = allParties.push(newParty) - 1;

				var newHouse = House('N/A', 'N/A', 0, 0, 0, 0, false);
				allHouses.push(newHouse);

				var newRent = OtherDetails(now, 'N/A', 'N/A', 'N/A', 0, 0, 'N/A', false, false, false);
				allOtherDetails.push(newRent);

				var user = addressToPerson[msg.sender];
				user.myOwned.push(index);

				var tenant = addressToPerson[_tenant];
				tenant.myRented.push(index);

				registerParty('Step 1 Completed - Proceed to Step 2 to enter Contract Details', 1);
			}

			else
			{
				registerParty('Failed !! Tenant not registered', 0);
			}
		}

		else
		{
			registerParty('Failed !! Landlord not registered', 0);
		}
	}


	// --------		

	event registerHome(string message, uint status, uint FeePayable);

	function newHome(string _add, string _type, uint _timeMonths, uint _rent, uint _security) external {

		if(checkUser[msg.sender] == true)
		{
			var user = addressToPerson[msg.sender];

			uint index = user.myOwned.length - 1;

			if(index < 0)
			{
				registerHome('Failed !! Complete  Step - 1 before this Step', 0, 0);
			}

			else
			{
				var houseOwner = allParties[index];

				if(houseOwner.landlord != msg.sender)
				{
					registerHome('Failed !! User not registered as landlord..', 0, 0);
				}

				else
				{
					uint lastIndex = user.myOwned[index];

					var home = allHouses[lastIndex];

					if(home.completed == false)
					{
						home.addressHouse = _add;
						home.type_of_property = _type;
						home.duration = _timeMonths;
						home.rentAmount = _rent;
						home.securityFee = _security;

						if(_timeMonths <= 0)
						{
							home.completed = false;
							registerHome('Failed !! Minimum Contract Duration allowed is 1 Month', 0, 0);
						}

						else if(_timeMonths < 12)
						{
							home.governFee = 100;
							home.completed = true;

							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);
						}

						else if(_timeMonths <= 60)
						{
							if(_security > 0)
							home.governFee = 100 + ((2 * 12 * _rent) / 100) + 1100;

							else
							home.governFee = ((2 * 12 * _rent) / 100) + 1100;

							home.completed = true;

							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);
						}

						else if(_timeMonths <= 120)
						{
							if(_security > 0)
							home.governFee = 100 + ((3 * 12 * _rent) / 100) + 1100;

							else
							home.governFee = ((3 * 12 * _rent) / 100) + 1100;		

							home.completed = true;	

							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);			
						}

						else if(_timeMonths <= 240)
						{
							if(_security > 0)
							home.governFee = 100 + ((6 * 12 * _rent) / 100) + 1100;

							else
							home.governFee = ((6 * 12 * _rent) / 100) + 1100;

							home.completed = true;

							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);
						}

						else
						{
							home.completed = false;
							registerHome('Failed !! Maximum Contract Duration allowed is 20 Years or 24 Months', 0, 0);
						}
					}

					else
					{
						registerHome('Failed !! Home Registration already Completed ', 0, 0);
					}
				}

			}
		}

		else
		{
			registerHome('Failed !! Lessor or Landlord not registered !!', 0, 0);
		}
	}


	// -------------

	event registerDetails(string message, uint status);

	function newDetails(string _lat, string _lon, uint _sqFt, uint _rooms, string _extra, string _ipfs) external {

		if(checkUser[msg.sender] == true)
		{
			var user = addressToPerson[msg.sender];

			uint index = user.myOwned.length - 1;

			if(index < 0)
			{
				registerDetails('Failed !! Complete all the previous steps', 0);
			}

			else
			{
				var houseOwner = allParties[index];

				if(houseOwner.landlord != msg.sender)
				{
					registerDetails('Failed !! User not registered as landlord..', 0);
				}

				else
				{
					uint lastIndex = user.myOwned[index];

					var details = allOtherDetails[lastIndex];
					var home = allHouses[lastIndex];

					if(home.completed == false)
					{
						registerDetails('Failed !! Complete Step 2 before proceeding to Step 3', 0);
					}

					else if((details.completed == false)&&(home.completed == true))
					{
						details.time_of_deploy = now;
						details.latitude = _lat;
						details.longitude = _lon;
						details.squareFootage = _sqFt;
						details.numberBedrooms = _rooms;
						details.others = _extra;

						details.ipfs_url = _ipfs;

						details.isValid = false;
						details.completed = true;

						registerDetails('Step 3 Completed, pay Registration Fee Below', 1);
					}

					else
					{
						registerDetails('Failed !! Home Registration already Completed', 0);
					}
				}

			}
		}

		else
		{
			registerDetails('Failed !! Lessor or Landlord not registered !!', 0);
		}
	}

	// ----------------

	event feePay(string message);

	function feePayment(uint _amount, string sign) external payable	{

		require(msg.value == _amount);
		
		if(checkUser[msg.sender] == true)
		{
		    var user = addressToPerson[msg.sender];

		    uint index = user.myOwned.length - 1;
		    var details = allOtherDetails[index];
		    var house = allHouses[index];
		    var party = allParties[index];

		    if((details.completed == true)&&(house.completed == true)&&(party.completed == true))
		    {

			user = addressToPerson[msg.sender];
			details.feePaid = true;
			party.sign_landlord = sign;

			feePay('Government Registration Fee Payment Successful');
		    }

		    else 
		    {
			    feePay('Complete all the Steps given above before Fee Payment');
		    }
		}
		
		else
		{
		    feePay("Failed !! User not Registered..");
		}
	}

	// --------------------------------------------------------------------------------------------------------

	function tenantApproval1() view external returns( 
	
	    string landlordName,
		uint landlordAadhaar,

		string addressHouse,
		string typeProperty,
		uint duration,
		uint rent,
		uint security,
		uint registration) {

		if(checkUser[msg.sender] == true)
		{
			var t = addressToPerson[msg.sender];

			uint index = t.myRented.length - 1;

			if(index < 0)
			{
				return ('N/A', 0, 'N/A','N/A', 0, 0, 0, 0);
			}

			else
			{
				var party = allParties[index];
				var house = allHouses[index];
				var details = allOtherDetails[index];

				require((party.completed == true)&&(house.completed == true)&&(details.completed == true));

				address landowner = party.landlord;
				var land = addressToPerson[landowner];

				return(land.legalName, land.aadhaar, house.addressHouse, house.type_of_property, house.duration, house.rentAmount, house.securityFee, 
				house.governFee);
			}
		}

		else
		{
			return('N/A', 0, 'N/A', 'N/A', 0, 0, 0, 0);
		}
	}

	function tenantApproval2() view external returns( 
	
		string lat,
		string long,
		uint sqFt,
		uint rooms,
		string extra ){

		if(checkUser[msg.sender] == true)
		{
			var t = addressToPerson[msg.sender];

			uint index = t.myRented.length - 1;

			if(index < 0)
			{
				return ('N/A', 'N/A', 0, 0, 'N/A');
			}

			else
			{
				var party = allParties[index];
				var house = allHouses[index];
				var details = allOtherDetails[index];

				require((party.completed == true)&&(house.completed == true)&&(details.completed == true));

				return(details.latitude, details.longitude, details.squareFootage, details.numberBedrooms, details.others);
			}
		}

		else
		{
			return('N/A', 'N/A', 0, 0, 'N/A');
		}
	}



	function tenantReject() external {


	}

	function tenantAccept(uint _security, string sign) external payable {



	}

}
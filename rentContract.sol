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

	struct Person { // General Details of all Users

		address eth;
		string legalName;
		string email;
		uint aadhaar;

		uint[] myContractIndex;
	}

	struct Parties {

		bool tenantApprove;
		bool govApprove;

		address landlord;
		address tenant;
		address government;

		bool completed;
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

		string apiLink;

		uint squareFootage;
		uint numberBedrooms;

		string others;

		bool isValid;	

		bool completed;
	}


	Parties[] public allParties; 
	// ensure you reserve the SAME index for all 3 once the allParties is added, to prevent misMatch
	House[] public allHouses;
	OtherDetails[] public allOtherDetails;

	mapping(address => Person) private addressToPerson;
	mapping(address => bool) private checkUser;

	// -------------------------------------------------------------------------------------------------------

	function start() external view returns(bool) {

		if(checkUser[msg.sender] == false)
		return false;

		else
		return true;
	}

	// -------------------------------------------------------------------------------------------------------

	event startMessage(string message);

	function createNewUser(string _name, string _email, uint _aadhaar) external {

		if(checkUser[msg.sender] == true)
		{
			startMessage('Oops !! User already exists..');
		}		

		else
		{
			var newUser = Person(msg.sender, _name, _email, _aadhaar, new uint[](0));
			addressToPerson[msg.sender] = newUser;

			checkUser[msg.sender] = true;

			startMessage('Welcome !! You are successfully registered..');
		}
	}

	// -------------------------------------------------------------------------------------------------------

	event registerParty(string message);

	function registerParties(address _tenant) external 	{

		if(checkUser[msg.sender] == true)
		{
			if(checkUser[_tenant] == true)
			{
				var newParty = Parties(false, false, msg.sender, _tenant, owner, true);
				var index = allParties.push(newParty) - 1;

				var newHouse = House('N/A', 'N/A', 0, 0, 0, 0, false);
				allHouses.push(newHouse);

				var newRent = OtherDetails(now, 'N/A', 0, 0, 'N/A', false, false);
				allOtherDetails.push(newRent);

				var user = addressToPerson[msg.sender];
				user.myContractIndex.push(index);

				var tenant = addressToPerson[_tenant];
				tenant.myContractIndex.push(index);

				registerParty('Step 1 Completed - Proceed to Step 2 to Register Contract Details');
			}

			else
			{
				registerParty('Failed !! Lessee or Tenant not registered');
			}
		}

		else
		{
			registerParty('Failed !! Lessor or Landlord not registered');
		}
	}


	// --------		

	event registerHome(string message);

	function newHome(string _add, string _type, uint _timeMonths, uint _rent, uint _security) external {

		if(checkUser[msg.sender] == true)
		{
			var user = addressToPerson[msg.sender];

			uint index = user.myContractIndex.length - 1;

			if(index < 0)
			{
				registerHome('Failed !! Complete Registration of Parties before this Step');
			}

			else
			{
				uint lastIndex = user.myContractIndex[index];

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
						registerHome('Failed !! Minimum Contract Duration allowed is 1 Month');
						home.completed = false;
					}

					else if(_timeMonths < 12)
					{
						home.governFee = 100;
						home.completed = true;

						registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process');
					}

					else if(_timeMonths <= 60)
					{
						if(_security > 0)
						home.governFee = 100 + ((2 * 12 * _rent) / 100) + 1100;

						else
						home.governFee = ((2 * 12 * _rent) / 100) + 1100;

						home.completed = true;

						registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process');
					}

					else if(_timeMonths <= 120)
					{
						if(_security > 0)
						home.governFee = 100 + ((3 * 12 * _rent) / 100) + 1100;

						else
						home.governFee = ((3 * 12 * _rent) / 100) + 1100;		

						home.completed = true;	

						registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process');			
					}

					else if(_timeMonths <= 240)
					{
						if(_security > 0)
						home.governFee = 100 + ((6 * 12 * _rent) / 100) + 1100;

						else
						home.governFee = ((6 * 12 * _rent) / 100) + 1100;

						home.completed = true;

						registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process');
					}

					else
					{
						registerHome('Failed !! Maximum Contract Duration allowed is 20 Years or 24 Months');
						home.completed = false;

						registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process');
					}
				}

				else
				{
					registerHome('Failed !! Home Registration already Completed ');
				}

			}
		}

		else
		{
			registerHome('Failed !! Lessor or Landlord not registered !!');
		}

	}


	
}
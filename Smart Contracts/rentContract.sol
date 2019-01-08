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

		string latitude;
		string longitude;

		string ipfs_url;

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
	mapping(uint => bool) private checkAadhaar;

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

		if((checkUser[msg.sender] == true)||(checkAadhaar[_aadhaar] == true))
		{
			startMessage('Failed !! User already registered..');
		}

		else if((checkUser[msg.sender] != true)&&(checkAadhaar[_aadhaar] != true))
		{
			var newUser = Person(msg.sender, _name, _email, _aadhaar, new uint[](0));
			addressToPerson[msg.sender] = newUser;

			checkUser[msg.sender] = true;
			checkAadhaar[_aadhaar] = true;

			startMessage('Welcome !! Successfully registered..');
		}
	}

	// -------------------------------------------------------------------------------------------------------

	event registerParty(string message, uint status);

	function registerParties(address _tenant) external 	{

		if(checkUser[msg.sender] == true)
		{
			if(checkUser[_tenant] == true)
			{
				var newParty = Parties(false, false, msg.sender, _tenant, owner, true);
				var index = allParties.push(newParty) - 1;

				var newHouse = House('N/A', 'N/A', 0, 0, 0, 0, false);
				allHouses.push(newHouse);

				var newRent = OtherDetails(now, 'N/A', 'N/A', 'N/A' 0, 0, 'N/A', false, false);
				allOtherDetails.push(newRent);

				var user = addressToPerson[msg.sender];
				user.myContractIndex.push(index);

				var tenant = addressToPerson[_tenant];
				tenant.myContractIndex.push(index);

				registerParty('Step 1 Completed - Proceed to Step 2 to Register Contract Details', 1);
			}

			else
			{
				registerParty('Failed !! Lessee or Tenant not registered', 0);
			}
		}

		else
		{
			registerParty('Failed !! Lessor or Landlord not registered', 0);
		}
	}


	// --------		

	event registerHome(string message, uint status, uint FeePayable);

	function newHome(string _add, string _type, uint _timeMonths, uint _rent, uint _security) external {

		if(checkUser[msg.sender] == true)
		{
			var user = addressToPerson[msg.sender];

			uint index = user.myContractIndex.length - 1;

			if(index < 0)
			{
				registerHome('Failed !! Complete Registration of Parties before this Step', 0, 0);
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

	function newDetails(uint _ethInr, string _lat, string _lon, uint _sqFt, uint _rooms, string _extra, string _ipfs) external payable {

		// _ethInr is the API Value of rate of 1 ether in INR

		if(checkUser[msg.sender] == true)
		{
			var user = addressToPerson[msg.sender];

			uint index = user.myContractIndex.length - 1;

			if(index < 0)
			{
				registerDetails('Failed !! Complete all the previous steps', 0);
			}

			else
			{
				var houseOwner = allParties[index];
				var houseDetails = allHouses[index];

				if(houseOwner.landlord != msg.sender)
				{
					registerDetails('Failed !! User not registered as landlord..', 0);
				}

				else
				{
					require(msg.value == (houseDetails.governFee / _ethInr));
					owner.transfer(address(this).balance);

					uint lastIndex = user.myContractIndex[index];

					var details = allOtherDetails[lastIndex];

					if(details.completed == false)
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

						registerDetails('Step 3 Completed, Tenant and Government Verification Pending...', 1);
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

	// --------------------------------------------------------------------------------------------------------

	
}
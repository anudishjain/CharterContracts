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
		bool securityfee;

		uint time_of_deploy;
		uint end_date;
	}


	Parties[] public allParties; 
	House[] public allHouses;
	OtherDetails[] public allOtherDetails;
	Checks[] public allChecks;

	mapping(address => Person) public addressToPerson;
	mapping(address => bool) private checkUser;
	mapping(uint => bool) private checkAadhaar;
	
	mapping(address => uint) private landlordRegister;
	mapping(address => uint) private tenantSecurity;

	// -------------------------------------------------------------------------------------------------------

	function Rent() public {

		checkUser[owner] = true;
		var govt = Person(owner, 'Government = Owner', 'Contact Government', 0, 'No Sign',  new uint[](0), new uint[](0));
		
		addressToPerson[owner] = govt;
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

				var newRent = OtherDetails('N/A', 'N/A', 'N/A', 0, 0, 'N/A', false);
				allOtherDetails.push(newRent);
				
				var newExtras = Checks(false, false, false, now, 0);
				allChecks.push(newExtras);

				var user = addressToPerson[msg.sender];
				user.myOwned.push(index);

				var tenant = addressToPerson[_tenant];
				tenant.myRented.push(index);
				
				tenantSecurity[_tenant] = 0;
				landlordRegister[msg.sender] = 0;

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

			uint num = user.myOwned.length - 1;
			
			if(num < 0)
			{
				registerHome('Failed !! Complete  Step - 1 before this Step', 0, 0);
			}
			
			else
			{
				uint index = user.myOwned[num];
				var houseOwner = allParties[index];

				if(houseOwner.landlord != msg.sender)
				{
					registerHome('Failed !! User not registered as landlord..', 0, 0);
				}

				else
				{
					var home = allHouses[index];

					if(home.completed == false)
					{
						home.addressHouse = _add;
						home.type_of_property = _type;
						home.duration = _timeMonths;
						home.rentAmount = _rent;
						home.securityFee = _security;
						
						var _tenant = allParties[index].tenant; 
						

						if(_timeMonths <= 0)
						{
							home.completed = false;
							registerHome('Failed !! Minimum Contract Duration allowed is 1 Month', 0, 0);
						}

						else if(_timeMonths < 12)
						{
							home.governFee = 100;
							home.completed = true;
							
						    tenantSecurity[_tenant] = _security;
				            landlordRegister[msg.sender] = home.governFee;

							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);
						}

						else if(_timeMonths <= 60)
						{
							if(_security > 0)
							home.governFee = 100 + ((2 * 12 * _rent) / 100) + 1100;

							else
							home.governFee = ((2 * 12 * _rent) / 100) + 1100;

							home.completed = true;
							
						    tenantSecurity[_tenant] = _security;
				            landlordRegister[msg.sender] = home.governFee;
				            
							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);
						}

						else if(_timeMonths <= 120)
						{
							if(_security > 0)
							home.governFee = 100 + ((3 * 12 * _rent) / 100) + 1100;

							else
							home.governFee = ((3 * 12 * _rent) / 100) + 1100;		

							home.completed = true;

						    tenantSecurity[_tenant] = _security;
				            landlordRegister[msg.sender] = home.governFee;

							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);			
						}

						else if(_timeMonths <= 240)
						{
							if(_security > 0)
							home.governFee = 100 + ((6 * 12 * _rent) / 100) + 1100;

							else
							home.governFee = ((6 * 12 * _rent) / 100) + 1100;

							home.completed = true;

						    tenantSecurity[_tenant] = _security;
				            landlordRegister[msg.sender] = home.governFee;

							registerHome('Step 2 Completed - Proceed to Step 3 to Complete the Process', 1, home.governFee);
						}

						else
						{
							home.completed = false;
							registerHome('Failed !! Maximum Contract Duration allowed is 20 Years or 240 Months', 0, 0);
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
	

	function newDetails(string _lat, string _lon, uint _sqFt, uint _rooms, string _extra) external {
		
		if(checkUser[msg.sender] == true)
		{
			var user = addressToPerson[msg.sender];
			uint num = user.myOwned.length - 1;
			
			if(num < 0)
			{
				registerDetails('Failed !! Complete all the previous steps', 0);
			}

			else
			{
				uint index = user.myOwned[num];
				var houseOwner = allParties[index];

				if(houseOwner.landlord != msg.sender)
				{
					registerDetails('Failed !! User not registered as landlord..', 0);
				}

				else
				{
					var details = allOtherDetails[index];
					var home = allHouses[index];

					if(home.completed == false)
					{
						registerDetails('Failed !! Complete Step 2 before proceeding to Step 3', 0);
					}

					else if((details.completed == false)&&(home.completed == true))
					{
						details.latitude = _lat;
						details.longitude = _lon;
						details.squareFootage = _sqFt;
						details.numberBedrooms = _rooms;
						
						details.others = _extra;
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

	function feePayment(uint _currentRate, string sign) external payable {
		
		require(msg.value == (landlordRegister[msg.sender] * (10^18)/_currentRate));
		
		if(checkUser[msg.sender] == true)
		{
			var user = addressToPerson[msg.sender];

			uint num = user.myOwned.length - 1;
			
			if(num < 0)
			{
				feePay('Complete all the Steps given above before Fee Payment !!');
			}
			
			else
			{
				
				uint index = user.myOwned[num];
				var details = allOtherDetails[index];
				var house = allHouses[index];
				var party = allParties[index];
				var checks = allChecks[index];

				if((details.completed == true)&&(house.completed == true)&&(party.completed == true))
				{
					user = addressToPerson[msg.sender];
					checks.registerFee = true;
					party.sign_landlord = sign;

					feePay('Government Registration Fee Payment Successful');
				}

				else 
				{
					feePay('Complete all the Steps given above before Fee Payment');
				}
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
		uint security) 
	{

		if(checkUser[msg.sender] == true)
		{
			var t = addressToPerson[msg.sender];

			uint num = t.myRented.length - 1;
			
			if(num < 0)
			{
				return('No New Contracts', 0, 'No New Contracts', 'No New Contracts', 0, 0, 0);
			}

			else
			{
				uint index = t.myRented[num];
				
				var party = allParties[index];
				var house = allHouses[index];
				var details = allOtherDetails[index];
				var checks = allChecks[index];
        
                if((party.tenantApprove == true)||(checks.time_of_deploy == 0))
				{
				    return('No New Contracts', 0, 'No New Contracts', 'No New Contracts', 0, 0, 0);
				}
    
				else if((party.completed == true)&&(house.completed == true)&&(details.completed == true)&&(checks.registerFee = true))
				{
					address landowner = party.landlord;
					var land = addressToPerson[landowner];

					return(land.legalName, land.aadhaar, house.addressHouse, house.type_of_property, house.duration, house.rentAmount, 
						house.securityFee);
				}
			}
		}

		else
		{
			return('No New Contracts', 0, 'No New Contracts', 'No New Contracts', 0, 0, 0);
		}
	}

	function tenantApproval2() view external returns( 
		
		uint registration,
		string lat,
		string long,
		uint sqFt,
		uint rooms,
		string extra )
	{

		if(checkUser[msg.sender] == true)
		{
			var t = addressToPerson[msg.sender];

			uint num = t.myRented.length - 1;
			
			if(num < 0)
			{
				return(0, 'No New Contracts', 'No New Contracts', 0, 0, 'No New Contracts');
			}

			else
			{
				uint index = t.myRented[num];
				
				var party = allParties[index];
				var house = allHouses[index];
				var details = allOtherDetails[index];
				var checks = allChecks[index];
				
				if((party.tenantApprove == true)||(checks.time_of_deploy == 0))
				{
				    return(0, 'No New Contracts', 'No New Contracts', 0, 0, 'No New Contracts');
				}

				else if((party.completed == true)&&(house.completed == true)&&(details.completed == true))
				{
				    return(house.governFee, details.latitude, details.longitude, details.squareFootage, 
				    details.numberBedrooms, details.others);
				}
			}
		}

		else
		{
			return(0, 'No New Contracts', 'No New Contracts', 0, 0, 'No New Contracts');
		}
	}


	event rejection(string str);

	function tenantReject(uint _currentRate) external {

		if(checkUser[msg.sender] == true)
		{
			var t = addressToPerson[msg.sender];

			uint num = t.myRented.length - 1;
			uint index = t.myRented[num];

			var party = allParties[index];
			var house = allHouses[index];
			var details = allOtherDetails[index];
			var checks = allChecks[index];

			if((party.completed == true)&&(house.completed == true)&&(details.completed == true)&&(checks.time_of_deploy > 0)&&(party.tenantApprove == false))
			{
				party.tenantApprove = false;
				checks.isValid = false;
				checks.time_of_deploy = 0;
				
				var landowner = party.landlord; // return the registration fee back to the landlord after rejection
				landowner.transfer(house.governFee/_currentRate);
				
				rejection("Contract Rejected, Inform Landlord to draft New Contract..");
			}
			
			else if(party.tenantApprove == true)
			{
			    rejection("Contract already Approved, Government Verification pending.."); 
			}
			
			else
			{
				rejection("Contract already Rejected, Inform Landlord to draft New Contract");    
			}
		}

		else
		{
			rejection("You are not registered on Charter. Join Today..");
		}
	}


	function tenantAccept(string _sign, uint _currentRate) external payable {

		require(msg.value == (tenantSecurity[msg.sender] * (10^18)/_currentRate));
		
		if(checkUser[msg.sender] == true)
		{
		    var t = addressToPerson[msg.sender];
		    uint num = t.myRented.length - 1;
		    uint index = t.myRented[num];
		    var party = allParties[index];
		    var house = allHouses[index];
		    var details = allOtherDetails[index];
		    var checks = allChecks[index];
		    
		    if(checks.time_of_deploy == 0)
		    {
		        rejection('Contarct already Rejected ! Contact Landlord to draft New Contract');
		    }
		    
			else if((party.completed == true)&&(house.completed == true)&&(details.completed == true)&&(party.tenantApprove == false))
			{
				party.tenantApprove = true;
				checks.isValid = false;
				checks.time_of_deploy = now;
				
				party.sign_tenant = _sign;
				
				rejection("Contract Approved, Government Verification Pending..");
			}
			
			else if(party.tenantApprove == true)
			{
				rejection("Contract already Approved, kindly wait for Government Verification");    
			}
		}

		else
		{
			rejection("You are not registered on Charter. Join Today..");
		}
		
	}

}
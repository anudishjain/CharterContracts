pragma solidity ^0.4.19;
import "./Charter.sol";

contract PastContracts is Rent {
    
    function landlordPast() view external returns(uint[] array, uint size) {
			
		if(checkUser[msg.sender] == true)
		{
			var landlord = addressToPerson[msg.sender];
			return(landlord.myOwned, landlord.myOwned.length);
		}		
	}


	function tenantPast() view external returns(uint[] array, uint size) {
			
		if(checkUser[msg.sender] == true)
		{
			var tenant = addressToPerson[msg.sender];
			return(tenant.myRented, tenant.myRented.length);
		}		
	}
    
}
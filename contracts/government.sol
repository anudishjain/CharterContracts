
function govLogin() view external onlyOwner returns(string message, uint[] array, uint size) {
		
		var len = allParties.length;
		uint[] memory indexes = new uint[](len);
		
		if(last_index + 1 <= allParties.length)
		{
			uint num = 0;
			
			for(uint i = last_index ; i < allParties.length ; i++)
			{
				var party = allParties[i];
				var home = allHouses[i];
				var detail = allOtherDetails[i];
				var checks = allChecks[i];
				
				if((party.completed == true)&&(home.completed == true)&&(detail.completed == true)&&(checks.registerFee == true)&&
					(checks.securityFee == true)&&(party.tenantApprove == true)&&(checks.time_of_deploy > 0)&&(party.govApprove == false))
				{
					indexes[num] = i;
					num++;
				}
			}
			
			last_index = allParties.length;
			return('Following Contracts have their Verification Pending', array, num);
		}
		
		else
		return('Done for Today.. No Pending Verifications', array, 0);
		
	}
	
	
	function govApproval(uint i, uint _currentRate) external onlyOwner {
		
		require(i < allParties.length);
		
		var party = allParties[i];
		var home = allHouses[i];
		var detail = allOtherDetails[i];
		var checks = allChecks[i];
		
		if((party.completed == true)&&(home.completed == true)&&(detail.completed == true)&&(checks.registerFee == true)&&
			(checks.securityFee == true)&&(party.tenantApprove == true)&&(checks.time_of_deploy > 0))
		{
			party.govApprove = true; // government approves
			checks.isValid = true; // marked as valid
			
			owner.transfer(home.governFee/_currentRate);
			
			checks.time_of_deploy = now;
			checks.end_date = now + ((home.duration) * 4 weeks); /// months * 4 weeks
		}
	}
	
	function govReject(uint i, uint _currentRate) external onlyOwner {
	    
		require(i < allParties.length);
		
		var party = allParties[i];
		var home = allHouses[i];
		var detail = allOtherDetails[i];
		var checks = allChecks[i];
		
		if((party.completed == true)&&(home.completed == true)&&(detail.completed == true)&&(checks.registerFee == true)&&
			(checks.securityFee == true)&&(party.tenantApprove == true)&&(checks.time_of_deploy > 0))
		{
			party.govApprove = false; // government approves
			checks.isValid = false; // marked as valid

			var _tenant = party.tenant;
			var _landlord = party.landlord;
			
			_landlord.transfer(home.governFee/_currentRate);
			_tenant.transfer(home.securityFee/_currentRate); // refund the Registration Fee and Security Deposit back to parties

			party.completed = false;
			home.completed = false;
			detail.completed = false;
			
			checks.time_of_deploy = 0;
			checks.end_date = 0;
		}	    
	}
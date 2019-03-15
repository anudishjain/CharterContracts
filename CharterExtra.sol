//author - Anudish Jain

pragma solidity ^0.4.19;
import "./CharterMain.sol";


contract Rent2 is Rent {
    
    Rent rentInstance = Rent(0x3e672f6f834e08812892d6c32202ac0a364f1bdf); 
    // address where Rent is Deployed
    
    function landlordPast() view external returns(uint[] array, uint size) {

	}

	function tenantPast() view external returns(uint[] array, uint size) {


	}    
}
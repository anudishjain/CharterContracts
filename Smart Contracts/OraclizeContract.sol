
pragma solidity ^0.4.19;
import "github.com/oraclize/ethereum-api/oraclizeAPI_0.4.sol";

contract ConversionContract is usingOraclize {
    
    uint price;
    event LogNewOraclizeQuery(string message);

    function getConversionRate() view returns(uint) {
        
       return price;
    }
    
    function __callback(bytes32 _myid, string _result) {
        
        require (msg.sender == oraclize_cbAddress());
        price = parseInt(_result);
    }
    
    function fetchLatestPrice() external payable {
        
        if (oraclize_getPrice("URL") > this.balance)
           LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
           
           
        else {
            
            LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            oraclize_query("URL","json(https://api.coinbase.com/v2/prices/ETH-INR/buy).data.amount");
       }
    }
}
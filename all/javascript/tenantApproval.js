
var latitude;
var longitude;
var value;
var val;

// ------------------------------------------------------------------------------------------------------
var price;

var request = new XMLHttpRequest();
request.open('GET', "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR&api_key=090d85bbb88aab5c93774929f2196d54fb4664cabf15ffc234d2d4d1e74c792b", true);

request.onload = function () {
    
    var data = JSON.parse(this.response);

    price = parseInt(data["INR"]);

    console.log(price);
}

request.send();
$("#contractDetails").hide();

// -------------------------------------------------------------------------------------------------------------

web3.eth.defaultAccount = web3.eth.accounts[0];

$("#seeContract").click(function() {

    rentInfo.tenantApproval1(function(error, result ) {

        if(error)
        {
            alert('Error !! Contract cannot be Displayed..');
        }

        else
        {
            value = JSON.stringify(result); // convert the result to a String with all strings as part
            value = value.replace(/'/g, '"'); // seperate the strings from the main string
            value = JSON.parse(value);
            console.log(value);

            $("#landlordName").html(value[0]);
            $("#landlordAadhaar").html(value[1]);
            $("#propertyAddress").html(value[2]);
            $("#propertyType").html(value[3]);
            $("#propertyDuration").html(value[4]);
            $("#propertyRent").html(value[5]);
            $("#propertySecurity").html(value[6]);
        }

    });

    rentInfo.tenantApproval2(function(error, result) {

        if(error)
        {
            alert('Contract cannot be Displayed..');
        }

        else
        {
            val = JSON.stringify(result); // convert the result to a String with all strings as part
            val = val.replace(/'/g, '"'); // seperate the strings from the main string
            val = JSON.parse(val);
            console.log(val);            

            latitude = val[1];
            longitude = val[2];

            $("#governFee").html(val[0]);
            $("#sqFt").html(val[3]);
            $("#rooms").html(val[4]);
            $("#extra").html(val[5]);


            var map=new MapmyIndia.Map("map",{ center:[latitude, longitude],zoomControl: true, hybrid:true});
            L.marker([latitude, longitude]).addTo(map);
        }

    });

    $("#contractDetails").show();
});

// --------------------------------------------------------------------------------------------------------
var event = rentInfo.rejection({}, 'latest');

        event.watch(function(error, result) {

            if(!error)
            {
                $("#message").show();
                $("#hashBlock").show();

                if(result.transactionHash != $("#hashBlock").html())
                $("#loader").hide(); /// hide loader once we get successful response

            $('#hashBlock').attr("href", "https://ropsten.etherscan.io/tx/" + result.transactionHash);
            $("#message").html(result.args.str);
                /// load data once we get the data back from the event User()
                //we used toAscii as we are using bytes we need to convert hex to string format for display
            }

            else
            {
                $('#loader').hide();
                console.log(error);
            }

        });

        //---------------------

        var ans = false;
        var check = false;

        var message;

        $("#signButton").click(function() {

            $("#loader").show();

            var currentDate = new Date();
            
            web3.personal.sign(web3.toHex("I hereby declare that I accept all the terms as stated above & understand that once deployed details cannot be changed." + 
            "\n\nI know that after this step a Thorough Government Verification of this Contract will be performed." + "\n\nDated - " + String(currentDate) + 
            "\n\n1 Ether priced at - " + String(price) + " Rupees.") ,web3.eth.accounts[0], function(error, result){

                    if(error)
                    {
                        $("#loader").hide();
                        alert('Failed !! Contract Signature cannot be performed..');
                    }

                    else
                    {
                        message = result;
                        ans = true;
                        $("#loader").hide();
                    }

                });
        });

        $("#payButton").click(function() {

            if(ans == false)
            {
               alert("Sign the Contract before paying the Security Deposit");
            }  

            else
            {
                $("#loader").show();
                check = true;

                $("#hashBlock2").show();

                rentInfo.tenantAccept(message, Number(price), (err, res) => {

                    if(err) {
                        $("#loader").hide();
                    }
                });
            }

        });



// ----------------------------------------------------------------------------------------------------------

         $("#rejectButton").click(function() {

            if((ans == false)&&(check == false))
            {
                alert("Warning !! The Contract will be Permanently Rejected and Marked Unapproved. " + 
                    "\n\nImportant - Inform Landlord to draft a New Contract with renewed Terms and Conditions." + 
                    "\n\nClick Reject again to Complete Rejection.");

                ans = true;
            }

            else if((ans == true)&&(check == false))
            {
                $("#loader").show();
                $("#hashBlock2").show();

                rentInfo.tenantReject(Number(price), (err, res) => {
                    if(err) {
                        $("#loader").hide();
                    }
                });
            }

            else
            {
                alert("Contract already Approved !!");
            }

        });
        web3.eth.defaultAccount = web3.eth.accounts[0];

        var event = rentInfo.registerParty({}, 'latest');

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message1").show();
                $("#hashBlock1").show();

                if(result.transactionHash != $("#hashBlock1").html())
                $("#loader1").hide(); /// hide loader once we get successful response

            $('#hashBlock1').attr("href", "https://ropsten.etherscan.io/tx/" + result.transactionHash);
            $("#message1").html(result.args.message);
                /// load data once we get the data back from the event User()
                //we used toAscii as we are using bytes we need to convert hex to string format for display
            }

            else
            {
                $('#loader1').hide();
                console.log(error);
            }

        });

        //---------
        var tenant = ($("#tenantAdd").val());
        //---------

        $("#registerButton1").click(function() {

            $("#loader1").show();

            if($("#tenantAdd").val() != '')
            {
                rentInfo.registerParties($("#tenantAdd").val(), (err, res) => {

                    if(err) {
                        $("#loader1").hide();
                    }
                });

            }

            else
            {
                $("#loader1").hide();
                alert('Fill Step - 1 Correctly');   
            }
        });

// -------------------------------------------------------------------------------------------------------------------

// ----

var feeGovern;
    
// ----


        var event = rentInfo.registerHome({}, 'latest');

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message2").show();
                $("#hashBlock2").show();

                if(result.transactionHash != $("#hashBlock2").html())
                $("#loader2").hide(); /// hide loader once we get successful response

                $('#hashBlock2').attr("href", "https://ropsten.etherscan.io/tx/" + result.transactionHash);
                $("#message2").html(result.args.message);
                /// load data once we get the data back from the event User()
                //we used toAscii as we are using bytes we need to convert hex to string format for display

                feeGovern = Number(result.args.FeePayable);

                $("#showFee").html("Registration Fee to be paid " + result.args.FeePayable + " Rupees");
            }

            else
            {
                $('#loader2').hide();
                console.log(error);
            }

        });

        // -----------------
        var address = ($("#address").val());
        var duration = ($("#duration").val());
        var rent = ($("#rent").val());
        var security = ($("#security").val());
        // -----------------

        $("#registerButton2").click(function() {

            $("#loader2").show();

            if(($("#address").val() != '')&&($("#type").val() != '')&&($("#address").val() != '')&&($("#rent").val() > 0))
            {
                rentInfo.newHome($("#address").val(), $("#type").val(), $("#duration").val(), $("#rent").val(), 
                    $("#security").val(), (err, res) => {

                    if(err) {
                        $("#loader2").hide();
                    }
                });
            }

            else
            {
                $("#loader2").hide();
                alert('Fill Step - 2 Correctly');   
            }
        });


// -------------------------------------------------------------------------------------------------------------------
        

        var event = rentInfo.registerDetails({}, 'latest');

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message3").show();
                $("#hashBlock3").show();

                if(result.transactionHash != $("#hashBlock3").html())
                $("#loader3").hide(); /// hide loader once we get successful response

                $('#hashBlock3').attr("href", "https://ropsten.etherscan.io/tx/" + result.transactionHash);
                $("#message3").html(result.args.message);
                /// load data once we get the data back from the event User()
                //we used toAscii as we are using bytes we need to convert hex to string format for display
            }

            else
            {
                $('#loader3').hide();
                console.log(error);
            }

        });

        // -----------------
        var extra = ($("#extra").val());
        var temp_ipfs = "Currently not Supported"; /// NEw FEATURE HERE ------------------------------
        // -----------------

        $("#registerButton3").click(function() {

            $("#loader3").show();

            if(($("#latitude").val() != '')&&($("#longitude").val() != '')&&($("#sqFt").val() != 0)&&($("#rooms").val() > 0)&&($("#extra").val() != 0))
            {
                rentInfo.newDetails($("#latitude").val(), $("#longitude").val(), $("#sqFt").val(), $("#rooms").val(), 
                    $("#extra").val(), temp_ipfs, (err, res) => {

                    if(err) {
                        $("#loader3").hide();
                    }
                });
            }

            else
            {
                $("#loader3").hide();
                alert('Fill Step - 3 Correctly');   
            }
        });

// ---------------------------------------------------------------------------------------------------------

// getting the ETH - RATE HERE
var price;

var request = new XMLHttpRequest();
request.open('GET', "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR&api_key=090d85bbb88aab5c93774929f2196d54fb4664cabf15ffc234d2d4d1e74c792b", true);

request.onload = function () {
    
    var data = JSON.parse(this.response);

    price = parseFloat(data["INR"]);

    console.log(price);
}

request.send();

//--------------------

var amount = web3.toWei(String(feeGovern/price));
var event = rentInfo.feePay({}, 'latest');

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message4").show();
                $("#hashBlock4").show();

                if(result.transactionHash != $("#hashBlock4").html())
                $("#loader4").hide(); /// hide loader once we get successful response

            $('#hashBlock4').attr("href", "https://ropsten.etherscan.io/tx/" + result.transactionHash);
            $("#message4").html(result.args.message);
                /// load data once we get the data back from the event User()
                //we used toAscii as we are using bytes we need to convert hex to string format for display
            }

            else
            {
                $('#loader4').hide();
                console.log(error);
            }

        });

        var ans = false;
        var message;

        $("#contractSign").click(function() {

            $("#loader4").show();

            var currentDate = new Date();
            
            web3.personal.sign(web3.toHex("\nI hereby lease Property Situated at \n\n" + ($("#address").val()) + "\n\nto Tenant Address -" + 
            ($("#tenantAdd").val()) + '\n\nfor ' + String($("#duration").val()) + ' Months,' + ' at Rent Amount of ' + String($("#rent").val()) + 
            ' Rupees and Security Fee of ' + String($("#security").val()) + ' Rupees ' + '\nOther terms of agreement are - \n\n'+ ($("#extra").val()) + 
            '\n\nDated - ' + (currentDate) + '\n\n1 Ether priced at ' + String(price) + ' Rupees') ,web3.eth.accounts[0], function(error, result){

                    if(error)
                    {
                        $("#loader4").hide();
                        alert('Failed !! Contract Signature cannot be performed..');
                    }

                    else
                    {
                        message = result;
                        ans = true;
                        $("#loader4").hide();
                    }

                });
        });

        $("#registerButton4").click(function() {

            $("#loader4").show();
            console.log(message);

            console.log(parseInt(amount));

            if(ans != false)
            {
                rentInfo.feePayment(parseInt(amount), String(message), (err, res) => {
                        
                    if(err) {
                        $("#loader4").hide();
                    }
                });
            }

            else {

                alert('Signature on the Contract is Required');
            }

        });   
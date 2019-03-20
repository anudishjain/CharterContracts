
var latitude;
var longitude;
var value;
var value2;

web3.eth.defaultAccount = web3.eth.accounts[0];

$("#seeContract").click(function() {

    rentInfo.tenantData1(function(error, result ) {

            value = JSON.stringify(result); // convert the result to a String with all strings as part
            value = value.replace(/'/g, '"'); // seperate the strings from the main string
            value = JSON.parse(value);
            
            var startEpoch = new Date(parseInt(value[4]) * 1000);
            var endEpoch = new Date(parseInt(value[5]) * 1000);
            var durationMonths = Math.ceil((Number(value[5])-Number(value[4]))/(2592000));                

            $("#landlordName").html(value[0]);
            $("#landlordAadhaar").html(value[1]);
            $("#propertyAddress").html(value[2]);
            $("#propertyType").html(value[3]);
            $("#startDate").html(startEpoch);
            $("#endDate").html(endEpoch);
            $("#duration").html(durationMonths);
            $("#propertyRent").html(value[6]);
    });

    rentInfo.tenantData2(function(error, result) {

            value2 = JSON.stringify(result); // convert the result to a String with all strings as part
            value2 = value2.replace(/'/g, '"'); // seperate the strings from the main string
            value2 = JSON.parse(value2);      

            latitude = value2[2];
            longitude = value2[3];

            $("#propertySecurity").html(value2[0]);
            $("#registerFee").html(value2[1]);
            $("#sqFt").html(value2[4]);
            $("#rooms").html(value2[5]);
            $("#extra").html(value2[6]);


            var map=new MapmyIndia.Map("map",{ center:[latitude, longitude],zoomControl: true, hybrid:true});
            L.marker([latitude, longitude]).addTo(map);
    });

    $("#contractDetails").show();
});

// --------------------------------------------------------------------------------------------------------
var event = rentInfo.rejection();

        event.watch(function(error, result) {

            if(!error)
            {
                $("#message").show();
                $("#hashBlock").show();

                if(result.transactionHash != $("#hashBlock").html())
                $("#loader").hide(); /// hide loader once we get successful response

            $('#hashBlock').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);
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

            var calculated_value = parseInt(value2[0])/price;

            if(ans == false)
            {
               alert("Sign the Contract before paying the Security Deposit");
            }  

            else
            {
                $("#loader").show();
                check = true;

                $("#hashBlock2").show();

                rentInfo.tenantAccept(message, Number(price),  {value : web3.toWei(calculated_value.toString(), 'ether')}, (err, res) => {

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
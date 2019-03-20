        web3.eth.defaultAccount = web3.eth.accounts[0];

        var event = rentInfo.registerParty();

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message1").show();
                $("#hashBlock1").show();

                if(result.transactionHash != $("#hashBlock1").html())
                $("#loader1").hide(); /// hide loader once we get successful response

            $('#hashBlock1').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);
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
        var tenant;
        var check1 = false;
        //---------

        $("#registerButton1").click(function() {

            $("#loader1").show();

            if(check1 == false)
            {
                tenant = ($("#tenantAdd").val());
            }

            if($("#tenantAdd").val() != '')
            {
                rentInfo.registerParties($("#tenantAdd").val(), (err, res) => {

                    if(err) {
                        $("#loader1").hide();
                    }

                    else
                        check1 = true;
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
        var registerFee; // save the Registeration Fee that was returned by the contract
        var event = rentInfo.registerHome();

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message2").show();
                $("#hashBlock2").show();

                if(result.transactionHash != $("#hashBlock2").html())
                $("#loader2").hide(); /// hide loader once we get successful response

                $('#hashBlock2').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);
                $("#message2").html(result.args.message);
                /// load data once we get the data back from the event User()
                //we used toAscii as we are using bytes we need to convert hex to string format for display

                console.log(result.args.FeePayable);
                registerFee = parseInt(result.args.FeePayable);

                $("#showFee").html("Registration Fee to be paid " + (result.args.FeePayable) + " Rupees");
            }

            else
            {
                $('#loader2').hide();
                console.log(error);
            }

        });

        // -----------------
        var address;
        var duration;
        var rent;
        var security;
        var startdate;
        var enddate;
        var durationMonths;
        var check2 = false;
        // -----------------



        $("#registerButton2").click(function() {

            $("#loader2").show();

            if(check2 == false)
            {
                address = ($("#address").val());
                duration = ($("#duration").val());
                startdate = ($("#startDate").val());
                enddate = ($("#endDate").val());
                rent = ($("#rent").val());
                security = ($("#security").val());
            }


            // get epochtimes for start and end date - 0 hr, 0 min, 0 sec
            var startEpoch = new Date(String(startdate)).getTime() / 1000;
            var endEpoch = new Date(String(enddate)).getTime() / 1000;

            var sixDayFromToday = (new Date().getTime()/1000) + (86400 * 6); // added 6 full day seconds from Today.

            // checks to ensure correct epoch time is inserted into contract

            if(startEpoch <= sixDayFromToday)
                alert('Start Date must be atleast a week from Today');
            else if(endEpoch <= sixDayFromToday)
                alert('End Date must be atleast a month from Start Date');
            else if(endEpoch - startEpoch < 2592000)
                alert('Minimum Duration of Contract is 30 Days');
            
            else if(($("#address").val() != '')&&($("#type").val() != '')&&($("#address").val() != '')&&($("#rent").val() > 0))
            {
                            // we round off to the Greatest Integer if 1.8 months so it becomes 2 months
                durationMonths = Math.ceil((endEpoch - startEpoch)/(2592000));
                
                rentInfo.newHome($("#address").val(), $("#type").val(), Number(startEpoch), Number(endEpoch), Number(durationMonths),
                $("#rent").val(), $("#security").val(), (err, res) => {

                    if(err) {
                        $("#loader2").hide();
                    }

                    else
                        check2 = true;
                });
            }

            else
            {
                $("#loader2").hide();
                alert('Fill Step - 2 Correctly');   
            }
        });

       
        var event = rentInfo.registerDetails();

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message3").show();
                $("#hashBlock3").show();

                if(result.transactionHash != $("#hashBlock3").html())
                $("#loader3").hide(); /// hide loader once we get successful response

                $('#hashBlock3').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);
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
        var extra;
        var check3 = false;
        // -----------------

        $("#registerButton3").click(function() {

            $("#loader3").show();

            if(check3 == false)
            {
                extra = ($("#extra").val());
            }

            if(($("#latitude").val() != '')&&($("#longitude").val() != '')&&($("#sqFt").val() != 0)&&($("#rooms").val() > 0)&&($("#extra").val() != 0))
            {
                rentInfo.newDetails($("#latitude").val(), $("#longitude").val(), $("#sqFt").val(), $("#rooms").val(), 
                    $("#extra").val(),  (err, res) => {

                    if(err) {
                        $("#loader3").hide();
                    }

                    else
                    check3 = true;
                });
            }

            else
            {
                $("#loader3").hide();
                alert('Fill Step - 3 Correctly');   
            }
        });


// -----------------------------------------------------------------------------------------------------

var event = rentInfo.feePay();

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message4").show();
                $("#hashBlock4").show();

                if(result.transactionHash != $("#hashBlock4").html())
                $("#loader4").hide(); /// hide loader once we get successful response

            $('#hashBlock4').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);
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
            
            web3.personal.sign(web3.toHex("I hereby Lease property situated at -\n\n" + String(address) + "\n\nTo Tenant Address -\n\n" + 
            String(tenant) + "\n\nStarting From - " + String(new Date(String(startdate))) + "\nUpto Date - " + String(new Date(String(enddate)))
            + "\n\nAt Monthly Rent of - " + String(rent) + " INR\nand Security Deposit of - " + String(security) + " INR" + 
            "\n\nThe Contract Duration is of - " + String(durationMonths) + " Months" + "\n\nStamp Duty to the Government is -" + 
            String(registerFee) + " INR" + "\n\nOther Terms of Agreement are -\n" + String(extra) + "\n\nI hereby declare that as of - " + 
            String(currentDate) + ", I will abide by all the Terms of Agreement I have stated above," + "\n\n1 Ether priced at - " + 
            String(price) + " INR"), web3.eth.accounts[0], function(error, result){

                    if(error)
                    {
                        $("#loader4").hide();
                        alert('Signature cannot be Verified');
                    }

                    else
                    {
                        message = result;
                        ans = true;
                        $("#loader4").hide();
                    }

                });
        });

        var calculated_value;
        $("#registerButton4").click(function() {

            $("#loader4").show();
            console.log(message);

            if(ans != false)
            {
                calculated_value = registerFee/price;
                rentInfo.feePayment(String(message), Number(price), {value : web3.toWei(calculated_value.toString(), 'ether')}, (err, res) => {                      
                    if(err) {
                        $("#loader4").hide();
                    }
                });
            }

            else {

                alert('Signature on the Contract is Required');
            }

        });   
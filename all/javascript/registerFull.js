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
        var tenant = String($("#tenantAdd").val());
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

                $("#showFee").html("Registration Fee to be paid " + result.args.FeePayable + " rupees");
            }

            else
            {
                $('#loader2').hide();
                console.log(error);
            }

        });

        // -----------------
        var address = String($("#address").val());

        var propType = String($("#type").val());

        var duration = String($("#duration").val());
        var rent = String($("#rent").val());
        var security = String($("#security").val());
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



        
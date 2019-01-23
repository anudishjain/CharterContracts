        web3.eth.defaultAccount = web3.eth.accounts[0];

        var event = rentInfo.startMessage({}, 'latest');

        event.watch(function(error, result) {

            if(!error)
            {

                $("#message1").show();
                $("#hashBlock").show();

                if(result.transactionHash != $("#hashBlock").html())
                $("#loader").hide(); /// hide loader once we get successful response

            $('#hashBlock').attr("href", "https://ropsten.etherscan.io/tx/" + result.transactionHash);
            $("#message1").html(result.args.message);
                /// load data once we get the data back from the event User()
                //we used toAscii as we are using bytes we need to convert hex to string format for display
            }

            else
            {
                $('#loader').hide();
                console.log(error);
            }

        });

        var ans = false;
        var message;

        $("#acceptButton").click(function() {

            $("#loader").show();

            var currentDate = new Date();
            
            web3.personal.sign(web3.toHex("\n I have read the Terms and Conditions carefully and will follow the same while using the Charter Platform \n\n Dated - " + currentDate), web3.eth.accounts[0], 
                function(error, result){

                    if(error)
                    {
                        $("#loader").hide();
                        alert('Failed !! Signature cannot be performed..');
                    }

                    else
                    {
                        message = result;
                        ans = true;
                        $("#loader").hide();
                    }

                });
        });

        $("#registerButton").click(function() {

            $("#loader").show();
            console.log(message);

            if(ans != false)
            {
                if(($("#legalName").val() != '')&&($("#email").val() != '')&&($("#aadhaar").val() != 0))
                {

                    rentInfo.createNewUser($("#legalName").val(), $("#email").val(), $("#aadhaar").val(), message, (err, res) => {
                        
                        if(err) {
                            $("#loader").hide();
                        }
                    });

                }

                else
                {
                    $("#loader").hide();
                    alert('Fill the form Correctly');   
                }

            }

            else {

                alert('Kindly sign the Terms and Conditions first.');
            }

        });   

        
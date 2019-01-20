
var latitude;
var longitude;
var value;
var val;

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


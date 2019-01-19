
var latitude;
var longitude;

web3.eth.defaultAccount = web3.eth.accounts[0];

$("#seeContract").click(function() {


    rentInfo.tenantApproval1(function(error, result ) {

        if(error)
        {
            alert('Contract cannot be Displayed..');
        }

        else
        {
            $("#landlordName").html(result.landlordname);
            $("#landlordAadhaar").html(result.landlordAadhaar);
            $("#propertyAddress").html(result.addressHouse);
            $("#propertyType").html(result.typeProperty);
            $("#propertyDuration").html(result.duration);
            $("#propertyRent").html(result.rent);
            $("#propertySecurity").html(result.security);
            $("#governFee").html(result.registration);
        }

    });


    rentInfo.tenantApproval2(function(error, result) {

        if(error)
        {
            alert('Contract cannot be Displayed..');
        }

        else
        {

            latitude = result.lat;
            longitude = result.long;

            $("#sqFt").html(result.sqFt);
            $("#rooms").html(result.rooms);
            $("#extra").html(result.extra);
        }


       // var map=new MapmyIndia.Map("map",{ center:[20.5937, 78.9629],zoomControl: true, hybrid:true});
       // L.marker([20.5937, 78.9629]).addTo(map);


    });

    $("#contractDetails").show();
});


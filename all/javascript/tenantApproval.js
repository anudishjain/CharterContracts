
    var latitude;
    var longitude;

    web3.eth.defaultAccount = web3.eth.accounts[0];

    $("#seeContract").click(function() {

        var val1 = rentInfo.tenantApproval1();
        var val2 = rentInfo.tenantApproval2();

        $("#landlordName").html(val1.landlordname);
        $("#landlordAadhaar").html(val1.landlordAadhaar);
        $("#propertyAddress").html(val1.addressHouse);
        $("#propertyType").html(val1.typeProperty);
        $("#propertyDuration").html(val1.duration);
        $("#propertyRent").html(val1.rent);
        $("#propertySecurity").html(val1.security);
        $("#governFee").html(val1.registration);


        $("#sqFt").html(val2.sqFt);
        $("#rooms").html(val2.rooms);
        $("#extra").html(val2.extra);

        latitude = val2.lat;
        longitude = val2.long;

        var map=new MapmyIndia.Map("map",{ center:[window["latitude"], window["longitude"]],zoomControl: true, hybrid:true});
        L.marker([window["latitude"], window["longitude"]]).addTo(map);


        $("#contractDetails").show();
    });


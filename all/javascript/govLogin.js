
$("#showButton").click(function() {  

    var allData = "";

    for(var i = 0 ; i < 20 ; i++)
    {

        allData += '<div class="eachContract"+ id="contract'+ i +'"><hr><div align="center"><br>'
        +'<h1 class="jumboHead" id="heading1"><b>Contract - '+ i + '</b></h1><button class="getStarted2" type="button" value="'+ i +'">Show Contract</button></div>'
        +'<br><div id="contractDiv' + i + '" style="display: none"><h1 class="jumboHead"><b>LandLord Details</b>'
        +'</h1><h1 class="jumboText"><b>Landlord Name</b></h1><h1 class="jumboText" id="landlordName1"></h1><h1 class="jumboText"><b>Landlord Aadhaar Number</b></h1>'
        +'<h1 class="jumboText" id="landlordAadhaar1"></h1><br>'
        +'<h1 class="jumboHead"><b>Tenant Details</b></h1><h1 class="jumboText"><b>Tenant Name</b></h1><h1 class="jumboText" id="tenantName1"></h1><h1 class="jumboText"><b>Tenant Aadhaar Number</b></h1><h1 class="jumboText" id="tenantAddress1"></h1><br>'
        +'<h1 class="jumboHead"><b>Property Details</b></h1><div align="center"><br><h1 class="jumboText" id="geoProp1"><b>Geographical Location of Property</b></h1><br>'
        +'<div style="width: 24rem; height: 28rem" class="geoLoc" id="map"></div></div>'
        +'<h1 class="jumboText"><b>Property Address</b></h1><pre><h1 class="jumboText" id="propertyAddress1"></h1></pre><h1 class="jumboText"><b>Property Type</b></h1><h1 class="jumboText" id="propertyType1"></h1>'
        +'<h1 class="jumboText"><b>Duration of Contract (in Months)</b></h1><h1 class="jumboText" id="propertyDuration1"></h1><h1 class="jumboText"><b>Rent Amount per Month (in Rupees)</b></h1><h1 class="jumboText" id="propertyRent1"></h1>'
        +'<h1 class="jumboText"><b>Security Deposit (in Rupees, One Time)</b></h1>'
        +'<h1 class="jumboText" id="propertySecurity1"></h1><h1 class="jumboText"><b>Registration Fee (in Rupees, One Time)</b></h1><h1 class="jumboText" id="governFee1"></h1><br>'
        +'<h1 class="jumboHead"><b>Other Details</b></h1><h1 class="jumboText"><b>Square Foot Area of Property</b></h1><h1 class="jumboText" id="sqFt1"></h1>'
        +'<h1 class="jumboText"><b>Number of Rooms</b></h1><h1 class="jumboText" id="rooms1"></h1><h1 class="jumboText"><b>Other Terms of Agreement</b></h1><pre><h1 class="jumboText" id="extra1"></h1></pre><div align="center">'
        +'<button type="button" class="getStarted2" value="index_of_element" style="background-color: #4E7349">Approve</button><br><button type="button" class="getStarted2" value="index_of_element" style="background-color: #9B3737">Reject</button></div>'
        +'<br></div></div>';

    }   

    $("#allContracts").append(allData);
    $('#allContracts').show();

});

var state = false;

$("button").click(function() {

    if(state == false)
    $("#contractDiv0").show();

    else
    $("#contractDiv0").hide();

});
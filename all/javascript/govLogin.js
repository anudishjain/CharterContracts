var value;

var message;
var arrayIndexes;
var length;


$("#showButton").click(function() {  


    rentInfo.govLogin(function(error, result ) {

        value = JSON.stringify(result); // convert the result to a String with all strings as part
        value = value.replace(/'/g, '"'); // seperate the strings from the main string
        value = JSON.parse(value);

        message = String(value[0]);
        arrayIndexes = Array(value[1]);
        length = Number(value[2]);

        if(length == 0)
        {
            $("#contractMessage").html(message);
            $("#contractMessage").show();
        }

        console.log(length);
    });


    var intIndexes = new Array(length);
    var allData = "";

    for(var i = 0 ; i < length ; i++)
        intIndexes[i] = parseInt(arrayIndexes[i]);

    console.log(intIndexes);
    console.log(intIndexes.length);

    for(var i = 0 ; i < intIndexes.length ; i++)
    {
        var id_num = intIndexes[i];
        var contract;

        rentInfo.govLogin(id_num,(function (error, result) {

            contract = result;
            console.log(contract);
            console.log(result);

        }));
   

        allData += '<br><br><h1 class="jumboHead" align="center"><b>Contract Number  - ' + id_num 
        + '</b></h1><div align="center"><button type="button" class="getStarted2" id="signButton" style="background: #3B4A66">Show Contract</button></div>'

        +

        '<br><br><div id=""><h1 class="jumboHead" style="margin-top: 1rem"><b>LandLord Details</b></h1><h1 class="jumboText"><b>Landlord Name</b></h1>'  
        + '<h1 class="jumboText" id="landlordName"></h1><h1 class="jumboText"><b>Landlord Aadhaar Number</b></h1><h1 class="jumboText" id="landlordAadhaar"></h1>'
        +' <h1 class="jumboText"><b>Landlord Email</b></h1><h1 class="jumboText" id="landlordEmail"><br><br>'

        +

        '<h1 class="jumboHead" style="margin-top: 1rem"><b>Tenant Details</b></h1><h1 class="jumboText"><b>Tenant Name</b></h1>'  
        +'<h1 class="jumboText" id="tenantName"></h1><h1 class="jumboText"><b>Tenant Aadhaar Number</b></h1><h1 class="jumboText" id="tenantAadhaar"></h1>'
        +'<h1 class="jumboText"><b>Tenant Email</b></h1><h1 class="jumboText" id="tenantEmail"><br>'

        +

        '</h1><h1 class="jumboHead"><b>Property Details</b></h1><div align="center"><h1 class="jumboText" id="geoProp"><b>Geographical Location of Property</b></h1>'
        + '<br><div style="width: 24rem; height: 28rem" class="geoLoc" id="map"></div></div><br><h1 class="jumboText"><b>Property Address</b></h1>'
        + '<pre><h1 class="jumboText" id="propertyAddress"></h1></pre><h1 class="jumboText"><b>Property Type</b></h1><h1 class="jumboText" id="propertyType"></h1>'
        + '<h1 class="jumboText"><b>Start Date of the Contract</b></h1><h1 class="jumboText" id="startDate"></h1><h1 class="jumboText"><b>End Date of the Contract</b></h1>'
        + '<h1 class="jumboText" id="endDate"></h1><br><div align="right"><h1 class="jumboText"><b>Duration of Contract (in Months)</b></h1>'
        + '<h1 class="jumboText" id="duration"></h1><h1 class="jumboText"><b>Rent Amount per Month (in Rupees)</b></h1><h1 class="jumboText" id="propertyRent"></h1>'
        + '<h1 class="jumboText"><b>Security Deposit</b></h1><h1 class="jumboText" id="propertySecurity"></h1><h1 class="jumboText"><b>Registration Fee</b></h1>'
        + '<h1 class="jumboText" id="registerFee"></h1></div><h1 class="jumboHead"><b>Other Details</b></h1><div align="right"><h1 class="jumboText"><b>Check Real Contract</b></h1>'
        + '<h1 class="jumboText" id="ipfsUrl">Currently not Supported</h1><h1 class="jumboText"><b>Square Foot Area of Property</b></h1><h1 class="jumboText" id="sqFt"></h1>'
        + '<h1 class="jumboText"><b>Number of Rooms</b></h1><h1 class="jumboText" id="rooms"></h1></div><br><h1 class="jumboText"><b>Other Terms of Agreement</b></h1>'
        + '<pre><h1 class="jumboText" id="extra"></h1></pre></div><br><div align="center"><div class="alert alert-dark message" id="hashBlock2" style="display: none;"><b>Transaction on EtherScan - <a href="" id="hashBlock"> Click Here</b></a></div>'
        + '<br><div class="alert alert-danger message" id="message" style="font-weight: bold; display: none"></div><br><img src="extra/loader.gif" id="loader" class="loader"></div>'

        + 

        '<div align="center"><button type="button" class="getStarted2" id="signButton" style="background: #44664e">Sign Contract</button>'
        +'<button type="button" class="getStarted2" id="payButton" style="background: #44664e; margin-left : 1.5%">Approve Contract</button>'
        +'<br><button type="button" class="getStarted2" id="rejectButton" style="background: #7C2E29">Reject Contract</button></div><br></div><hr></div'
    }   

    $("#allContracts").append(allData);
    $('#allContracts').show();


});

var state = false;

$("button").click(function() {

    if(state == false)
    {
        $("#contractDiv0").show();
        state = true;
    }

    else
        $("#contractDiv0").hide();

});
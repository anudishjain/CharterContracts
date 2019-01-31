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
        arrayIndexes = value[1]; // the arrayIndexes will be a Object with form 0: "0", 1: "1"
        length = Number(value[2]);

        if(length == 0)
        {
          $("#contractMessage").html(message);
          $("#contractMessage").show();
        }

        else
        {

          var intIndexes = [];
          var allData = "";

          for(var i = 0 ; i < arrayIndexes.length; i++)
            intIndexes.push(parseInt(arrayIndexes[i])); 

          for(var i = 0 ; i < intIndexes.length ; i++)
          {
            var id_num = intIndexes[i];

            var parties;
            var home;
            var miscellaneous;

            rentInfo.allParties(id_num,(function (error, result) {

              parties = result;
              console.log(parties);

            }));


            rentInfo.allHouses(id_num,(function (error, result) {

              home = result;
              console.log(home);

            }));

            rentInfo.allOtherDetails(id_num,(function (error, result) {

              home = result;
              console.log(home);

            }));         


            allData += '<br><br><h1 class="jumboHead" align="center"><b>Contract Number  - ' + id_num 
            + '</b></h1><div align="center"><button type="button" class="getStarted2" id="showButton'+id_num+'" style="background: #3B4A66" value="'+id_num+'">Show Contract</button></div>'

            +

            '<br><br><div id="contract' +id_num+'"><h1 class="jumboHead" style="margin-top: 1rem"><b>LandLord Details</b></h1><h1 class="jumboText"><b>Landlord Name</b></h1>'  
            + '<h1 class="jumboText" id="landlordName' +id_num+'"></h1><h1 class="jumboText"><b>Landlord Aadhaar Number</b></h1><h1 class="jumboText" id="landlordAadhaar' +id_num+'"></h1>'
            +' <h1 class="jumboText"><b>Landlord Email</b></h1><h1 class="jumboText" id="landlordEmail' +id_num+'"><br><br>'

            +

            '<h1 class="jumboHead" style="margin-top: 1rem"><b>Tenant Details</b></h1><h1 class="jumboText"><b>Tenant Name</b></h1>'  
            +'<h1 class="jumboText" id="tenantName' +id_num+'"></h1><h1 class="jumboText"><b>Tenant Aadhaar Number</b></h1><h1 class="jumboText" id="tenantAadhaar' +id_num+'"></h1>'
            +'<h1 class="jumboText"><b>Tenant Email</b></h1><h1 class="jumboText" id="tenantEmail' +id_num+'"><br>'

            +

            '</h1><h1 class="jumboHead"><b>Property Details</b></h1><br><div align="center"><h1 class="jumboText" id="geoProp' +id_num+'"><b>Geographical Location of Property</b></h1>'
            + '<br><div style="width: 24rem; height: 28rem" class="geoLoc" id="map' +id_num+'"></div></div><br><h1 class="jumboText"><b>Property Address</b></h1>'
            + '<pre><h1 class="jumboText" id="propertyAddress' +id_num+'"></h1></pre><h1 class="jumboText"><b>Property Type</b></h1><h1 class="jumboText" id="propertyType' +id_num+'"></h1>'
            + '<h1 class="jumboText"><b>Start Date of the Contract</b></h1><h1 class="jumboText" id="startDate' +id_num+'"></h1><h1 class="jumboText"><b>End Date of the Contract</b></h1>'
            + '<h1 class="jumboText" id="endDate' +id_num+'"></h1><br><div align="right"><h1 class="jumboText"><b>Duration of Contract (in Months)</b></h1>'
            + '<h1 class="jumboText" id="duration' +id_num+'"></h1><h1 class="jumboText"><b>Rent Amount per Month (in Rupees)</b></h1><h1 class="jumboText" id="propertyRent' +id_num+'"></h1>'
            + '<h1 class="jumboText"><b>Security Deposit</b></h1><h1 class="jumboText" id="propertySecurity' +id_num+'"></h1><h1 class="jumboText"><b>Registration Fee</b></h1>'
            + '<h1 class="jumboText" id="registerFee' +id_num+'"></h1></div><h1 class="jumboHead"><b>Other Details</b></h1><div align="right"><h1 class="jumboText"><b>Check Real Contract</b></h1>'
            + '<h1 class="jumboText" id="ipfsUrl' +id_num+'">Currently not Supported</h1><h1 class="jumboText"><b>Square Foot Area of Property</b></h1><h1 class="jumboText" id="sqFt' +id_num+'"></h1>'
            + '<h1 class="jumboText"><b>Number of Rooms</b></h1><h1 class="jumboText" id="rooms' +id_num+'"></h1></div><br><h1 class="jumboText"><b>Other Terms of Agreement</b></h1>'
            + '<pre><h1 class="jumboText" id="extra' +id_num+'"></h1></pre><br><div align="center"><div class="alert alert-dark message" id="hashBlocks' +id_num+'" style="display: none;"><b>Transaction on EtherScan - <a href="" id="hashBlock"> Click Here</b></a></div>'
            + '<br><div class="alert alert-danger message" id="message' +id_num+'" style="font-weight: bold; display: none"></div><br><img src="extra/loader.gif" id="loader' +id_num+'" class="loader"></div>'

            + 

            '<div align="center"><button type="button" class="getStarted2" id="signButton' +id_num+'" style="background: #44664e" value="'+id_num+'">Sign Contract</button>'
            +'<button type="button" class="getStarted2" id="payButton' +id_num+'" style="background: #44664e; margin-left : 1.5%" value="'+id_num+'">Approve Contract</button>'
            +'<br><button type="button" class="getStarted2" id="rejectButton' +id_num+'" style="background: #7C2E29" value="'+id_num+'">Reject Contract</button></div><br></div><hr></div>'
          }   

          $("#allContracts").append(allData);
          $('#allContracts').show();

        }

      });

});
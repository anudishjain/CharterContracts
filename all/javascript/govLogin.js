var check = false;

var intIndexes = [];

var message;
var arrayIndexes;
var length;


var landlord_name = [], landlord_email = [], landlord_aadhaar = [];
var tenant_name= [], tenant_email = [], tenant_aadhaar = [];
var lat = [], long = [], prop_address = [], prop_type = [], start= [];
var end = [], duration = [], rent = [], security = [], register = [], sqft = [], rooms = [], extra = [];

var start_index;

function reply_click(_id) {

	// function to get the ID  the SHOW BUTTON
	//and display the corresponding Contract

	var button = "#showButton" + String(_id); // the Button that was pressed  
	var string = "#contract" + String(_id); // the Contract DIV to be showed

	$('#landlordName' + _id).html(landlord_name[_id - start_index]);
	$('#landlordEmail' + _id).html(landlord_email[_id - start_index]);
	$('#landlordAadhaar' + _id).html(landlord_aadhaar[_id - start_index]);

	$('#tenantName' + _id).html(tenant_name[_id - start_index]);
	$('#tenantEmail'+ _id).html(tenant_email[_id - start_index]);
	$('#tenantAadhaar' + _id).html(tenant_aadhaar[_id - start_index]);


	$('#propertyAddress' + _id).html(prop_address[_id - start_index]);
	$('#propertyType'+ _id).html(prop_type[_id - start_index]);
	$('#startDate' + _id).html(start[_id - start_index]);
	$('#endDate' + _id).html(end[_id - start_index]);
	$('#duration'+ _id).html(duration[_id - start_index]);
	$('#propertyRent' + _id).html(rent[_id - start_index]);
	$('#propertySecurity' + _id).html(security[_id - start_index]);
	$('#registerFee'+ _id).html(register[_id - start_index]);

	var latitude = String(lat[_id - start_index]);
	var longitude = String(long[_id - start_index]);

	if ($(button).html() == 'Show Contract') {
		$(button).html('Hide Contract');
		$(string).show();
	} 
	else {
		$(button).html('Show Contract');
		$(string).hide();
	}

	$('#sqFt' + _id).html(sqft[_id - start_index]);
	$('#rooms'+ _id).html(rooms[_id - start_index]);
	$('#extra' + _id).html(extra[_id - start_index]);

	var map=new MapmyIndia.Map(String("map" + _id),{ center:[latitude, longitude],zoomControl: true, hybrid:true});
	L.marker([latitude, longitude]).addTo(map);
}


function approve_click(_id) {

	var etherScanDiv = '#hashBlocks' + _id;
	var messageUser = '#message' + _id;
	var loaderGif = '#loader' + _id;

	$(loaderGif).show();

	rentInfo.govApproval(parseInt(_id), Number(price), function(error, result) {

		if(error)
		{
			$(loaderGif).hide();
			$(messageUser).html(error);

			if(result.transactionHash != $("#etherScanDiv").html())
            $('#etherScanDiv').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);

			$(messageUser).show();
			$(etherScanDiv).show();
		}

		if(!error)
		{
			$(loaderGif).hide();
			$(messageUser).html('Contract was Approved and is now Active on Blockchain !!');

			if(result.transactionHash != $("#etherScanDiv").html())
            $('#etherScanDiv').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);

			$(messageUser).show();
			$(etherScanDiv).show();			
		}

	});

}

function reject_click(_id) {

	var etherScanDiv = '#hashBlocks' + _id;
	var messageUser = '#message' + _id;
	var loaderGif = '#loader' + _id;

	$(loaderGif).show();
	console.log(_id);
	rentInfo.govReject(parseInt(_id), Number(price), function(error, result) {

		if(error)
		{
			$(loaderGif).hide();
			$(messageUser).html(error);

			if(result.transactionHash != $("#etherScanDiv").html())
            $(etherScanDiv).attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);


			$(messageUser).show();
			$(etherScanDiv).show();
		}

		if(!error)
		{
			$(loaderGif).hide();
			$(messageUser).html('Contract was Rejected, inform the Parties involved to deploy New Contract ');		

			if(result.transactionHash != $("#etherScanDiv").html())
            $('#etherScanDiv').attr("href", "https://kovan.etherscan.io/tx/" + result.transactionHash);

			$(messageUser).show();
			$(etherScanDiv).show();	
		}

	});

}


$("#showButton").click(function() {

	if (check == false) {
		check = true;

		rentInfo.govLogin(function(error, result) {

			var value;
						value = JSON.stringify(result); // convert the result to a String with all strings as part
						value = value.replace(/'/g, '"'); // seperate the strings from the main string
						value = JSON.parse(value);

						message = String(value[0]);
						arrayIndexes = value[1]; // the arrayIndexes will be a Object with form 0: "0", 1: "1"
						length = Number(value[2]);

						if (length == 0) 
						{
							$("#contractMessage").html(message);
							$("#contractMessage").show();
						}

						else if(length > 0)
						{
							var allData = "";

							$("#contractMessage").html(message);
							$("#contractMessage").show();

							for (var i = 0 ; i < length ; i++)
								intIndexes.push(parseInt(arrayIndexes[i]));

							for (var i = 0; i < intIndexes.length; i++) {
								var id_num = intIndexes[i];

								start_index = intIndexes[0];

								allData += '<br><h1 class="jumboHead" align="center"><b>Contract Number  - ' + id_num +
								'</b></h1><div align="center"><button type="button" class="getStarted2" id="showButton' + id_num + '" style="background: #3B4A66" value="' + id_num + '" onClick="reply_click(this.value)" >Show Contract</button></div>'

								+

								'<br><div id="contract' + id_num + '" style = "display: none;"><h1 class="jumboHead" style="margin-top: 1rem"><b>LandLord Details</b></h1><h1 class="jumboText"><b>Landlord Name</b></h1>' +
								'<h1 class="jumboText" id="landlordName' + id_num + '"></h1><h1 class="jumboText"><b>Landlord Aadhaar Number</b></h1><h1 class="jumboText" id="landlordAadhaar' + id_num + '"></h1>' +
								' <h1 class="jumboText"><b>Landlord Email</b></h1><h1 class="jumboText" id="landlordEmail' + id_num + '"></h1><br>'

								+

								'<h1 class="jumboHead" style="margin-top: 1rem"><b>Tenant Details</b></h1><h1 class="jumboText"><b>Tenant Name</b></h1>' +
								'<h1 class="jumboText" id="tenantName' + id_num + '"></h1><h1 class="jumboText"><b>Tenant Aadhaar Number</b></h1><h1 class="jumboText" id="tenantAadhaar' + id_num + '"></h1>' +
								'<h1 class="jumboText"><b>Tenant Email</b></h1><h1 class="jumboText" id="tenantEmail' + id_num + '"><br>'

								+

								'</h1><br><h1 class="jumboHead"><b>Property Details</b></h1><br><div align="center"><h1 class="jumboText" id="geoProp' + id_num + '"><b>Geographical Location of Property</b></h1>' +
								'<br><div style="width: 24rem; height: 28rem" class="geoLoc" id="map' + id_num + '"></div></div><br><h1 class="jumboText"><b>Property Address</b></h1>' +
								'<pre><h1 class="jumboText" id="propertyAddress' + id_num + '"></h1></pre><h1 class="jumboText"><b>Property Type</b></h1><h1 class="jumboText" id="propertyType' + id_num + '"></h1>' +
								'<h1 class="jumboText"><b>Start Date of the Contract</b></h1><h1 class="jumboText" id="startDate' + id_num + '"></h1><h1 class="jumboText"><b>End Date of the Contract</b></h1>' +
								'<h1 class="jumboText" id="endDate' + id_num + '"></h1><br><div align="right"><h1 class="jumboText"><b>Duration of Contract (in Months)</b></h1>' +
								'<h1 class="jumboText" id="duration' + id_num + '"></h1><h1 class="jumboText"><b>Rent Amount per Month (in Rupees)</b></h1><h1 class="jumboText" id="propertyRent' + id_num + '"></h1>' +
								'<h1 class="jumboText"><b>Security Deposit</b></h1><h1 class="jumboText" id="propertySecurity' + id_num + '"></h1><h1 class="jumboText"><b>Registration Fee</b></h1>' +
								'<h1 class="jumboText" id="registerFee' + id_num + '"></h1></div><h1 class="jumboHead"><b>Other Details</b></h1><br><div align="right"><h1 class="jumboText"><b>Check Real Contract</b></h1>' +
								'<h1 class="jumboText" id="ipfsUrl' + id_num + '">Currently not Supported</h1><h1 class="jumboText"><b>Square Foot Area of Property</b></h1><h1 class="jumboText" id="sqFt' + id_num + '"></h1>' +
								'<h1 class="jumboText"><b>Number of Rooms</b></h1><h1 class="jumboText" id="rooms' + id_num + '"></h1></div><br><h1 class="jumboText"><b>Other Terms of Agreement</b></h1>' +
								'<pre><h1 class="jumboText" id="extra' + id_num + '"></h1></pre><br><div align="center"><div class="alert alert-dark message" id="hashBlocks' + id_num + '" style="display: none;"><b>Transaction on EtherScan - <a href="" id="hashBlock"> Click Here</b></a></div>' +
								'<br><div class="alert alert-danger message" id="message' + id_num + '" style="font-weight: bold; display: none"></div><br><img src="extra/loader.gif" id="loader' + id_num + '" class="loader"></div>'

								+

								'<div align="center"><button type="button" class="getStarted2" id="payButton' + id_num + '" style="background: #44664e;" value="' + id_num + '" onClick="approve_click(this.value)">Approve Contract</button>' +
								'<br><button type="button" class="getStarted2" id="rejectButton' + id_num + '" style="background: #7C2E29" value="' + id_num + '" onClick="reject_click(this.value)">Reject Contract</button></div></div><hr></div>'

								var parties;
								var home;
								var miscellaneous;

								rentInfo.allParties(id_num, (function(error, result) {

									parties = (result);
									
									rentInfo.addressToPerson(parties[0], function(error, result) {

										landlord_name.push(result[1]);
										landlord_email.push(result[2]); 
										landlord_aadhaar.push(parseInt(result[3]));
									});

									rentInfo.addressToPerson(parties[1], function(error, result) {

										tenant_name.push(result[1]);
										tenant_email.push(result[2]);
										tenant_aadhaar.push(parseInt(result[3]));
									});

								}));


								rentInfo.allHouses(id_num, (function(error, result) {

									home = result;
									
									prop_address.push(home[0]);
									prop_type.push(home[1]);
									
									var startEpoch = new Date(parseInt(home[2]) * 1000);
									var endEpoch = new Date(parseInt(home[3]) * 1000);

									start.push(String(startEpoch));
									end.push(String(endEpoch));

									duration.push(parseInt(home[4]));
									rent.push(parseInt(home[5]));
									security.push(parseInt(home[6]));
									register.push(parseInt(home[7]));

								}));

								rentInfo.allOtherDetails(id_num, (function(error, result) {

									miscellaneous = result;
									
									lat.push(miscellaneous[0]);
									long.push(miscellaneous[1]);
									var value = JSON.stringify();
									sqft.push(parseInt(miscellaneous[3]));
									rooms.push(parseInt(miscellaneous[4]));
									extra.push(miscellaneous[5]);

								}));
							}

							$("#allContracts").append(allData);
							$('#allContracts').show();

						}
					});
}

});
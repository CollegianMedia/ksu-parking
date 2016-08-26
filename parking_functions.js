/*
 *	KSU Parking Garage Status Page
 *	http://www.collegianmedia.com/
 *	
 *	parking_functions.js
 *	
 */


/*
 * Function for alerts
 */ 
function parking_alert(the_alert) {
	jQuery('.alert').html(the_alert);
}


/*
 * Clean up the data if it is less than 8% or greater than 99%
 */
function cleanData(theData) {
	if (theData < 4) {
		return 4;
	}
	if (theData > 99) {
		return 100;
	}
	return theData;
}

/*
 * Reverse the Data to show number of spots available instead of number of spots taken.
 */
function reverseData(theData) {
	return (100 - cleanData(theData));
}


/*
 * Format the text representation of the data.
 */
function formattedData(theData) {
	if (theData > 95) {
		return "> 95% of spots available";
	}
	if (theData < 1) {
		return "No spots available"
	}
	return (theData + "% of spots available");
}


/*
 * Function to set the status bars
 */
function setPercentage(parkingType, thePercentage) {
	$('.' + parkingType + '-percentage').css('width', thePercentage + '%').removeClass('loading').removeClass('active').text("");
	$('.status-' + parkingType + '-text').text(formattedData(thePercentage));
	clearColors(parkingType);
	if (thePercentage > 40) {
		$('.' + parkingType + '-percentage').addClass('progress-bar-success');
	} else if (thePercentage < 5 ) {
		$('.' + parkingType + '-percentage').addClass('progress-bar-danger');
	} else {
		$('.' + parkingType + '-percentage').addClass('progress-bar-warning');
	}
}


/*
 * Function to remove all color classes
 */
function clearColors(parkingType) {
	$('.' + parkingType + '-percentage').removeClass('progress-bar-success').removeClass('progress-bar-warning').removeClass('progress-bar-danger');
}


/*
 * Function to check the status using the API
 */
 function check_status() {
	$.getJSON("https://m.k-state.edu/default/parking_garage/index.json?_object=kgoui_Rcontent_I0_Rcontent_I0&_object_include_html=1", function(parkingData) {
		var facultyPercent = reverseData(parkingData.response.regions[0].contents[0].fields.percentuse.value);
		var publicPercent = reverseData(parkingData.response.regions[0].contents[1].fields.percentuse.value);
		var studentPercent = reverseData(parkingData.response.regions[0].contents[2].fields.percentuse.value);
	
		setPercentage('student',studentPercent);
		setPercentage('public',publicPercent);
		setPercentage('faculty',facultyPercent);
	});
}
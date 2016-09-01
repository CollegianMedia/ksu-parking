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
 * Clean up the data if it is less than 1% or greater than 100%
 */
function cleanData(theData) {
	if (theData < 1) {
		return 1;
	}
	if (theData > 100) {
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
function formattedData(theData, totalSpots) {
	if (theData < 1) {
		return "No spots available"
	}
	return ("Approximately " + Math.floor((theData / 100.0) * totalSpots) +	" spots available");
}


/*
 * Function to set the status bars
 */
function setPercentage(parkingType, thePercentage, totalSpots) {
	$('.' + parkingType + '-percentage').css('width', thePercentage + '%').removeClass('loading').removeClass('active').text("");
	$('.status-' + parkingType + '-text').text(formattedData(thePercentage, totalSpots));
	clearColors(parkingType);
	if (thePercentage > 40) {
		$('.' + parkingType + '-percentage').addClass('progress-bar-success');
		$('.progress-' + parkingType).addClass('background-success');
		
	} else if (thePercentage < 5 ) {
		$('.' + parkingType + '-percentage').addClass('progress-bar-danger');
		$('.progress-' + parkingType).addClass('background-danger');
	} else {
		$('.' + parkingType + '-percentage').addClass('progress-bar-warning');
		$('.progress-' + parkingType).addClass('background-warning');
	}
}


/*
 * Function to remove all color classes
 */
function clearColors(parkingType) {
	$('.' + parkingType + '-percentage').removeClass('progress-bar-success').removeClass('progress-bar-warning').removeClass('progress-bar-danger');
	$('.progress-' + parkingType).removeClass('background-success').removeClass('background-danger').removeClass('background-warning');
}


/*
 * Function to check the status using the API
 */
 function check_status() {
	$.getJSON("http://www.kstatecollegian.com/parkingCheckNew.php", function(parkingData) {
		var publicPercent = reverseData(parkingData.response.regions[0].contents[0].fields.percentuse.value);
		var studentPercent = reverseData(parkingData.response.regions[0].contents[1].fields.percentuse.value);
		var facultyPercent = reverseData(parkingData.response.regions[0].contents[2].fields.percentuse.value);
	
		// According to https://www.k-state.edu/parking/garage/ there spots are as follows:
		
		var totalPublicSpots = 270;
		var totalStudentSpots = 500;
		var totalPreferredSpots = 400;
	
		setPercentage('student',studentPercent,totalStudentSpots);
		setPercentage('public',publicPercent,totalPublicSpots);
		setPercentage('faculty',facultyPercent,totalPreferredSpots);
	});
}
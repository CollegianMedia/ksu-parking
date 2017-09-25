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
 * Format the text representation of the data.
 */
function formattedData(spotsAvailable) {
	if (spotsAvailable < 1) {
		return "No spots available"
	}
	return ("Approximately " + spotsAvailable +	" spots available");
}


/*
 * Function to set the status bars
 */
function setPercentage(parkingType, spotsAvailable, totalSpots) {
	// Figure out the percentage of available spots
	thePercentage = (spotsAvailable / parseFloat(totalSpots)) *  100;

	// Set the width of the bar based on the percentage
	$('.' + parkingType + '-percentage').css('width', thePercentage + '%').removeClass('loading').removeClass('active').text("");

	// Set the text on that bar
	$('.status-' + parkingType + '-text').text(formattedData(spotsAvailable));

	// Clear any colors from the bar
	clearColors(parkingType);

	// Set the color of the bar
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
	$.getJSON("http://garage.ksucloud.net/resources?key=", function(parkingData) {
		$.each(parkingData.resources, function(index, item) {
			var setSelector;
			if (item.name == "Public") {
				setSelector = 'public';
			} else if (item.name == "Students") {
				setSelector = 'student';
			} else if (item.name == "Faculty and Staff") {
				setSelector = 'faculty';
			} else {
				parking_alert("Something seems to be wrong. Check back later.");
				console.log("Item in JSON response not as expected");
			}
			setPercentage(setSelector, item.available, item.total);
		});
	});
}

/*
 *	KSU Parking Garage Status Page
 *	http://www.collegianmedia.com/
 *	
 *  parking_functions.js
 *	
 *	Date: 2015-07-31
 */



// Function for setting status
function set_status(status_location, the_status) {
	remove_status(status_location);
	jQuery('p.status-' + status_location).html(the_status);
	jQuery('.status-' + status_location).addClass('status-' + the_status);
}
	
// Function to remove all statuses
function remove_status(status_location) {
	jQuery('.status-' + status_location).removeClass('status-unknown');
	jQuery('.status-' + status_location).removeClass('status-open');
	jQuery('.status-' + status_location).removeClass('status-full');
}

// Function for alerts
function parking_alert(the_alert) {
	jQuery('.alert').html(the_alert);
}

function check_status() {
	jQuery.getJSON("http://ron.spub.ksu.edu/", function(theStatus) {
		if (typeof theStatus.error != 'undefined') {
			parking_alert(theStatus.error);
		}
		set_status("student",theStatus.student);
		set_status("faculty",theStatus.faculty);
		set_status("public",theStatus.public);
	});
}
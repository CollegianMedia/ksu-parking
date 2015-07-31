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
	jQuery('p.' + status_location).html(the_status);
	jQuery('.' + status_location).addClass('status-' + the_status);
}
	
// Function to remove all statuses
function remove_status(status_location) {
	jQuery('.' + status_location).removeClass('status-unknown');
	jQuery('.' + status_location).removeClass('status-open');
	jQuery('.' + status_location).removeClass('status-full');
}

// Function for alerts
function parking_alert(the_alert) {
	jQuery('.alert').html(the_alert);
}
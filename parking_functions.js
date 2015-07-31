/*
 *	KSU Parking Garage Status Page
 *	http://www.collegianmedia.com/
 *	
 *  parking_functions.js
 *	
 *	Date: 2015-07-31
 */



// Function for setting status
function set_status(status-location, the-status) {
	remove_status(status-location);
	jQuery('p.' + status-location).html(the-status);
	jQuery('.' + status-location).addClass('status-' + the-status);
}
	
// Function to remove all statuses
function remove_status(status-location) {
	jQuery('.' + status-location).removeClass('status-unknown');
	jQuery('.' + status-location).removeClass('status-open');
	jQuery('.' + status-location).removeClass('status-full');
}

// Function for alerts
function parking_alert(the_alert) {
	jQuery('.alert').html(the_alert);
}
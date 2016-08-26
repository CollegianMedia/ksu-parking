check_status();
var seconds = 1;
function add() {
    seconds++;
    if (seconds == 1) {
    $('.last-checked').text('Last checked ' + seconds + ' second ago.');
    } else if (seconds == 10) {
    $('.last-checked').text('Checking...');
    } else {
    $('.last-checked').text('Last checked ' + seconds + ' seconds ago.');
    }
    timer();
}
function recheck() {
	check_status();
	seconds=0;
	reloadTimer();
}
function timer() {
    t = setTimeout(add, 1000);
}
function reloadTimer() {
    recheckTimer = setTimeout(recheck, 10000);
}
reloadTimer();
timer();
check_status();
var seconds = 5;
function subtract() {
    seconds--;
    if (seconds == 1) {
    $('.last-checked').text('Rechecking in ' + seconds + ' second.');
    } else if (seconds == 0) {
    $('.last-checked').text('Checking...');
    } else {
    $('.last-checked').text('Rechecking in ' + seconds + ' seconds.');
    }
    timer();
}
function recheck() {
	check_status();
	seconds=6;
	reloadTimer();
}
function timer() {
    t = setTimeout(subtract, 1000);
}
function reloadTimer() {
    recheckTimer = setTimeout(recheck, 6000);
}
reloadTimer();
timer();
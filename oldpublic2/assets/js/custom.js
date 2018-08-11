
$(document).ready(function() {
            
var clock;

$(document).ready(function() {
    // Grab the current date
    var currentDate = new Date("06/15/2018"); 

    // Set some date in the future. In this case, it's always Jan 1
    var futureDate  = new Date("08/15/2018");

    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    clock = $('.clock').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown: true
    });
});

});

var secondsPerMin= 60;
var minsPerHour = 60;
var hoursPerDay = 24;
var daysPerWeek =7;
var weeksPeryear = 52;
var secondsPerDay = secondsPerMin * minsPerHour * hoursPerDay;
document.write('There are ' + secondsPerDay + ' seconds in a day and ');
var yearsAlive = 25;
var secondsAlive= secondsPerDay * daysPerWeek * weeksPeryear * yearsAlive;
document.write('I\'ve been alive \for more than ' + secondsAlive + ' seconds!');

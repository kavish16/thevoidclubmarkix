var countDate = new Date('Jul 29, 2025 00:08:00').getTime();

function incognitoDaysLeft(){
    var today = new Date().getTime();
        timeLeft = countDate - today;

        var second = 1000;
        var minute = second * 60;
        var hour = minute * 60;
        var day = hour * 24;

        var d = Math.floor(timeLeft / (day));
        var h = Math.floor((timeLeft % (day)) / (hour));
        var m = Math.floor((timeLeft % (hour)) / (minute));
        var w = Math.floor((timeLeft % (minute)) / (second));
        

        document.getElementById('day').innerHTML = d;
        document.getElementById('hour').innerHTML = h;
        document.getElementById('minute').innerHTML = m;
        document.getElementById('second').innerHTML = w;
};

setInterval(function() {
    incognitoDaysLeft();
}, 1000);
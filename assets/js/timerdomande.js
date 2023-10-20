let progressElm = document.getElementsByClassName('progress')[0];
let circumference = 2 * Math.PI * progressElm.getAttribute('r');

progressElm.style.strokeDasharray = circumference;
progressElm.style.strokeDashoffset = circumference * 0;

let max = parseInt(document.getElementsByClassName('seconds')[0].textContent);
let seconds = max;

let secondsElm = document.getElementsByClassName('seconds')[0];

let timerId = setInterval(() => {
    seconds--;
    if(seconds <= 0)
        clearInterval(timerId);

    percentage = seconds/max * 100;
    progressElm.style.strokeDashoffset = -(circumference - (percentage/100) * circumference);

    secondsElm.textContent = seconds.toString().padStart(2, '0');
}, 1000);
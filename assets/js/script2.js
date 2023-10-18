let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let timer;

    async function fetchQuestions() {
        const response = await fetch('https://opentdb.com/api.php?amount=45&category=18&difficulty=easy');
        const data = await response.json();
        questions = data.results;
        shuffleArray(questions);
        visualizzaDomandaCorrente();
    }

    function risposta(opzione) {
        const currentQuestion = questions[currentQuestionIndex];

        if (opzione === currentQuestion.correct_answer) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            visualizzaDomandaCorrente();
        } else {
            const questionElement = document.querySelector('.titolo');
            const optionsElement = document.getElementById('formClick');
            const numDomandeElement = document.querySelector('.num_domande');

            questionElement.textContent = "Quiz completato. Punteggio finale: " + score + " su " + questions.length;
            optionsElement.style.display = "none";
            numDomandeElement.style.display = "none";
        }
        resetTimer();
    }

    function visualizzaDomandaCorrente() {
        const questionElement = document.querySelector('.titolo');
        const optionsElement = document.getElementById('formClick');
        const currentQuestion = questions[currentQuestionIndex];
        const numDomandeElement = document.querySelector('.num_domande');

        questionElement.textContent = currentQuestion.question;
        numDomandeElement.textContent = "QUESTION " + (currentQuestionIndex + 1) + "/" + questions.length;

        optionsElement.innerHTML = "";
        const allOptions = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
        shuffleArray(allOptions);
        allOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'bot1';
            button.textContent = option;
            button.onclick = () => risposta(option);
            optionsElement.appendChild(button);
        });
        startTimer();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startTimer() {
        const timerElement = document.querySelector('#timer span');
        timerElement.textContent = '60';

        timer = setInterval(() => {
            const remainingTime = parseInt(timerElement.textContent);
            if (remainingTime > 0) {
                timerElement.textContent = (remainingTime - 1).toString();
            } else {
                clearInterval(timer);
                risposta('');
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
    }

    fetchQuestions();


    var width = 400,
    height = 400,
    timePassed = 0,
    timeLimit = 30;

var fields = [{
    value: timeLimit,
    size: timeLimit,
    update: function () {
        return timePassed = timePassed + 1;
    }
}];

var nilArc = d3.svg.arc()
    .innerRadius(width / 3 - 133)
    .outerRadius(width / 3 - 133)
    .startAngle(0)
    .endAngle(2 * Math.PI);

var arc = d3.svg.arc()
    .innerRadius(width / 3 - 55)
    .outerRadius(width / 3 - 25)
    .startAngle(0)
    .endAngle(function (d) {
        return ((d.value / d.size) * 2 * Math.PI);
    });

var svg = d3.select(".container").append("svg")
    .attr("width", width)
    .attr("height", height);

var field = svg.selectAll(".field")
    .data(fields)
    .enter().append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("class", "field");

var back = field.append("path")
    .attr("class", "path path--background")
    .attr("d", arc);

var path = field.append("path")
    .attr("class", "path path--foreground");

var label = field.append("text")
    .attr("class", "label")
    .attr("dy", ".35em");

(function update() {
    

    if (timePassed <= timeLimit)
        setTimeout(update, 1000 - (timePassed % 1000));
    else
        destroyTimer();
})();
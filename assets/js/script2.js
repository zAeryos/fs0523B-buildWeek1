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
        numDomandeElement.textContent = "QUESTION " + (currentQuestionIndex + 1) + " / " + questions.length;
        numDomandeElement.innerHTML = `QUESTION <span>${currentQuestionIndex + 1}</span><span class="red"> / 45</span>`;
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
        risposta('');

    percentage = seconds/max * 100;
    progressElm.style.strokeDashoffset = -(circumference - (percentage/100) * circumference);

    secondsElm.textContent = seconds.toString().padStart(2, '0');
}, 1000);

    }

    function resetTimer() {
        clearInterval(timer);
    }

    fetchQuestions();


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


   
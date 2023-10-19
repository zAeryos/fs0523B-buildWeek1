let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questions = [];
let timer;

let risultato = "";
let success = document.querySelector(".middle-section");
let result1 = document.querySelector(".result1");
let result2 = document.querySelector(".result2");
let result3 = document.querySelector(".result3");
const myChart = document.getElementById("my-chart");

/* Funzione per aggiornare i risultati del test */
function updateTestResults() {
    const totalQuestions = questions.length;
    const testScore = (correctAnswers / totalQuestions) * 100;

    if (testScore >= 60) {
        result1.innerHTML = "Congratulations!";
        result2.innerHTML = "You passed the exam.";
        result2.classList.add("span_color");
        result3.innerHTML =
            "We'll send you the certificate in a few minutes. Check your email (including promotions / spam folder)";
    } else {
        result1.innerHTML = "We're sorry,";
        result2.innerHTML = "You failed the exam.";
        result2.classList.add("span_color2");
        result3.innerHTML =
            "You'll be contacted by your professor to try and fix your grades shortly";
    }

    // Create the chart for correct and incorrect answers
    const chartData = {
        labels: ["Correct", "Wrong"],
        data: [correctAnswers, incorrectAnswers],
    };

    new Chart(myChart, {
        type: "doughnut",
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: "Risultati",
                    data: chartData.data,
                },
            ],
        },
        options: {
            borderWidth: 0,
            borderRadius: 0,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });
}

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
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        visualizzaDomandaCorrente();
    } else {
        const questionElement = document.querySelector('.titolo');
        const optionsElement = document.getElementById('formClick');
        const numDomandeElement = document.querySelector('.num_domande');

        questionElement.textContent = "Quiz completed. Final score: " + correctAnswers + " correct out of " + questions.length;
        optionsElement.style.display = "none";
        numDomandeElement.style.display = "none";
        resetTimer();

        // Aggiorna i risultati del test alla fine del quiz
        updateTestResults();
    }
}

function visualizzaDomandaCorrente() {
    const questionElement = document.querySelector('.titolo');
    const optionsElement = document.getElementById('formClick');
    const currentQuestion = questions[currentQuestionIndex];
    const numDomandeElement = document.querySelector('.num_domande');

    questionElement.textContent = currentQuestion.question;
    numDomandeElement.textContent = "QUESTION " + (currentQuestionIndex + 1) + " / " + questions.length;
    numDomandeElement.innerHTML = `QUESTION <span>${currentQuestionIndex + 1}</span><span class="red"> / 45</span`;
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
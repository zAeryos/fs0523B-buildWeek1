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
    const result = document.getElementById("result");
    const options = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];

    if (opzione === currentQuestion.correct_answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        visualizzaDomandaCorrente();
    } else {
        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("option");

        questionElement.style.display = "none";
        optionsElement.style.display = "none";

        result.style.display = "block";
        result.textContent = "Quiz completato. Punteggio finale: " + score + " su " + questions.length;
    }
    resetTimer(); // Resettiamo il timer quando l'utente risponde
}

function visualizzaDomandaCorrente() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = "Domanda " + (currentQuestionIndex + 1) + ": " + currentQuestion.question;

    optionsElement.innerHTML = "";
    const allOptions = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    shuffleArray(allOptions);
    allOptions.forEach(option => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.textContent = option;
        button.onclick = () => risposta(option);
        optionsElement.appendChild(button);
    });
    startTimer(); // Avviamo il timer quando visualizziamo la nuova domanda
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    timer = setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            visualizzaDomandaCorrente();
        }
    }, 60000); // 60 secondi
}

function resetTimer() {
    clearTimeout(timer);
}

fetchQuestions();














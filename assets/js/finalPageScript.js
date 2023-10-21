 /* 
    WELCOME PAGE
 */

// Ritiro checkbox e bottone welcome page.
let input = document.querySelector(".checkbox");
let button = document.getElementById("proceed2");
let buttonGhost = document.querySelector(".buttontrasp");

// Aggiunta evento controllo checkbox per attivare il bottone.
input.addEventListener("change", stateHandle);

function stateHandle() {
    if (input.checked == false) {
        // Il bottone rimane bloccato.
        button.style.display = "none";
        buttonGhost.style.display = "block";
        buttonGhost.style.display = "visible";

    } else {
        // Rendo cliccabile il bottone.
        button.style.display = "block";
        button.style.visibility = "visible";
        buttonGhost.style.display = "none";
        
    }
}

// Al click del bottone nella welcome page, inizializzo il timer delle domande .
button.addEventListener("click", startTimer);

// Metto i container delle pagine in variabili.
let welcomePage = document.querySelector(".welcomePage");
let questionsPage = document.querySelector(".questionsPage");
let resultsPage = document.querySelector(".resultsPage");
let feedbackPage = document.querySelector(".feedbackPage");

// Al click del bottone nella welcome page, nascondo la prima pagina e mostro la seconda.
button.addEventListener("click", changePage);
function changePage() {
    welcomePage.style.display = "none";
    questionsPage.style.display = "block";
}

/* 
    QUESTIONS PAGE
*/

// Variabili per lo scoring delle domande, timer etc.
const questionElement = document.querySelector('.titolo');
const optionsElement = document.getElementById('formClick');
const numDomandeElement = document.querySelector('.num_domande');

// const numChosen = document.querySelector(".numChosen").valueAsNumber;
// const diffChosen = document.querySelector(".diffChosen").value;
// console.log(numChosen)
// console.log(diffChosen)


let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questions = [];
let timer;

optionsElement.addEventListener('click', (e) => {
    e.preventDefault();
})

// JSON per fetchare le domande per il test.
async function fetchQuestions() {

    const response = await fetch('https://opentdb.com/api.php?amount=45&category=18&difficulty=easy');
    const data = await response.json();
    questions = data.results;
    
    // Richiamo le funzioni per randomizzare e mostrare le domande.
    shuffleArray(questions);
    visualizzaDomandaCorrente();
}


// Gestisce lo score delle risposte.
function risposta(opzione) {
  const currentQuestion = questions[currentQuestionIndex];

  if (opzione === currentQuestion.correct_answer) {
    correctAnswers++;
}else {
  incorrectAnswers++;
}

// Mostro la nuova domanda.
currentQuestionIndex++;
if(currentQuestionIndex < questions.length) {
    visualizzaDomandaCorrente();
} else {
    
    // Seleziono gli elementi da nascondere.
    const timerElement = document.querySelector(".timer");
    const timerTextElement = document.querySelector(".time");

    // --
    optionsElement.style.display = "none";
    numDomandeElement.style.display = "none";
    timerElement.style.display = "none";
    timerTextElement.style.display = "none";
    questionsPage.style.display = "none";
    resultsPage.style.display = "block";

    clearPreviousTimer();
    updateTestResults();
  }
}

// Logica per mostrare una nuova domanda.
function visualizzaDomandaCorrente() {

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    numDomandeElement.textContent = "QUESTION " + (currentQuestionIndex + 1) + " / " + questions.length;
    numDomandeElement.innerHTML = `QUESTION <span>${currentQuestionIndex + 1}</span><span class="red"> / ${questions.length}</span>`;
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

    // Richiamo il timer una volta mostrata una nuova domanda.
    startTimer();
}

// Funzione per la randomizzazione delle domande.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Funzione per inizializzare il timer.
function startTimer() {

    // Prendo tutti gli elementi necessari in variabili e setto nuove variabili.
    const timerElement = document.querySelector('.time .seconds');
    const progressElm = document.getElementsByClassName('progress')[0];
    const max = 60;
    let percentage = 0;
    let circumference = 2 * Math.PI * progressElm.getAttribute('r');

    timerElement.textContent = max;
    progressElm.style.strokeDasharray = circumference;
    progressElm.style.strokeDashoffset = circumference * 0;

    // Richiamo la funzione per bloccare il timer precedente.
    clearPreviousTimer();


    // Controllo del tempo rimanente e gestione dello stile del donut.
    timer = setInterval(() => {
        let remainingTime = parseInt(timerElement.textContent);

        if (remainingTime > 1) {
 
            timerElement.textContent = --remainingTime;

            percentage = remainingTime / max * 100;
            progressElm.style.strokeDashoffset = -(circumference - (percentage / 100) * circumference);
        } else {
            clearPreviousTimer();
            risposta('');
        }
    }, 1000);
}

// Funzione per bloccare il timer precedentemente inizializzato.
function clearPreviousTimer() {
    clearInterval(timer);
}


// Richiamo la funzione per il fetch delle domande.
fetchQuestions();
clearPreviousTimer();

/* 
    RESULTS PAGE
*/

// Prendo le variabili e gli elementi necessari dalla pagina.
let rateUsButton = document.querySelector(".buttonRateUs")
let success = document.querySelector(".middle-section");
let result1 = document.querySelector(".result1");
let result2 = document.querySelector(".result2");
let result3 = document.querySelector(".result3");

let risultato = "";

const myChart = document.getElementById("my-chart");


// Creo e richiamo la funzione per cambiare il testo della pagina results in base allo score.
function updateTestResults() {
    const totalQuestions = questions.length;
    const testScore = (correctAnswers / totalQuestions) * 100;

    let correctQuestionsElement = document.querySelector(".question_summaryCorrect");
    let wrongQuestionsElement = document.querySelector(".question_summaryWrong"); 
    let correctPercentageElement = document.querySelector(".percentageCorrect");
    let wrongPercentageElement = document.querySelector(".percentageWrong");

    const percentageCorrect = (correctAnswers / totalQuestions) * 100;
    const percentageIncorrect = (incorrectAnswers / totalQuestions) * 100;

    correctPercentageElement.textContent = percentageCorrect.toFixed(1) + '%';
    wrongPercentageElement.textContent = percentageIncorrect.toFixed(1) + '%';
    correctQuestionsElement.textContent = correctAnswers + '/' + totalQuestions + ' questions';
    wrongQuestionsElement.textContent = incorrectAnswers + '/' + totalQuestions + ' questions';
  

    // questionElement.textContent = "Quiz completed. Final score: " + correctAnswers + " correct out of " + questions.length;

    // Se lo score del test è del 60% o superiore, congratulazioni!
    if (testScore >= 60) {

        result1.innerHTML = "Congratulations!";
        result2.innerHTML = "You passed the exam.";
        result2.classList.add("span_color");
        result3.innerHTML = "We'll send you the certificate in a few minutes. Check your email (including promotions / spam folder)";

    } else { // Altrimenti sei bocciato.

        result1.innerHTML = "We're sorry,";
        result2.innerHTML = "You failed the exam.";
        result2.classList.add("span_color2");
        result3.innerHTML = "You'll be contacted by your professor to try and fix your grades shortly";

    }

    

    // Chart con i dettagli delle domande sbagliate / corrette.
    const chartData = {
        labels: ["Wrong", "Correct"],
        data: [`${incorrectAnswers}`, `${correctAnswers}`],
    };

    // Creazione del chart.
    new Chart(myChart, {
        type: "doughnut",
        data: {
        labels: chartData.labels,
            datasets: [
                {
                label: "Risultati",
                data: chartData.data,
                backgroundColor: ["#D20094", "#00FFFF"],
                },
            ],
        },
        options: {
            borderWidth: 0,
            borderRadius: 0,
            cutout: 210,
            radius: 210,
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    });
}

rateUsButton.addEventListener("click", resultsToFeedback)

function resultsToFeedback() {
    resultsPage.style.display = "none";
    feedbackPage.style.display = "block";
}
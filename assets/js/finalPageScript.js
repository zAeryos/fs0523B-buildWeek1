

//Ingresso Welcome Page
let input = document.querySelector(".checkbox");
let button = document.getElementById("proceed2");
let buttonGhost = document.querySelector(".buttontrasp")

input.addEventListener("change", stateHandle);

function stateHandle() {
    if (input.checked == false) {

        button.style.display = "none";
        buttonGhost.style.display = "block";
        buttonGhost.style.display = "visible";

    } else {

        button.style.display = "block";
        button.style.visibility = "visible";
        buttonGhost.style.display = "none";
        
    }
}

button.addEventListener("click", startTimer);

//Ingresso Question Page 
let containWelcome = document.querySelector(".container");
let containQuestion = document.querySelector(".contenin2");

button.addEventListener("click", changePage);

function changePage() {
    containWelcome.style.display = "none";
    containQuestion.style.display = "block";
}

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

function updateTestResults() {
const totalQuestions = questions.length;
const testScore = (correctAnswers / totalQuestions) * 100;

if (testScore >= 60) {
  result1.innerHTML = "Congratulations!";
    result2.innerHTML = "You passed the exam.";
     result2.classList.add("span_color");
    result3.innerHTML = "We'll send you the certificate in a few minutes. Check your email (including promotions / spam folder)";
}else{
  result1.innerHTML = "We're sorry,";
    result2.innerHTML = "You failed the exam.";
      result2.classList.add("span_color2");
      result3.innerHTML = "You'll be contacted by your professor to try and fix your grades shortly";
  }


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
}else {
  incorrectAnswers++;
}

currentQuestionIndex++;

if(currentQuestionIndex < questions.length) {
    visualizzaDomandaCorrente();
}else{
    const questionElement = document.querySelector('.titolo');
  const optionsElement = document.getElementById('formClick');
    const numDomandeElement = document.querySelector('.num_domande');

  questionElement.textContent = "Quiz completed. Final score: " + correctAnswers + " correct out of " + questions.length;
    optionsElement.style.display = "none";
  numDomandeElement.style.display = "none";

  clearPreviousTimer();

  
  }
}

function visualizzaDomandaCorrente() {
    const questionElement = document.querySelector('.titolo');
    const optionsElement = document.getElementById('formClick');
    const currentQuestion = questions[currentQuestionIndex];
    const numDomandeElement = document.querySelector('.num_domande');

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

    startTimer();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    const timerElement = document.querySelector('.time .seconds');
    const progressElm = document.getElementsByClassName('progress')[0];
    const max = 60;
    let percentage = 0;
    let circumference = 2 * Math.PI * progressElm.getAttribute('r');

    timerElement.textContent = max;
    progressElm.style.strokeDasharray = circumference;
    progressElm.style.strokeDashoffset = circumference * 0;

    clearPreviousTimer();

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

function clearPreviousTimer() {
    clearInterval(timer);
}

fetchQuestions();
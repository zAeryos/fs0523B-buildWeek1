let risultato = "";
let success = document.querySelector(".middle-section");
let result1 = document.querySelector(".result1");
let result2 = document.querySelector(".result2");
let result3 = document.querySelector(".result3");

/* prova % testo*/

let testScore = 40;

function testResults() {
  if (testScore >= 60) {
    result1.innerHTML = "Congratulations!";
    result2.innerHTML = "You passed the exam.";
    result2.classList.add("span_color");
    result3.innerHTML =
      "We'll send you the certificate in few minutes. Check your email (including promotions / spam folder)";
  } else {
    result1.innerHTML = "We're sorry,";
    result2.innerHTML = "You failed the exam.";
    result2.classList.add("span_color2");
    result3.innerHTML =
      "You'll be contacted by your professor to try and fix your grades shortly";
  }
}

let domandeCorrette = 10;
let domandeSbagliate = 20;

const canvas = document.getElementById("my-chart");

const charData = {
  labels: ["Correct", "Wrong"],
  data: [`${domandeCorrette}`, `${domandeSbagliate}`],
};

const myChart = document.getElementById("my-chart");

new Chart(myChart, {
  type: "doughnut",

  data: {
    labels: charData.labels,

    datasets: [
      {
        label: "Risultati",
        data: charData.data,
      },
    ],
  },
  options: {
    cutout: 110,
    borderWidth: 0,
    borderRadius: 0,

    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

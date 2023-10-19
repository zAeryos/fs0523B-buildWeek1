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
    result1.innerHTML = "";
    result2.innerHTML = "You failed the exam.";
    result2.classList.add("span_color2");
    result3.style.display = "none";
  }
}

//Ingresso Welcome Page
document.addEventListener("DOMContentLoaded", (event) => {

let input = document.querySelector(".checkbox");
let button = document.getElementById("proceed2");
let buttonGhost = document.querySelector(".buttontrasp")

input.addEventListener("change", stateHandle);

function stateHandle() {
if (input.checked == false){
    button.style.display = "none";
    buttonGhost.style.display = "block";
    buttonGhost.style.display = "visible";
  } else{
    button.style.display = "block";
    button.style.visibility = "visible";
    buttonGhost.style.display = "none";
}
}
//Ingresso Question Page 
let containWelcome = document.querySelector(".container");
let containQuestion = document.querySelector(".contenin2");

button.addEventListener("click", changePage);

function changePage() {
  containWelcome.style.display = "none";
  containQuestion.style.display = "block";
  }
})
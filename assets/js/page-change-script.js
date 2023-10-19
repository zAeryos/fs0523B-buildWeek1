let cont1 = document.getElementById("container1");
let cont2 = document.getElementById("contenin2");
let input = document.querySelector(".checkbox");
let button = document.getElementById("proceed2");

input.addEventListener("change", stateHandle);

function stateHandle() {
      if (input.checked == false) {
            button.style.display = "none";
      } else {
            button.style.display = "block";
            button.style.visibility = "visible";
      }
}

button.addEventListener("click", cambioPagina);

function cambioPagina() {
      if (input.checked == false) {
            cont2.style.display = "none";
      } else {
            button.style.display = "block";
            button.style.visibility = "visible";
      }
}
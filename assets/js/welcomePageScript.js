let input = document.querySelector(".checkbox");
let button = document.getElementById("proceed2");

input.addEventListener("change", stateHandle);

function stateHandle() {
if (input.checked == false){
    button.style.display = "none";
  } else{
    button.style.display = "block";
    button.style.visibility = "visible";
}
}


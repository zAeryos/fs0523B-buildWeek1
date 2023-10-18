// valore di valutazione a 0/
let rating = 0;

// recuperiamo le stelle e le mettiamo un in array

const stars = document.querySelectorAll(".rating-star");
const ratingValue = document.getElementById("rating-value")

// gestore di eventi alle stelle /
stars.forEach((star) => {
  star.addEventListener("mouseover", hoverStar);
  star.addEventListener("mouseout", resetStars);
  star.addEventListener("click", clickStar);
});

// Funzione per gestire il passaggio del mouse su una stella /
function hoverStar(event) {
  const hoveredStar = event.target;
  const hoveredRating = parseInt(hoveredStar.getAttribute("data-rating"));
  highlightStars(hoveredRating);
}

// ripristina il colore delle stelle al passaggio del mouse /
function resetStars() {
  highlightStars(rating);
}

// evidenzia le stelle fino a una stella specifica /
function highlightStars(numStars) {
  stars.forEach((star, index) => {
    if (index < numStars) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

// gestisce il click su una stella/
function clickStar(event) {
  rating = parseInt(event.target.getAttribute("data-rating"));
  ratingValue.textContent = `Valutazione: ${rating}`;
}

// stelle vuote all'avvio/
resetStars();


/* 
  Tasto della welcome page

  Funzione per passare da pagina a pagina cancellando tutto il contenuto e crearne nuovo

  Timer

  Feedback rating

  Funzione su selezione domanda che sblocca il pulsante per andare avanti

*/
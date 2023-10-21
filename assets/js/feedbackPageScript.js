// Recupero gli elementi dall'HTML e creo una variabile per il rating dell'utente
const feedbackForm = document.getElementById('feedback-form');
const stars = document.querySelectorAll('.rating-star');
const userInput = document.getElementById('userInput');
let userRating = 0;

// Funzione per evidenziare le stelle fino a un determinato indice
function highlightStars(index) {
    stars.forEach((star, i) => {
        if (i <= index) {
            star.classList.add('highlighted');
        } else {
            star.classList.remove('highlighted');
        }
    });
}
// Funzione per evidenziare le stelle fino a un determinato indice e lasciarlo colorato
function highlightStarsClicked(index) {
    stars.forEach((star, i) => {
        if (i <= index) {
            star.classList.add('highlighted-clicked');
        } else {
            star.classList.remove('highlighted-clicked');
        }
    });
}

// Funzione per rimuovere l'evidenziazione delle stelle
function resetStars() {
    stars.forEach((star) => {
        star.classList.remove('highlighted');
    });
}

// Gestore di eventi per le stelle
stars.forEach((star, index) => {

    // Quando vai con il mouse sopra, le stelle saranno evidenziate
    star.addEventListener('mouseover', () => {
        highlightStars(index);
    });

    // Quando il mouse uscirà dalle stelle, si svuoteranno
    star.addEventListener('mouseout', () => {
        resetStars();
    })

    // Quando clicchi su una stella, le stelle fino a quell'index rimarranno 
    // evidenziate + il rating dello user sarà salvato in una variabile
    star.addEventListener('click', () => {
        userRating = index + 1;
        highlightStarsClicked(index);
    });

});

// Gestore di eventi per il form di feedback
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedbackText = userInput.value;
    console.log(`Rating: ${userRating}, Feedback: ${feedbackText}`);
});

/* 
    TO-DO LIST

  Funzione per passare da pagina a pagina cancellando tutto il contenuto e crearne nuovo

  Timer

  Funzione su selezione domanda che sblocca il pulsante per andare avanti

*/
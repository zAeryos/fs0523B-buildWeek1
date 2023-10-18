const stars = document.querySelectorAll('.rating-star');
const feedbackForm = document.getElementById('feedback-form');
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

// Gestore di eventi per le stelle
stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
        highlightStars(index);
    });

    star.addEventListener('click', () => {
        userRating = index + 1;
        highlightStars(index);
    });
});

// Gestore di eventi per il form di feedback
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedbackText = userInput.value;
    console.log(`Rating: ${userRating}, Feedback: ${feedbackText}`);
});
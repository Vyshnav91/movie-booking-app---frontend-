document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = localStorage.getItem('username');
        const movieId = parseInt(localStorage.getItem('currentMovieId'));
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const phoneNumber = document.getElementById('phone-number').value;

        // Assuming storing user details in localStorage
        let userDetails = JSON.parse(localStorage.getItem(`userDetails_${username}`)) || {};
        userDetails = { firstName, lastName, phoneNumber };
        localStorage.setItem(`userDetails_${username}`, JSON.stringify(userDetails));

        let bookedMovies = JSON.parse(localStorage.getItem(`bookedMovies_${username}`)) || [];
        if (!bookedMovies.includes(movieId)) {
            bookedMovies.push(movieId);
            localStorage.setItem(`bookedMovies_${username}`, JSON.stringify(bookedMovies));
        }

        // Redirect back to the movies page
        window.location.href = 'index.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const movieId = localStorage.getItem('bookingMovieId');
    document.getElementById('movie-id').value = movieId;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let bookedMovies = JSON.parse(localStorage.getItem('bookedMovies')) || [];
        if (!bookedMovies.includes(movieId)) {
            bookedMovies.push(movieId);
            localStorage.setItem('bookedMovies', JSON.stringify(bookedMovies));
        }
        window.location.href = 'index.html';
    });
});

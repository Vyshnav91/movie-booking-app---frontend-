document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('username-display').textContent = `Welcome, ${username}`;

    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });

    const movies = [
        { id: 1, title: 'The Shawshank Redemption', img: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg', available: 5 },
        { id: 2, title: 'Spider-Man: Across the Spider-Verse', img: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg', available: 3 },
        { id: 3, title: 'The Dark Knight', img: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg', available: 7 },
        { id: 4, title: 'Inside Out 2', img: 'https://m.media-amazon.com/images/M/MV5BYTc1MDQ3NjAtOWEzMi00YzE1LWI2OWUtNjQ0OWJkMzI3MDhmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg', available: 4 },
        { id: 5, title: 'Inception', img: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', available: 5 },
        { id: 6, title: 'Interstellar', img: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', available: 3 },
        { id: 7, title: 'The Matrix', img: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', available: 7 },
        { id: 8, title: 'The Godfather', img: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg', available: 4 },
        { id: 9, title: 'The Lord of the Rings: The Return of the King', img: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg', available: 5 },
        { id: 10, title: 'The Avengers', img: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', available: 3 },
        { id: 11, title: 'Titanic', img: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg', available: 7 },
        { id: 12, title: 'Jurassic Park', img: 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg', available: 4 },
    ];

    let currentPage = 0;
    const moviesPerPage = 4;

    const moviesDiv = document.getElementById('movies');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    function displayMovies(page) {
        moviesDiv.innerHTML = '';
        const start = page * moviesPerPage;
        const end = start + moviesPerPage;
        const moviesToShow = movies.slice(start, end);

        moviesToShow.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';
            movieElement.innerHTML = `
                <img src="${movie.img}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <button class="btn book-btn" data-movie-id="${movie.id}">Book Seat</button>
                <button class="btn-unbook unbook-btn" data-movie-id="${movie.id}" style="display: none;">Unbook</button>
            `;
            moviesDiv.appendChild(movieElement);
        });

        updateBookedButtons();
    }

    function updateButtons() {
        prevButton.style.display = currentPage === 0 ? 'none' : 'block';
        nextButton.style.display = currentPage === Math.floor(movies.length / moviesPerPage) - 1 ? 'none' : 'block';
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayMovies(currentPage);
            updateButtons();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < Math.floor(movies.length / moviesPerPage) - 1) {
            currentPage++;
            displayMovies(currentPage);
            updateButtons();
        }
    });

    displayMovies(currentPage);
    updateButtons();

    function bookTicket(movieId) {
        localStorage.setItem('currentMovieId', movieId);
        window.location.href = 'form.html';
    }

    function unbookTicket(movieId) {
        let bookedMovies = JSON.parse(localStorage.getItem(`bookedMovies_${username}`)) || [];
        bookedMovies = bookedMovies.filter(id => id !== movieId);
        localStorage.setItem(`bookedMovies_${username}`, JSON.stringify(bookedMovies));
        displayMovies(currentPage);
    }

    function updateBookedButtons() {
        const bookedMovies = JSON.parse(localStorage.getItem(`bookedMovies_${username}`)) || [];
        document.querySelectorAll('.book-btn').forEach(button => {
            const movieId = parseInt(button.getAttribute('data-movie-id'));
            if (bookedMovies.includes(movieId)) {
                button.textContent = 'Movie Booked';
                button.style.backgroundColor = 'green';
                button.style.cursor = 'default';
                button.nextElementSibling.style.display = 'inline-block';
                button.removeEventListener('click', handleBookClick);
            } else {
                button.textContent = 'Book Seat';
                button.style.backgroundColor = '#007bff';
                button.style.cursor = 'pointer';
                button.addEventListener('click', handleBookClick);
                button.nextElementSibling.style.display = 'none';
            }
        });

        document.querySelectorAll('.unbook-btn').forEach(button => {
            const movieId = parseInt(button.getAttribute('data-movie-id'));
            if (bookedMovies.includes(movieId)) {
                button.style.display = 'inline-block';
                button.addEventListener('click', handleUnbookClick);
            } else {
                button.style.display = 'none';
                button.removeEventListener('click', handleUnbookClick);
            }
        });
    }

    function handleBookClick(event) {
        const movieId = parseInt(event.target.getAttribute('data-movie-id'));
        bookTicket(movieId);
    }

    function handleUnbookClick(event) {
        const movieId = parseInt(event.target.getAttribute('data-movie-id'));
        unbookTicket(movieId);
    }

    document.addEventListener('DOMContentLoaded', updateBookedButtons);
});

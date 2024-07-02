document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    });
});

// Function to show the login section
function showLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
}

// Function to show the register section
function showRegister() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve user data from localStorage (for demo purposes)
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        alert("Login successful!");
        // Redirect to visitor-homepage.html
        window.location.href = 'visitor-homepage.html';
    } else {
        alert("Invalid email or password!");
    }
});

// Handle register form submission
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Save user data to localStorage (for demo purposes)
    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert("Registration successful! You can now login.");
    showLogin(); // Redirect to login page
});

// Show login page by default when the page loads
showLogin();
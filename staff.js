// Handle login form submission
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const staffId = document.getElementById('staffId').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        // Retrieve user data from localStorage (for demo purposes)
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.staffId === staffId && user.password === password) {
            alert("Login successful!");
            window.location.href = "staff_homepage.html"; // Redirect to home page
        } else {
            alert("Invalid Staff ID or Password!");
        }
    });
}

// Handle register form submission
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const staffId = document.getElementById('staffId').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Simple password length validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        // Save user data to localStorage (for demo purposes)
        const user = { staffId, password };
        localStorage.setItem('user', JSON.stringify(user));

        alert("Registration successful! You can now login.");
        window.location.href = "login.html"; // Redirect to login page
    });
}
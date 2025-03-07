document.addEventListener('DOMContentLoaded', function () {
    // Handle login form submission
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const staffId = document.getElementById('staffId').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            // Retrieve user data from localStorage (for demo purposes)
            const user = JSON.parse(localStorage.getItem('user'));

            // Default credentials
            const defaultUser = { staffId: 'S001', password: 'abc123456' };

            // Check if user exists in localStorage, otherwise use default credentials
            const validUser = user || defaultUser;

            if (validUser.staffId === staffId && validUser.password === password) {
                alert("Login successful!");
                window.location.href = "staff_homepage.html"; // Redirect to home page
            } else {
                alert("Invalid Staff ID or Password!");
            }
        });
    }
});

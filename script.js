async function fetchConfessions() {
    try {
        const response = await fetch("http://localhost:3000/confessions");
        const confessions = await response.json();
        console.log(confessions);

        // Display confessions on the page
        const confessionsContainer = document.getElementById("confessions-list");
        confessionsContainer.innerHTML = ""; // Clear previous data

        confessions.forEach((confession) => {
            const div = document.createElement("div");
            div.innerHTML = `<strong>Message:</strong> ${confession.message} <br> 
                             <strong>Company:</strong> ${confession.company} <br>
                             <strong>By:</strong> ${confession.user} <br>
                             <strong>Timestamp:</strong> ${new Date(confession.timestamp * 1000).toLocaleString()} <hr>`;
            confessionsContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching confessions:", error);
    }
}

async function postConfession(message, company) {
    const response = await fetch("http://localhost:3000/confess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, company })
    });
    const data = await response.json();
    console.log(data);
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
        window.location.href = "index.html"; // Redirect to login page
    });
}

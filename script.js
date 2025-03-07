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

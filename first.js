// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get the Staff button
    const staffButton = document.querySelector('.staff-button');

    // Add a click event listener to the Staff button
    staffButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href = 'staff-login.html'; // Redirect to staff-login.html
    });

    // Get the Visitor button
    const visitorButton = document.querySelector('.visitor-button');

    // Add a click event listener to the Visitor button
    visitorButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href = 'login_register.html'; // Redirect to visitor.html
    });
});
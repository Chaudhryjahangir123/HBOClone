//<----------------------> below is java for another page
function validateForm() {
    const password = document.getElementById('password').value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, letters and numbers

    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and include both letters and numbers.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

// Combined function to validate and redirect
function validateAndRedirect() {
    console.log("Validating form...");
    if (validateForm()) {
        console.log("Validation passed. Redirecting...");
        redirectToHome(); // Call redirect function if validation passes
        return false; // Prevent form submission to server
    }
    console.log("Validation failed.");
    return false; // Prevent form submission if validation fails
}

// Redirect function to be called upon form submission
function redirectToHome() {
    window.location.href = 'home.html'; // Redirect to mainhome.html
}
// Function to handle form submission
function handleSubmit() {
    // You can add email validation here if needed
    const email = document.getElementById('email').value.trim();

    if (email) {
        // Redirect to the login page
        window.location.href = 'login.html';
        return false; // Prevent form submission
    }

    return false; // Prevent form submission if no email is provided
}
function validateName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

function validateUsername(username) {
    return username.length >= 4 && !username.includes(' ');
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}

function handleSubmit() {
    // Collect form values
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // First Name and Last Name validation: must not contain numbers or special characters
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName)) {
        alert("First Name should only contain letters.");
        return false;
    }
    if (!nameRegex.test(lastName)) {
        alert("Last Name should only contain letters.");
        return false;
    }

    // Username validation: at least 4 characters, no spaces
    if (username.length < 4 || username.includes(' ')) {
        alert("Username must be at least 4 characters long and contain no spaces.");
        return false;
    }

    // Email validation: valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Password validation: at least 8 characters, includes a number and a special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and include at least one number and one special character.");
        return false;
    }

    // If all validations pass, redirect to login.html
    alert("Account created successfully! Redirecting to login...");
    window.location.href = "login.html";
    return false; // Prevent form submission to server
}

module.exports = { handleSubmit, validateName, validateUsername, validateEmail, validatePassword };

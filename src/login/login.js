// Theme
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Forms
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

// Toggle forms
showRegister.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    clearErrors();
});

showLogin.addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    clearErrors();
});

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;

// Helpers
function isEmail(value) {
    return emailRegex.test(value);
}

function isUsername(value) {
    return usernameRegex.test(value);
}

function clearErrors() {
    document
        .querySelectorAll(".error")
        .forEach(error => error.textContent = "");
}

function setError(id, message) {
    document
        .getElementById(id)
        .textContent = message;
}

// Login Validation
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let valid = true;

    const identifier = document
        .getElementById("login-identifier")
        .value
        .trim();

    const password = document
        .getElementById("login-password")
        .value;

    if (!isEmail(identifier) && !isUsername(identifier)) {
        setError(
            "login-identifier-error",
            "Invalid email or username."
        );
        valid = false;
    }

    if (password.length < 4) {
        setError(
            "login-password-error",
            "Password must contain at least 4 characters."
        );
        valid = false;
    }

    if (!valid) {
        return;
    }

    /*
    TODO

    fetch("/api/auth/login", {
        method: "POST"
    });
    */
});

// Register Validation
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let valid = true;

    const identifier = document
        .getElementById("register-identifier")
        .value
        .trim();

    const name = document
        .getElementById("register-name")
        .value
        .trim();

    const password = document
        .getElementById("register-password")
        .value;

    if (!isEmail(identifier) && !isUsername(identifier)) {
        setError(
            "register-identifier-error",
            "Invalid email or username."
        );
        valid = false;
    }

    if (name.length < 3) {
        setError(
            "register-name-error",
            "Name must contain at least 3 characters."
        );
        valid = false;
    }

    if (password.length < 4) {
        setError(
            "register-password-error",
            "Password must contain at least 4 characters."
        );
        valid = false;
    }

    if (!valid) {
        return;
    }

    /*
    TODO

    fetch("/api/auth/register", {
        method: "POST"
    });
    */
});
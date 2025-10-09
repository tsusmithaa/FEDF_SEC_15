document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myForm");
    const fullName = document.getElementById("fullname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const phone = document.getElementById("phone");

    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const phoneError = document.getElementById("phoneError");
    const successMessage = document.getElementById("successMessage");

    // Utility function to show error
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add("invalid");
        input.classList.remove("valid");
    }

    // Utility function to show valid state
    function showValid(input, errorElement) {
        errorElement.textContent = "";
        input.classList.add("valid");
        input.classList.remove("invalid");
    }

    // Full Name Validation
    fullName.addEventListener("input", () => {
        if (fullName.value.trim() === "") {
            showError(fullName, fullNameError, "Full name is required");
        } else {
            showValid(fullName, fullNameError);
        }
    });

    // Email Validation
    email.addEventListener("input", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            showError(email, emailError, "Email is required");
        } else if (!emailRegex.test(email.value)) {
            showError(email, emailError, "Enter a valid email address");
        } else {
            showValid(email, emailError);
        }
    });

    // Password Validation (strength check)
    password.addEventListener("input", () => {
        const value = password.value;
        if (value === "") {
            showError(password, passwordError, "Password is required");
        } else if (value.length < 6) {
            showError(password, passwordError, "Password is too short");
        } else {
            // Password strength check
            const strongPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
            const mediumPassword = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

            if (strongPassword.test(value)) {
                passwordError.textContent = "Strong password ✔️";
                passwordError.style.color = "green";
                password.classList.add("valid");
                password.classList.remove("invalid");
            } else if (mediumPassword.test(value)) {
                passwordError.textContent = "Medium strength password ⚠️";
                passwordError.style.color = "orange";
                password.classList.add("valid");
                password.classList.remove("invalid");
            } else {
                showError(password, passwordError, "Weak password ❌");
            }
        }
    });

    // Phone Validation
    phone.addEventListener("input", () => {
        const phoneRegex = /^[0-9]{10}$/;
        if (phone.value.trim() === "") {
            showError(phone, phoneError, "Phone number is required");
        } else if (!phoneRegex.test(phone.value)) {
            showError(phone, phoneError, "Enter a valid 10-digit phone number");
        } else {
            showValid(phone, phoneError);
        }
    });

    // Form Submit Validation
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent form from submitting

        // Trigger validation on submit
        fullName.dispatchEvent(new Event("input"));
        email.dispatchEvent(new Event("input"));
        password.dispatchEvent(new Event("input"));
        phone.dispatchEvent(new Event("input"));

        const isValid =
            fullName.classList.contains("valid") &&
            email.classList.contains("valid") &&
            password.classList.contains("valid") &&
            phone.classList.contains("valid");

        if (isValid) {
            successMessage.textContent = "Form submitted successfully! ✅";
            successMessage.style.color = "green";
            form.reset();

            // Remove all validation classes after reset
            [fullName, email, password, phone].forEach((input) => {
                input.classList.remove("valid", "invalid");
            });
        } else {
            successMessage.textContent = "";
        }
    });
});

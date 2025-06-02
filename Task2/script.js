document.querySelector('form').addEventListener('submit', function(event) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    let isValid = true;

    // Basic required field validation
    if (nameInput.value.trim() === '') {
        alert('Name is required.');
        isValid = false;
    }

    if (emailInput.value.trim() === '') {
        alert('Email is required.');
        isValid = false;
    }

    // Email format validation (basic regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() !== '' && !emailPattern.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if invalid
    }
}); 
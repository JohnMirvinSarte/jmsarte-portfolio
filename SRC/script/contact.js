// Initialize EmailJS with your public key
(function() {
    emailjs.init("wtZf1YqQy5NryNSDY"); // Replace with your actual public key
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading animation
    const submitButton = document.getElementById('contact-submit');
    submitButton.classList.add('loading');
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        document.querySelector('.error').style.display = 'flex';
        submitButton.classList.remove('loading');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.querySelector('.email-error').style.display = 'flex';
        submitButton.classList.remove('loading');
        return;
    }

    // Hide any previous errors
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.email-error').style.display = 'none';

    // Send email using EmailJS
    emailjs.send(
        'service_vum2x8f', //  EmailJS service ID
        'template_erunyep', // Replace with your template ID
        {
            from_name: name,
            from_email: email,
            message: message
        }
    ).then(function() {
        // Show success message
        document.querySelector('.contact-submit-after').style.display = 'flex';
        submitButton.classList.remove('loading');
        
        // Reset form
        document.getElementById('contact-form').reset();
    }, function(error) {
        console.error('Failed to send email:', error);
        submitButton.classList.remove('loading');
    });
});

// Handle success message close button
document.querySelector('.csa-ok').addEventListener('click', function() {
    document.querySelector('.contact-submit-after').style.display = 'none';
});

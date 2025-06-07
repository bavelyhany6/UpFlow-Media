document.addEventListener("DOMContentLoaded", function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const whatsappBtn = document.getElementById("whatsappBtn");

    function checkScroll() {
        if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
            scrollToTopBtn.style.display = "block";
            whatsappBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
            whatsappBtn.style.display = "none";
        }
    }

    let isScrolling; // Variable to track the scroll state

    window.onscroll = function() {
        if (isScrolling) {
            cancelAnimationFrame(isScrolling);
        }

        isScrolling = requestAnimationFrame(checkScroll);
    };

    // Scroll to the top of the document when the user clicks on the scroll-to-top button
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // For smooth scrolling
        });
    });

    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            // Prepare template parameters
            const templateParams = {
                from_name: contactForm.querySelector('#name').value,
                from_email: contactForm.querySelector('#email').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value,
                to_email: 'bavelyhany909@gmail.com'
            };

            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    // Show success message
                    formMessage.classList.remove('d-none', 'alert-danger');
                    formMessage.classList.add('alert-success');
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Show error message
                    formMessage.classList.remove('d-none', 'alert-success');
                    formMessage.classList.add('alert-danger');
                    formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
                })
                .finally(function() {
                    // Restore button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
});

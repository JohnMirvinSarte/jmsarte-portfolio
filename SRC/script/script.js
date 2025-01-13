let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.toggle('open');
	navbar.style.zIndex = navbar.classList.contains('open') ? "1000" : "";
}

navtc.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.remove('open');
	navtc.classList.remove('nav-touch-close-open');
	navtc.classList.remove("nav-tc-z");
	navtc.classList.remove("nav-LR-TC");
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;

	document.getElementById("header").classList.add('scrolled');
	if (currentScrollPos === 0) {
		// console.log("Hello");
		document.getElementById("header").classList.remove('scrolled');
	}
	if (navtc.classList.contains('nav-touch-close-open')) {
		return;
	}
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("header").style.top = "0";
	} else {
		document.getElementById("header").style.top = "-100px";
	}
	prevScrollpos = currentScrollPos;
}


const contactSection = document.querySelector('.contact-section');
const formSection = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');


const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');

if (csaOK) {
	csaOK.onclick = () => {
		contactSubmitAfter.classList.remove('show');
		formSection.classList.remove('hide');
		contactSection.classList.remove('csa-cs');
		contactForm.classList.remove('csa-cf');
		contactButton.classList.remove('loading');
		contactLoad.classList.remove('show');
		submitText.classList.remove('hide');
		// contactSubmitAfter.classList.add('hide');
	}
}

// Function to validate the form
function validateForm(event) {
	event.preventDefault(); // Prevent the form from submitting
	let isValid = true;
	emailIsValid = true;
	nameIsValid = true;
	messageIsValid = true;

	// Check if Name field is empty
	if (nameInput.value.trim() === '') {
		isValid = false;
		nameIsValid = false;
	}

	// Check if Email field is empty or not a valid email address
	if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
		isValid = false;
		if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value)) {
			emailIsValid = false;
		}
	}

	// Check if Message field is empty
	if (messageInput.value.trim() === '') {
		isValid = false;
		messageIsValid = false;
	}

	if (!isValid) {
		// Display the error message
		errorDiv.classList.add('error-show');
		emailErrorDiv.classList.remove('error-show');
		if (nameIsValid && messageIsValid && !emailIsValid) {
			errorDiv.classList.remove('error-show');
			emailErrorDiv.classList.add('error-show');
		}
	} else {
		// Form is valid, it can be sumbitted now
		emailErrorDiv.classList.remove('error-show');
		errorDiv.classList.remove('error-show');
		contactButton.classList.add('loading');
		contactLoad.classList.add('show');
		submitText.classList.add('hide');
		setTimeout(function () {
			sendMail();
		}, 2000);
	}
}

// Function to validate email format using a regular expression
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Event listener for form submission
if (contactForm) {
	contactForm.addEventListener('submit', validateForm);
}


// After adding the Email Js APi key in the script tag of the contact.html, uncomment this function section

function sendMail() {

	// Remove this section after adding the Email Js APi key in the script tag of the contact.html, uncomment this function section
	// From this
	contactSubmitAfter.classList.add('show');
	formSection.classList.add('hide');
	contactSection.classList.add('csa-cs');
	contactForm.classList.add('csa-cf');
	// To this

	// var params = {
	// 	name: document.getElementById('name').value,
	// 	email: document.getElementById('email').value,
	// 	message: document.getElementById('message').value
	// }

	// const serviceID = "service_evf2wim";
	// const templateID = "template_v085uvl";

	// emailjs.send(serviceID, templateID, params)
	// 	.then(
	// 		res => {
	// 			document.getElementById('name').value = "";
	// 			document.getElementById('email').value = "";
	// 			document.getElementById('message').value = "";

	// 			contactSubmitAfter.classList.add('show');
	// 			formSection.classList.add('hide');
	// 			contactSection.classList.add('csa-cs');
	// 			contactForm.classList.add('csa-cf');

	// 		}
	// 	)
	// 	.catch((error) => {
	// 		console.log(error);
	// 	})
}

document.addEventListener('DOMContentLoaded', function() {
	// Function to animate a single progress bar
	function animateProgressBar(skill) {
		// Ensure the skill element is visible
		skill.style.visibility = 'visible';
		skill.style.opacity = '1';

		const progressBar = skill.querySelector('.progress-per');
		const percentageText = skill.querySelector('.progress-block');
		const targetPercentage = parseInt(percentageText.textContent);
		
		// Make sure elements are visible
		progressBar.style.visibility = 'visible';
		percentageText.style.visibility = 'visible';
		
		// Reset to starting state
		progressBar.style.width = '0%';
		percentageText.textContent = '0%';
		
		// Add animation class
		progressBar.classList.add('animate');
		
		// Animate the percentage number
		let startTime;
		const duration = 2000;

		function updateNumber(currentTime) {
			if (!startTime) startTime = currentTime;
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			const currentValue = Math.round(progress * targetPercentage);
			percentageText.textContent = `${currentValue}%`;
			
			if (progress < 1) {
				requestAnimationFrame(updateNumber);
			}
		}

		// Start animations
		setTimeout(() => {
			progressBar.style.width = `${targetPercentage}%`;
			requestAnimationFrame(updateNumber);
		}, 100);
	}

	// Initialize animation for all skills immediately
	const skills = document.querySelectorAll('.skill');
	let delay = 200;

	// Immediately animate all skills with a stagger
	skills.forEach((skill, index) => {
		// Ensure the skill section is visible
		skill.style.visibility = 'visible';
		skill.style.opacity = '1';
		
		setTimeout(() => {
			animateProgressBar(skill);
		}, delay * index);
	});

	// Make sure parent containers are visible
	document.querySelectorAll('.skills-group-row').forEach(row => {
		row.style.visibility = 'visible';
		row.style.opacity = '1';
	});

	// Optional: Handle window resize
	let resizeTimeout;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			skills.forEach((skill, index) => {
				setTimeout(() => {
					animateProgressBar(skill);
				}, delay * index);
			});
		}, 250);
	});

	// Scroll to top button
	const scrollButton = document.createElement('button');
	scrollButton.innerHTML = '↑';
	scrollButton.className = 'scroll-top';
	document.body.appendChild(scrollButton);

	window.onscroll = () => {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			scrollButton.style.display = 'block';
		} else {
			scrollButton.style.display = 'none';
		}
	};

	scrollButton.onclick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Add hover effects for skill cards
	const skillCards = document.querySelectorAll('.skill');
	skillCards.forEach(card => {
		card.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-5px) scale(1.02)';
			this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
			
			// Updated icon animation
			const icon = this.querySelector('.icon-img');
			icon.style.transform = 'scale(1.2) translateY(-5px)';
			icon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
			icon.style.color = '#4a90e2'; // Add a color change
			
			const progressBar = this.querySelector('.progress-per');
			progressBar.style.animation = 'pulse 1s infinite';
		});

		card.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0) scale(1)';
			this.style.boxShadow = 'none';
			
			// Smooth reset of icon
			const icon = this.querySelector('.icon-img');
			icon.style.transform = 'scale(1) translateY(0)';
			icon.style.color = ''; // Reset color
			
			const progressBar = this.querySelector('.progress-per');
			progressBar.style.animation = 'none';
		});
	});

	// Add click interaction
	skillCards.forEach(card => {
		card.addEventListener('click', function() {
			// Add a quick "press" animation
			this.style.transform = 'scale(0.95)';
			setTimeout(() => {
				this.style.transform = 'scale(1)';
			}, 150);

			// Trigger progress bar animation reset
			const progressBar = this.querySelector('.progress-per');
			const percentageText = this.querySelector('.progress-block');
			const targetPercentage = parseInt(percentageText.textContent);
			
			// Reset and replay the animation
			progressBar.style.width = '0%';
			percentageText.textContent = '0%';
			
			setTimeout(() => {
				progressBar.style.width = `${targetPercentage}%`;
				animateNumber(percentageText, targetPercentage);
			}, 50);
		});
	});

	// Helper function for number animation
	function animateNumber(element, target) {
		let current = 0;
		const increment = target / 50; // Divide animation into 50 steps
		const interval = setInterval(() => {
			current += increment;
			if (current >= target) {
				current = target;
				clearInterval(interval);
			}
			element.textContent = `${Math.round(current)}%`;
		}, 20);
	}
});

// Add these CSS keyframes to your stylesheet
const style = document.createElement('style');
style.textContent = `
	@keyframes pulse {
		0% { opacity: 1; }
		50% { opacity: 0.7; }
		100% { opacity: 1; }
	}
`;
document.head.appendChild(style);

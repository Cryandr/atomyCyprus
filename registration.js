document.getElementById('registrationForm').addEventListener('submit', function(e) {
	e.preventDefault(); // Stopping the default form submission behavior


	// we will immediately redirect to mainpage.html
	window.location.href = 'mainpage.html';
});
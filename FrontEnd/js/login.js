        function showSignUp() {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('signup-container').style.display = 'block';
        }

        function showLogin() {
            document.getElementById('signup-container').style.display = 'none';
            document.getElementById('login-container').style.display = 'block';
        }


        function showGuest() {
            // For now, just an alert
            alert("Logged in as Guest");
            window.location.href = "index.html"; // Redirect to the main page
        }
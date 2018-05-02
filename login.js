// Test for indexedDB support
window.indexedDB = window.indexedDB
		|| window.mozIndexedDB
		|| window.webkitIndexedDB
		|| window.msIndexedDB;

if (!window.indexedDB) {
    // If indexeddb isn't supported by the browser being used, flash up a message to notify the user.
	window.alert("Your browser doesn't support a stable version of IndexedDB. You basically won't be able to login.");
}

// Fetches the data from the login form
$('#userLoginForm').submit(function(event){
    event.preventDefault();

    // Creates/opens the database
	setDatabaseName('bikeSiteDb', ['users', 'bikes', 'police']);
    // Opens the users data store
	setCurrObjectStoreName('users');
	// Starts a database function
	startDB(function () {
		// Runs the verifyLogin() function
		verifyLogin();
	});
});


function verifyLogin() {
	// Selects all data from the database
	selectAll(function(results) {
        // Creates a variable to check if a value has been fetched
		var result = false;
		if(!results || !results.length) {

		}
		else {
			// Variable to store the length of the data store
			var len = results.length;

			// Assigns the following variables the values found in the login form
			var userEmail = $('#email').val();
			var userPassword = $('#password').val();
			// Clears session storage
			sessionStorage.clear();

			// Iterates over the objects recovered from the database
			for(i = 0; i < len; i++) {
				if(userEmail == results[i].emailAddress && userPassword == results[i].password) {
					// If the email address and password match the ones found in any one entry,
                    // session storage is passed the user ID from the database and the email address.
					sessionStorage.setItem('userEmail', results[i].emailAddress);
					sessionStorage.setItem('userID', results[i].id);
					// If the user enters the correct email address and password, the result is set to true.
					result = true;
				}

			}

			if(result) {
                // If the email address and password are correct, the user is redirected to the site's homepage.
				window.location.href = "./Public/Home/home.html";
			} else {
				// If the email address or password is incorrect, the following displays an error message.
				alert("Invalid email or password.");
			}
		}
	});
}

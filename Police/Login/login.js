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
$('#policeLoginForm').submit(function(event){
    event.preventDefault();

    // Creates/opens the database
	setDatabaseName('bikeSiteDb', ['users', 'bikes', 'police']);
    // Opens the police data store
	setCurrObjectStoreName('police');
	// Starts a database function
	startDB(function () {
		// Runs the verifyLogin() function
		verifyLogin();
	});
});


function verifyLogin() {
	// Selects all data from the database
	selectAll(function(results) {
        // Creates 2 variables, one to indicate whether a user has been fetched, and another to
        // indicate whether that user has admin credentials
		var result = false;
		var admin = false;
		if(!results || !results.length) {

		}
		else {
			// Variable to store the length of the data store
			var len = results.length;

			// Assigns the following variables the values found in the login form
			var officerID = $('#officerID').val();
			var userPassword = $('#password').val();
			// Clears session storage
			sessionStorage.clear();

            // Iterates over the objects recovered from the database
			for(i = 0; i < len; i++) {
				if(officerID == results[i].officerID && userPassword == results[i].password) {
					// If the officerID and password match the ones found in any one entry,
                    // session storage is passed the user ID from the database and the officer ID.
					sessionStorage.setItem('officerID', results[i].officerID);
					sessionStorage.setItem('userID', results[i].id);
                    // In the event of an ordinary user logging on, result is set to true and admin is
                    // (of course) set to false.
					result = true;
					admin = false;
				} else if (officerID == 'admin' && userPassword == 'admin') {
                    // If admin credentials are entered, result is set to true and admin is set to true.
					result = true;
					admin = true;
				}

			}

			if(result == true && admin == false) {
				// If an ordinary police user is logging on, they're taken to the updateInvestigation.html page
				window.location.href = "../updateInvestigation/updateInvestigation.html";
			} else if (result == true && admin == true) {
                // If an admin is logging on, they're redirected to the adminControlPanel.html page
				window.location.href = '../../Admin/adminControlPanel.html';
			} else {
                // If the officerID or password is incorrect, the following displays an error message.
				alert("Invalid Officer ID or password.");
			}
		}
	});
}

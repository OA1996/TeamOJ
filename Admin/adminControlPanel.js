// Both of the password fields in the form are assigned to variables
var password = document.getElementById('passwordCreate');
var passwordCheck = document.getElementById('passwordCheck');

// A function is made to check if the passwords entered are the same
function passwordValidate() {
    if(password.value != passwordCheck.value) {
        // If the passwords don't match, the user is alerted
        passwordCheck.setCustomValidity("Passwords don't match.");
        alert('The passwords you have entered don\'t match');
    } else {
        // Don't throw up any error or alert
        passwordCheck.setCustomValidity('');
    }
}

// Fetches values stored in the police user registration form
$('#policeUserCreate').submit(function(event){
    event.preventDefault();

    // Create/Open the indexeddb database
    setDatabaseName('bikeSiteDb', ['users', 'bikes', 'police']);
    // Open the police object store
    setCurrObjectStoreName('police');
    // Runs the passwordValidate() function
    passwordValidate();
    // Starts a database function
    startDB(function () {
        // Runs the userCreate() function
        userCreate();
        // Alerts the administrator that a police user has been added
        alert('Police user added to database.');
    });
});

function userCreate() {
    // Takes all values from the registration form and assigns them to variables
    var firstName = $('#firstName').val();
    var surname = $('#surname').val();
    var officerID = $('#officerID').val();
    var password = $('#passwordCreate').val();

    // Creates an object out of variables
    var userAttributes = {
        'firstName':firstName,
        'surname':surname,
        'officerID':officerID,
        'password':password
    };

    // Inserts object into the datbase and automatically assigns an ID
    insertOne(userAttributes, function(lastID) {
        event.preventDefault();
        return false;
    });
};

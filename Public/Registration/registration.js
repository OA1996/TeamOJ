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

// Fetches values stored in the user registration form
$('#userRegistrationForm').submit(function(event){
    event.preventDefault();

    // Create/Open the indexeddb database
    setDatabaseName('bikeSiteDb', ['users', 'bikes', 'police']);
    // Open the users object store
    setCurrObjectStoreName('users');
    // Starts a database function
    startDB(function () {
        // Runs the userCreate() function
        userCreate();
        // Alerts user that they've created an account and redirects them to the login page
        alert('Thank you for registering, please log in to access your account.');
        window.location.href = '../../index.html'
    });
});

function userCreate() {
    // Takes all values from the registration form and assigns them to variables
    var firstName = $('#firstName').val();
    var surname = $('#surname').val();
    var emailAddress = $('#email').val();
    var addressLine1 = $('#addressLine1').val();
    var addressLine2 = $('#addressLine2').val();
    var addressLine3 = $('#addressLine3').val();
    var city = $('#city').val();
    var postcode = $('#postcode').val();
    var password = $('#passwordCreate').val();

    // Creates an object out of variables
    var userAttributes = {
        'firstName':firstName,
        'surname':surname,
        'emailAddress':emailAddress,
        'addressLine1':addressLine1,
        'addressLine2':addressLine2,
        'addressLine3':addressLine3,
        'city':city,
        'postcode':postcode,
        'password':password
    };

    // Inserts object into the datbase and automatically assigns an ID
    insertOne(userAttributes, function(lastID) {
        event.preventDefault();
        return false;
    });
};

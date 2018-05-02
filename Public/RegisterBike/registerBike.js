// Fetches values stored in the bike registration form
$('#bikeRegistrationForm').submit(function(event){
    event.preventDefault();

    // Create/Open the indexeddb database
    setDatabaseName('bikeSiteDb', ['users', 'bikes']);
    // Open the bikes object store
    setCurrObjectStoreName('bikes');
    // Starts a database function
    startDB(function () {
        // Runs the bikeRegister() function
        bikeRegister();
        // Alerts user that they've registered a bike and redirects them to the home page
        alert('Bike added.');
        window.location.href = '../Home/home.html';
    });
});

function bikeRegister() {
    // Takes all values from the registration form and assigns them to variables
    var userID = sessionStorage.getItem('userID');
    var bikeMake = $('#bikeMake').val();
    var bikeModel = $('#bikeModel').val();
    var bikeSerialNumber = $('#bikeSerialNumber').val();
    var purchaseLocation = $('#purchaseLocation').val();
    var bikeType = $('#bikeType').val();
    var gender = $('#gender').val();
    var ageGroup = $('#ageGroup').val();
    var recoveryStage = 0;

    // Creates an object out of variables
    var bikeAttributes = {
        'userID':userID,
        'bikeMake':bikeMake,
        'bikeModel':bikeModel,
        'bikeSerialNumber':bikeSerialNumber,
        'purchaseLocation':purchaseLocation,
        'bikeType':bikeType,
        'gender':gender,
        'ageGroup':ageGroup,
        'recoveryStage':recoveryStage
    };

    // Inserts object into the datbase and automatically assigns an ID
    insertOne(bikeAttributes, function(lastID) {
        event.preventDefault();
        return false;
    });
}

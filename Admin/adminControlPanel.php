<?php

// The values are grabbed from the fields
$firstName = $_POST['firstName'];
$surname = $_POST['surname'];
$email = $_POST['officerEmail'];
$password = $_POST['passwordCreate'];

// Change the following as applicable to suit the server it is on
// The values here are used in every mysqli connection in the file
$serverName = 'localhost';
$dbUsername = 's1703829_user';
$dbPassword = 'password100';
$dbName = 's1703829_TeamOJ';

// Creates a bcrypt hashed password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Creates a SQL db connection with the above credentials
$mysqli = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);

// Checks for errors in the SQL connection
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    session_destroy();
    exit;
} else {
    echo "SQL conn";
}

$query = "INSERT INTO `Users`(`Forename`, `Surname`, `Email`, `Address`, `Postcode`, `City`, `Password`, `Privilege`, `Verified`)
VALUES ('$firstName','$surname','$email','n/a','n/a','n/a','$hashedPassword','police',0)";

if ($mysqli->query($query) === TRUE) {
    echo "<script>window.location.href = \"./adminControlPanel.html\";</script>";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error . "<br>";
};

$mysqli->close();

?>

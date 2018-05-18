<?php

session_start();

$bikeSerialNumber = $_POST['serialNumber'];
$latLng = $_POST['latLng'];
$owner = $_SESSION['currentUser'];

// Change the following as applicable to suit the server it is on
// The values here are used in every mysqli connection in the file
$serverName = 'localhost';
$dbUsername = 's1703829_user';
$dbPassword = 'password100';
$dbName = 's1703829_TeamOJ';

// Creates a SQL db connection with the above credentials
$mysqli = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);

// Checks for errors in the SQL connection
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    session_destroy();
    exit;
} else {

}

$query = "UPDATE `Bikes` SET `Investigation Progress`='submittedForInvestigation', `Theft Location`='$latLng'
WHERE `Serial No`='$bikeSerialNumber' AND `Owner`='$owner'";

if ($mysqli->query($query) === TRUE) {
    // Email to update user
$subject = "Investigation Status Update";
$message = "Your bike's investigation status has been updated, please login to see more.";
$headers = "From: noreply@bikereporter.com";

mail($owner, $subject, $message, $headers);

    echo "<script>window.location.href = \"../Home/home.html\";</script>";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error . "<br>";
};

$mysqli->close();


?>

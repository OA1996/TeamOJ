<?php

session_start();

// Pulls the data from the form into variables
$imageTemp = $_FILES['imageSelect']['tmp_name'];
$bikeMake = $_POST['bikeMake'];
$bikeModel = $_POST['bikeModel'];
$bikeSerialNumber = $_POST['bikeSerialNumber'];
$bikeType = $_POST['bikeType'];
$gender = $_POST['gender'];
$ageGroup = $_POST['ageGroup'];
$theftLocation = 'n/a';
$owner = $_SESSION['currentUser'];

// Converts the image to base64
$data = file_get_contents($imageTemp);
$base64Image = base64_encode($data);

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
    echo "SQL Connected";
}

$query = "INSERT INTO `Bikes`(`Make`, `Model`, `Serial No`, `Type`, `Gender`, `Age`, `Pictures`, `Theft Location`, `Investigation Progress`, `Owner`)
VALUES ('$bikeMake','$bikeModel','$bikeSerialNumber','$bikeType','$gender','$ageGroup','$base64Image','$theftLocation','registered','$owner')";

if ($mysqli->query($query) === TRUE) {
    echo "<script>window.location.href = \"../Home/home.html\";</script>";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error . "<br>";
};

$mysqli->close();

?>

<?php

$recoveryStage = $_POST['recoveryStage'];
$serialNumber = $_POST['serialNumber'];
$owner = $_POST['owner'];

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
    exit;
} else {

}

$query = "UPDATE `Bikes` SET `Investigation Progress`='$recoveryStage'
WHERE `Serial No`='$serialNumber' AND `Owner`='$owner'";

if ($mysqli->query($query) === TRUE) {
    // OLIVIA PUT EMAIL CODE HERE
    
    echo "<script>window.location.href = \"./updateInvestigation.php\";</script>";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error . "<br>";
};

$mysqli->close();

?>

<?php

$owner = "joshjackson@email.com";

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
    echo "SQL Connected<br>";
}

$query = "SELECT * FROM `Bikes` WHERE Owner = '$owner'";

$result = mysqli_query($mysqli, $query);

echo "<table border='1'>
<tr>
<th>Bike Make</th>
<th>Bike Model</th>
<th>Serial Number</th>
</tr>";


while($row = mysqli_fetch_array($result)) {
    echo "<tr><td>".$row['Make']."</td><td>".$row['Model']."</td><td>".$row['Serial No']."</td></tr>";
}
echo "</table>";

$mysqli->close();

?>

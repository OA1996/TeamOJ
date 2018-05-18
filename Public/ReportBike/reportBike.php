<?php
session_start();

echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"utf-8\">
        <title> Bike Reporter - Report Stolen Bike </title>
        <!-- Links the Stylesheet -->
        <link rel=\"stylesheet\" type=\"text/css\" href=\"..\..\Stylesheet\stylesheet.css\">

        <!-- Loads in jQuery 3.2.1 and indexeddb -->
        <script src=\"../../js/jquery-3.2.1.js\"></script>
    </head>
    <body>

        <header class=\"reportBike\">
            <h1> Bike Reporter </h1>
            <h2> Report Stolen Bike </h2>

            <!-- A number of items in a list that act as hyperlinks to other pages on the site.
            These links make up the navigation bar on the site, and are re-arranged with CSS code
            to make the layout look nicer. -->
            <nav>
                <ul>
                    <li> <a href=\"../Home/home.html\">Home</a> </li>
                    <li> <a href=\"../RegisterBike/registerBike.html\">Register Bike</a> </li>
                    <li> <a href=\"../ReportBike/reportBike.php\">Report Stolen Bike</a> </li>
                    <li> <a href=\"../StatusCheck/statusCheck.php\">Status Check</a> </li>
                </ul>
            </nav>
        </header>

        <section class=\"report\">
            <p> Select a registered bike to report it as stolen: </p>
";

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

$query = "SELECT * FROM `Bikes` WHERE Owner = '$owner' AND `Investigation Progress` = 'registered'";

$result = mysqli_query($mysqli, $query);

echo "<table class=\"report\" id=\"bikeTable\">
    <tr>
        <th>Bike Make</th>
        <th>Bike Model</th>
        <th>Serial No.</th>
    </tr>";

while($row = mysqli_fetch_array($result)) {
    echo "<tr><td>".$row['Make']."</td><td>".$row['Model']."</td><td>".$row['Serial No']."</td></tr>";
}
echo "</table><br>";

$mysqli->close();

echo "</section>";

echo "<form class='report' action='submitBikeReport.php' method='POST'>
    <label for='serialNumber'>Serial Number:</label><br>
    <input type='text' name='serialNumber'><br><br>


    <label for='map'>Drag the marker to the last known location of the bike, then click 'Report Stolen':</label><br>
    <div name=\"map\" style=\"height: 300px; width: 500px;\" id=\"map\"></div>
    <script>
      var marker;
      function handleEvent(event) {
          document.getElementById('position').value = event.latLng;
      };
      function initMap() {
        var chelt = {lat: 51.899382, lng: -2.078255};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: chelt
        });
        marker = new google.maps.Marker({
          position: chelt,
          map: map,
          draggable: true
        });
        marker.addListener('drag', handleEvent);
        marker.addListener('dragend', handleEvent);
      }
    </script>

    <script async defer
    src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyC5KQsq8B6Ab2bm0PxSV9bf9FVkL_-Sq7E&callback=initMap\">
    </script>

    <input type='hidden' name='latLng' id=\"position\"><br><br>

    <input type='submit' name='submitSerialNumber' value='Report Stolen'>
</form>";

echo "<!-- This loads in the javascript from 'reportBike.js' -->
<script src=\"./reportBike.js\"></script>

</body>
</html>";
?>

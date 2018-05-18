<?php

echo "<script>var locations = [];</script>";

$investigationProgressAvoid = 'registered';

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

$query = "SELECT * FROM `Bikes` WHERE `Investigation Progress` != '$investigationProgressAvoid'";

$result = mysqli_query($mysqli, $query);

while($row = mysqli_fetch_array($result)) {
    echo "<script>locations.push(<?php$row['Theft Location']?>);</script>";
};

$mysqli->close();

echo "<div name=\"map\" style=\"height: 90%; width: 100%;\" id=\"map\"></div>
<script>
console.log(locations);
  var marker;
  function handleEvent(event) {
      document.getElementById('position').value = event.latLng;
  };
  function initMap() {
    var chelt = {lat: 51.899382, lng: -2.078255};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: chelt
    });
    marker = new google.maps.Marker({
      position: chelt,
      map: map
    });
  }
</script>

<script async defer
src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyC5KQsq8B6Ab2bm0PxSV9bf9FVkL_-Sq7E&callback=initMap\">
</script>";

?>

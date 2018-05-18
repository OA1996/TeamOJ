<?php

session_start();

echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"utf-8\">
        <title>Bike Reporter - Update Investigation</title>
        <!-- Links the Stylesheet -->
        <link rel=\"stylesheet\" type=\"text/css\" href=\"../../Stylesheet/stylesheet.css\">

        <!-- Loads in jQuery 3.2.1 and indexeddb -->
        <script src=\"../../js/jquery-3.2.1.js\"></script>
    </head>
    <body>

        <header class=\"updateInvestigation\">
            <h1> Bike Reporter </h1>
            <h2> Update Investigations </h2>
        </header>

        <section class=\"update\">
            <p> Select a registered bike to report it as stolen: </p>";

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

            echo "<table class=\"report\" id=\"bikeTable\">
                <tr>
                    <th>Owner</th>
                    <th>Bike Make</th>
                    <th>Bike Model</th>
                    <th>Serial No.</th>
                    <th>Recovery Status</th>
                </tr>";

            while($row = mysqli_fetch_array($result)) {
                echo "<tr><td>".$row['Owner']."</td><td>".$row['Make']."</td><td>".$row['Model']."</td><td>".$row['Serial No']."</td><td>".$row['Investigation Progress']."</td></tr>";
            }
            echo "</table><br>";

            $mysqli->close();

echo "<p>Recovery Stage Update:</p>
<form class=\"update\" action=\"updateButtonPress.php\" method=\"POST\">
    <select class=\"update\" name=\"recoveryStage\" id=\"recoveryStageUpdate\">
        <option value=\"submittedForInvestigation\">Bike Submitted for Investigation</option>
        <option value=\"bikeRetrieved\">Bike Retrieved</option>
        <option value=\"bikeReadyCollection\">Bike Ready for Collection</option>
        <option value=\"bikeCollected\">Bike Collected</option>
    </select><br><br>

    <label for=\"serialNumber\">Serial Number</label>
    <input type=\"text\" name=\"serialNumber\"><br><br>

    <label for=\"owner\">Owner</label>
    <input type=\"text\" name=\"owner\"><br><br>

    <input type=\"submit\" name=\"submitUpdate\" value=\"Update\">
</form>

</section>

<!-- This loads in the javascript from 'updateInvestigation.js' -->
<script src=\"./updateInvestigation.js\"></script>

</body>
</html>";

?>

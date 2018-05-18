<?php
session_start()
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Bike Reporter - eBay Compare</title>
        <!-- Links the Stylesheet -->
        <link rel="stylesheet" type="text/css" href="..\..\Stylesheet\stylesheet.css">
    </head>
    <body>

        <header class="home">
            <h1>Bike Reporter</h1>
            <h2>eBay Compare</h2>

            <!-- A number of items in a list that act as hyperlinks to other pages on the site.
            These links make up the navigation bar on the site, and are re-arranged with CSS code
            to make the layout look nicer. -->
            <nav>
                <ul>
                    <li> <a href="../Home/home.html">Home</a> </li>
                    <li> <a href="../RegisterBike/registerBike.html">Register Bike</a> </li>
                    <li> <a href="../ReportBike/reportBike.php">Report Stolen Bike</a> </li>
                    <li> <a href="../StatusCheck/statusCheck.php">Status Check</a> </li>
                    <li> <a href="../eBayCompare/eBayCompare.php">eBay Compare</a> </li>
                </ul>
            </nav>
        </header>

        <?php

        $investigationProgressAvoid = 'registered';
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

        include 'MySample.php';

        $query = "SELECT * FROM `Bikes` WHERE `Investigation Progress` != '$investigationProgressAvoid' AND `Owner` = '$owner'";

        $result = mysqli_query($mysqli, $query);

        while($row = mysqli_fetch_array($result)) {
            echo "<p>Image for reference:</p><br>";
            $data = $row['Pictures'];
            echo '<img src="data:image/jpeg;base64,' . $data . '" />';
            $searchTerm = $row['Make'] . " " . $row['Model'];
            echo eBaySearch($searchTerm);
        }

        $mysqli->close();

        ?>

    </body>
</html>

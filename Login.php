<?php

// If a session is already active, the variables are unset, and the session destroyed
if ($_SESSION) {
    session_unset();
    session_destroy();
}

// A new session is started and the variables are unset
session_start();
session_unset();

// The values are grabbed from the username and password fields
$email = $_POST['emailAddress'];
$password = $_POST['password'];

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

// Variables relating to the main query that will be carried out on the database
$res = $mysqli->query("SELECT * FROM `Users` WHERE `Email` = '$email' LIMIT 1");
$row = $res->fetch_assoc();
$dbEmail = $row['Email'];

// Checks if there are errors in getting a result from the database
if (!$res) {
    echo "Error: (" . $mysqli->errno . ") " . $mysqli->error;
    session_destroy();
    exit;
// Checks if the email matched the one in the database
} else {
    if (!$GLOBALS['email'] == $GLOBALS['dbEmail']) {
        echo "Error: Email not found.";
        session_destroy();
        echo "<script>window.location.href = \"./index.html\";</script>";
        exit;
    }

    // http://php.net/manual/en/function.password-verify.php
    // password_verify() takes the user input, hashes it with the bcrypt algorithm, then checks it against the db value
    if (password_verify($GLOBALS['password'], $row['Password'])) {
        // If it matches, the email is checked again
        // (This can probably be taken out)
        $GLOBALS['dbEmail'] = $GLOBALS['email'];

        // Puts the email from the database into the session storage if email
        // and password match those on file
        $_SESSION['currentUser'] = $GLOBALS['email'];

        // Check permissions and decide where to put user
        // Stores user permissions in session storage, then uses js to put the
        // user on the correct homepage
        if ($row['Privilege'] == 'public') {
            $_SESSION['Privilege'] = 'public';
            print_r($_SESSION);
            echo "<script>window.location.href = \"./Public/Home/home.html\";</script>";
            exit;
        } elseif ($row['Privilege'] == 'police') {
            $_SESSION['Privilege'] = 'police';
            echo "<script>window.location.href = \"./Police/updateInvestigation/updateInvestigation.html\";</script>";
            exit;
        } elseif ($row['Privilege'] == 'admin') {
            $_SESSION['Privilege'] = 'admin';
            echo "<script>window.location.href = \"./Admin/adminControlPanel.html\";</script>";
            exit;
        } else {
            echo "Error: User has no privilege.";
            session_destroy();
            exit;
        }

    } else {
        // If the passwords don't match the one on file, the following code is executed
        // Adapt this to return you to the login screen with an error message
        echo "Username or Password is incorrect.";
        session_destroy();
        echo "<script>window.location.href = \"./index.html\";</script>";
        exit;
    }
}

?>

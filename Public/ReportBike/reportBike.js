// VERY FUCKING EXPERIMENTAL CODE, PROBABLY WON'T WORK
function phpCodeRun() {
    <?php

    session_start();

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
        echo "SQL Connected<br>";
    }

    $query = "SELECT * FROM `Bikes` WHERE Owner = '$owner'";
    $res = $mysqli->query($query);

    if ($res->num_rows > 0) {
        // output data of each row
        while($row = $res->fetch_assoc()) {
            $bikeMake = $row['Make'];
            $bikeModel = $row['Model'];
            $bikeSerialNumber = $row['Serial No'];

            //echo $bikeMake . $row['Model'] . $row['Owner'] . $row['Investigation Progress'] . "<br>";
            ?>
            alert("It reaches the js");
            // Displays all of the bikes that belong to the user and creates a
            // table cell for each data item
            var table = document.getElementById('bikeTable');
            var row = table.insertRow(1);
            var bikeMake = row.insertCell(0);
            var bikeModel = row.insertCell(1);
            var serialNo = row.insertCell(2);

            // The object is outputted to the table elements
            bikeMake.innerHTML = <?php echo $bikeMake ?>;
            bikeModel.innerHTML = <?php echo $bikeModel ?>;
            serialNo.innerHTML = <?php echo $bikeSerialNumber ?>;
            <?php
        }
    } else {
        echo "0 results";
    }

    $mysqli->close();

    ?>
}

function phpCodeRun2() {
    $.get("./reportBike.php", function(data){
        alert('Function ran');
    });
}






function extractResults() {
    // Iterates over the results from the data store
    for(i = 0; i < len; i++) {
        if(userID == allBikeData[i].userID) {
            // Displays all of the bikes that belong to the user and creates a
            // table cell for each data item
            var table = document.getElementById('bikeTable');
            var row = table.insertRow(1);
            var bikeMake = row.insertCell(0);
            var bikeModel = row.insertCell(1);
            var serialNo = row.insertCell(2);

            // The object is outputted to the table elements
            bikeMake.innerHTML = allBikeData[i].bikeMake;
            bikeModel.innerHTML = allBikeData[i].bikeModel;
            serialNo.innerHTML = allBikeData[i].bikeSerialNumber;
        };
    };

};

// Code adapted from https://stackoverflow.com/questions/24750623/select-a-row-from-html-table-and-send-values-onclick-of-a-button
// Assigns values to variables
var table = document.getElementById('bikeTable');
var selected = table.getElementsByClassName('selected');
// If the table is clicked on, the highlight function runs.
table.onclick = highlight;

function highlight(e) {
    // If the cell selected doesn't have the class name 'selected', the table row is assigned
    // the class name 'selected'
    if (selected[0]) selected[0].className = '';
    e.target.parentNode.className = 'selected';
}


function serialNoSelect(){
    // Fetches the value of the serial number
    var serialNo = $("tr.selected td:last" ).html();
    // Runs the command to change the bike's recovery status
    changeBikeStatus(serialNo);
}

function changeBikeStatus(serialNo) {
    // Opens the database
    var DBOpenRequest = window.indexedDB.open("bikeSiteDb");
    var allBikeData;

    DBOpenRequest.onsuccess = function(event) {
        // assigns the opened database to a variable
        db = DBOpenRequest.result;
        // Runs the extractData() function
        extractData();
    };

    function extractData() {
        // Starts a readwrite transaction with the object store
        var tx = db.transaction(['bikes'], 'readwrite');
        var objStore = tx.objectStore('bikes');
        // Gets all of the values from the object store
        var objStoreReq = objStore.getAll()
        objStoreReq.onsuccess = function(event) {
            // Assigns the object store data to a variable
            allBikeData = objStoreReq.result;
            // Assigns the userID from session storage to a variable
            var userID = sessionStorage.getItem('userID');
            // Assigns the length of the object store to a variable
            var len = allBikeData.length;

            // Iterates over the data store
            for(i = 0; i < len; i++) {
                if(userID == allBikeData[i].userID && serialNo == allBikeData[i].bikeSerialNumber) {
                    // Check that the userID and serial number match those fed into the function and
                    // assigns the currently selected object to a variable
                    var data = allBikeData[i];
                    // Changes the recovery stage to 1 (reported stolen)
                    data.recoveryStage = 1;
                    // Puts new object back into the object store
                    objStore.put(data);
                    // Alerts the user that the bike's been reported as stolen and takes the user to
                    // the site's home page
                    alert('Bike reported as stolen.');
                    window.location.href = '../Home/home.html';
                };
            };
        };
    };
};

var mapCenter = new google.maps.LatLng(51.8979988098144,-2.0838599205017);
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();
var marker;

function initialize() {
    var mapOptions = {
        zoom: 15,
        center: mapCenter
    };

    myMap = new google.maps.Map(document.getElementById("mapInput"), mapOptions);

    marker = new google.maps.Marker({
        map: myMap,
        position: mapCenter,
        draggable: true
    });

    google.maps.event.addListener(marker,'dragend', markerDragged);

    function markerDragged() {
        var selectedPos = {'latLng': marker.getPosition()};
        
    }

    function showAddressInInfoWindow(results) {
        if (results[0]) {
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(myMap, marker);
        
        }
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

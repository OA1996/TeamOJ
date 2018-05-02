function extractResults() {
    // Opens the database
    var DBOpenRequest = window.indexedDB.open("bikeSiteDb");
    var allBikeData;

    // If the database opens successfully, the following executes
    DBOpenRequest.onsuccess = function(event) {
        // assigns the opened database to a variable
        db = DBOpenRequest.result;
        // Runs the extractData() function
        extractData();
    };

    function extractData() {
        // Starts a readonly transaction with the bikes object store
        var tx = db.transaction(['bikes'], 'readonly');
        var objStore = tx.objectStore('bikes');
        // Assigns the request for all of the data in the object store to a variable
        var objStoreReq = objStore.getAll()
        objStoreReq.onsuccess = function(event) {
            // Assigns the data from the object store to a variable
            allBikeData = objStoreReq.result;
            // Assigns the userID from session storage to a variable
            var userID = sessionStorage.getItem('userID');
            // Assingns the length of the data store to a variable
            var len = allBikeData.length;

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

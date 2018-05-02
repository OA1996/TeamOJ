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
            // Assingns the length of the data store to a variable
            var len = allBikeData.length;

            // Iterates over the results from the data store
            for(i = 0; i < len; i++) {
                if (allBikeData[i].recoveryStage > 0) {
                    // If the recovery stage is greater than 0 (has been reported stolen), a
                    // table cell is created for each data item
                    var table = document.getElementById('bikeTable');
                    var row = table.insertRow(1);
                    var userID = row.insertCell(0);
                    var bikeMake = row.insertCell(1);
                    var bikeModel = row.insertCell(2);
                    var serialNo = row.insertCell(3);
                    var recoveryStage = row.insertCell(4);

                    // The object is outputted to the table elements
                    userID.innerHTML = allBikeData[i].userID;
                    bikeMake.innerHTML = allBikeData[i].bikeMake;
                    bikeModel.innerHTML = allBikeData[i].bikeModel;
                    serialNo.innerHTML = allBikeData[i].bikeSerialNumber;
                    // Different data is outputted depending on the number of the recovery stage
                    if (allBikeData[i].recoveryStage == 1) {
                        recoveryStage.innerHTML = 'Bike Reported Stolen';
                    } else if (allBikeData[i].recoveryStage == 2) {
                        recoveryStage.innerHTML = 'Bike Retrieved';
                    } else if (allBikeData[i].recoveryStage == 3) {
                        recoveryStage.innerHTML = 'Bike Ready for Collection';
                    } else if (allBikeData[i].recoveryStage == 4) {
                        recoveryStage.innerHTML = 'Bike Collected';
                    };
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


function bikeSelect(){
    // Fetches values from the selected table row by index
    var userIDSel = $("tr.selected td:eq(0)" ).html();
    var serialNoSel = $("tr.selected td:eq(3)" ).html();
    var recoveryStageUpdate = $('#recoveryStageUpdate').val();
    // Runs the command to change the bike's recovery status
    changeBikeStatus(userIDSel, serialNoSel, recoveryStageUpdate);
}

function changeBikeStatus(userID, serialNo, recoveryStage) {
    // Opens database and assigns variables
    var DBOpenRequest = window.indexedDB.open("bikeSiteDb");
    var allBikeData;
    var userID = userID;
    var serialNo = serialNo;
    var recoveryStage = recoveryStage;

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
            // Assigns the length of the object store to a variable
            var len = allBikeData.length;

            // Iterates over the data store
            for(i = 0; i < len; i++) {
                if(userID == allBikeData[i].userID && serialNo == allBikeData[i].bikeSerialNumber) {
                    // Check that the userID and serial number match those fed into the function and
                    // assigns the currently selected object to a variable
                    var data = allBikeData[i];
                    // Changes the recovery stage to the one fed into the function
                    data.recoveryStage = recoveryStage;
                    // Puts new object back into the object store
                    objStore.put(data);
                    // Alerts the user that the recovery status has been updated and reloads the page to
                    // update the table
                    alert('Recovery Status Updated.');
                    location.reload();
                };
            };
        };
    };
};

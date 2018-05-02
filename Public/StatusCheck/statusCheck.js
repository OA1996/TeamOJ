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
                if(userID == allBikeData[i].userID && allBikeData[i].recoveryStage > 0) {
                    // Displays all of the bikes that belong to the user and has been reported stolen, then
                    // creates a table cell for each data item
                    var table = document.getElementById('bikeTable');
                    var row = table.insertRow(1);
                    var bikeMake = row.insertCell(0);
                    var bikeModel = row.insertCell(1);
                    var serialNo = row.insertCell(2);
                    var recoveryStage = row.insertCell(3);

                    // The object is outputted to the table elements
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

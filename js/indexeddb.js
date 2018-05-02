	var db, indexedDB, IDBTransaction, currObjectStoreName, databaseName, objectStores;
	
	function startDB(successCallback, failureCallback) {
		try {
			indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
			IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
			IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		}
		catch(e) {
			console.log('Initial IndexedDB error: ' + e);
			failureCallback();
		}
		
		if(!window.indexedDB) {
			failureCallback();
			return;
		}

		var request = indexedDB.open(databaseName, 1);
			
		request.onupgradeneeded = function(event) {
			console.log('onupgradeneeded method is invoked');
			db = event.target.result;
			for(i=0; i < objectStores.length; i++) {
				db.createObjectStore(objectStores[i], { keyPath: 'id', autoIncrement: true });
				//db.createObjectStore('ItemsObjectStore', { keyPath: 'id', autoIncrement: true });
			}

			/*
			event.oldVersion === 0 ? doUpgrade = false : doUpgrade = true;
			initModels(db, doUpgrade);
			
			var versionChangeTransaction = event.target.transaction;
			versionChangeTransaction.oncomplete = function(event) {
				console.log('version change transaction complete');
			}
			*/
		};

		request.onsuccess = function(event) {
			// event.target means request
			db = event.target.result;
			successCallback && successCallback();
		};

		request.onerror = function(event) {
			console.log('User don\'t allow IndexedDB to use offline storage.');
			failureCallback();
		};

		/*function initModels(db, doUpgrade) {
			if(doUpgrade) {
				db.objectStoreNames.contains('map') && db.deleteObjectStore('map');
			}
	
			var mapStore = db.createObjectStore('map', { keyPath: 'id', autoIncrement: true });
			//mapStore.createIndex('lat', 'lat', { unique: false });
		}*/
	}

	function indexedDBError(event) {
		console.log('An error occurred in IndexedDB', event);
	}
	
	function setDatabaseName(dbName, objStores) {
		databaseName = dbName;
		objectStores = objStores;
		console.log('Database : ', dbName);
	}
	
	function setCurrObjectStoreName(objStoreName) {
		currObjectStoreName = objStoreName;
		console.log('Current Object Store Name : ', currObjectStoreName);
	}

	function selectAll(successCallback) {
		var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_ONLY || 'readonly'),
			objectStore, request, results = [];
			
		transaction.onerror = indexedDBError;
		objectStore = transaction.objectStore(currObjectStoreName);
		request = objectStore.openCursor();

		request.onerror = indexedDBError;
		request.onsuccess = function(event) {
			// event.target means request
			var cursor = event.target.result;
			if(!cursor) {
				if(successCallback) {
					successCallback(results);
				}
				return;
			}
			results.push(cursor.value);
			cursor.continue();
		};
	}
	
	function insertOne(data, successCallback) {
		var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_WRITE || 'readwrite'),
			objectStore, request, lastID;
		
		objectStore = transaction.objectStore(currObjectStoreName);
		request = objectStore.add(data);
		request.onsuccess = function(event) {
			lastID = event.target.result;
		}
		request.onerror = indexedDBError;
		
		transaction.onerror = indexedDBError;

		transaction.oncomplete = function(event) {
			console.log('Insert one data into map succesfully');
			if(successCallback) {
				successCallback(lastID);
			}
		};
	}
	
	function deleteOne(id, successCallback) {
		var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_WRITE || 'readwrite'),
			objectStore, request;
			
		objectStore = transaction.objectStore(currObjectStoreName);
		request = objectStore.delete(id);
		request.onerror = indexedDBError;
		request.onsuccess = function(event) {
			var result = event.target.result;
		};
		transaction.onerror = indexedDBError;
		transaction.oncomplete = function() {
			console.log('Delete ' + id + ' in map successfully');
			if(successCallback) {
				successCallback();
			}
		};
	}
	
	function updateOne(data, successCallback) {
		var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_WRITE || 'readwrite'),
			objectStore, request, lastID;
		
		objectStore = transaction.objectStore(currObjectStoreName);
		request = objectStore.put(data);
		request.onsuccess = function(event) {
			lastID = event.target.result;
		}
		request.onerror = indexedDBError;
		
		transaction.onerror = indexedDBError;

		transaction.oncomplete = function(event) {
			console.log('Insert one data into map succesfully');
			if(successCallback) {
				successCallback(lastID);
			}
		};
	}
	
	function selectOne(id, successCallback) {
		var transaction = db.transaction([currObjectStoreName], IDBTransaction.READ_ONLY || 'readonly'),
			objectStore, request;
			
		transaction.onerror = indexedDBError;
		objectStore = transaction.objectStore(currObjectStoreName);
		request = objectStore.get(parseInt(id));

		request.onerror = indexedDBError;
		request.onsuccess = function(event) {
			// event.target means request
			
			var record = request.result;
			
			if(record) {
				
				if(successCallback) {
					
					successCallback(record);
				}
				return;
			}
		};
	}
	

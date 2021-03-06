﻿angular.module("journeyApp").controller('startController', ["$scope", "$http", "$location", function ($scope, $http, $location) {

    //Get vehicle list for logged in user
    $scope.tripVehicle = null;
    $scope.myVehicles = null;
    $http.get("/api/Vehicle").then(function (response) {
        $scope.myVehicles = response.data;
    }, function (error) {
        //error
    });


    //Get today's date and apply it to startdate
    var today = new Date();
    $scope.currentDate = today.toISOString().substring(0, 10);

    //Get current location 
    var location = "";
    getLocation(function (addr) {
        location = addr;
    });

    //Set current location
    $scope.setStartPos = function () {
        $scope.tripStartPos = location;
    }

    //Submit form and start a new trip
    $scope.startTrip = function () {
        var tripVehicle = $scope.tripVehicle;
        var tripStartDate = $scope.tripStartDate.toISOString().substring(0, 10);
        var tripOdometer = $scope.tripOdometer;
        var tripStartPos = $scope.tripStartPos;
        var tripStopPos = $scope.tripStopPos;
        var tripErrand = $scope.tripErrand;
        var tripNote = $scope.tripNote;

        var data = {
            "Id": 0,
            "TripDate": tripStartDate,
            "OdometerStart": tripOdometer,
            "OdometerStop": 0,
            "AddressStart": tripStartPos,
            "AddressStop": tripStopPos,
            "Errand": tripErrand,
            "Note": tripNote,
            "Active": true,
            "VehicleId": tripVehicle
        };
        console.log(data);
        //console.log(data);
        //console.log(tripVehicle);
        $http.post("/api/Trip", data, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            //console.log(tripVehicle, "Vehicle ID!");
            $location.path("/home");
        });
    };

}]);
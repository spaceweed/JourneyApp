﻿angular.module("journeyApp").controller('vehicleController', function ($scope, $location, $http, $routeParams) {

    $scope.myVehicles = null;
    $http.get("/api/Vehicle").then(function (response) {
        $scope.myVehicles = response.data;
    }, function (error) {
        //error
    });

    $scope.editVehicle = function (vehicle) {
        $scope.formVehicle = vehicle;
    };

    $scope.deleteVehicle = function (vehicle) {
        $http.delete("/api/Vehicle/" + vehicle.Id, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            $location.path("/vehicle");
        });
    };

    $scope.toggleVehicle = function (vehicle) {
        //$scope.formVehicle = vehicle;
        if (vehicle.Active === true) { vehicle.Active = false; }
        else { vehicle.Active = true; }
        //console.log(vehicle);
        $scope.postVehicle(vehicle);        
    };

    $scope.sendFormVehicle = function (vehicle)
    {
        if (vehicle.Id === undefined)
        {
            vehicle.Id = 0;
            vehicle.Active = true;
            $scope.myVehicles.push(vehicle);
        }
        $scope.postVehicle(vehicle);
    }

    $scope.postVehicle = function (vehicle) {
        $http.post("/api/Vehicle", vehicle, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            $scope.formVehicle = null;
            $location.path("/vehicle");
        });
    };
});
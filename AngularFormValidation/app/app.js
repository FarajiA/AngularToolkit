
var app = angular.module('app', []);

app.controller('Demo', ['$scope', 'CountryList', function ($scope, CountryList) {
    // populate Countries
    loadCountries();
    function loadCountries() {
        CountryList.results().success(function (data) {
            $scope.countries = data;
        });
    }

    // function to submit the form after all validation has occurred
    $scope.submitForm = function () {
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            alert('Form is valid');
        }
    };
}]);

app.factory("CountryList", ['$http', function ($http) {
    // defines a service used to populate initial data. Also persists value changes between pages.        
    var populate = {};

    populate.results = function () {
        return $http.get("data.json").
          error(function (data, status) {
              console.log("Request failed " + status);
          });
    }
    return populate;
}]);
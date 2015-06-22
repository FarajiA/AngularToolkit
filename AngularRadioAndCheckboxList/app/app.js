
var app = angular.module('app', []);

app.controller('Demo', ['$scope', 'PopulateList', 'filterFilter', function ($scope, PopulateList, filterFilter) {
  
    loadCountries();

    function loadCountries() {
        PopulateList.results().success(function (data) {
            $scope.countries = data;
        });
    }

    // checkbox selected countries
    $scope.selection = [];

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(country) {
        var idx = $scope.selection.indexOf(country);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }
            // is newly selected
        else {
            $scope.selection.push(country);
        }
    };
}]);

app.factory("PopulateList", ['$http', function ($http) {
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
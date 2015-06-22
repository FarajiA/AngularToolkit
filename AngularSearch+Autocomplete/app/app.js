
var app = angular.module('app', ['ngAnimate']);

app.controller('searchDemo', ['$scope', 'Search', function ($scope, Search) {
    $scope.names = [];
    loadNames();

    function loadNames() {
        Search.results().success(function (data) {
            $scope.names = data;
        });
    }
}]);

app.factory("Search", ['$http', function ($http) {
    // defines a service used to populate initial data. Also persists value changes between pages.        
    var searchResults = {};
    searchResults.results = function () {
        return $http.get("data.json").
          error(function (data, status) {
              console.log("Request failed " + status);
          });
    }

    searchResults.query = function (query) {
        /* in real scenario send search to url
        return $http.get("http://somewebsite.com/api/search/" + query).
          error(function (data, status) {
              console.log("Request failed " + status);
          });
        */
        return $http.get("data.json").
          error(function (data, status) {
              console.log("Request failed " + status);
          });
    }

    return searchResults;
}]);

app.directive("autocomplete", ['Search', function (Search) {
    return {
        restrict: "E",
        templateUrl: "views/templates/search.html",
       scope: {
            min: "@"
        },
        link: function (scope, elem, attrs, ctrl) {
            scope.userSearchResults = true;
            scope.min = 1;

            scope.autoComplete = function (query) {
                if (query.length >= scope.min)
                Search.query(query).success(function (data) {   
                    // filter for demo in actuality scope.newresults would equal data. 
                    scope.newresults = data.filter(function (item) {
                        var re = new RegExp(query, 'i');
                        return item.name.match(re);
                    });
                });
                console.log("Value is: " + query);
            }
          /* if not using external template use this event binding
            elem.bind('propertychange keyup paste', function (blurEvent) {
             
                var value = elem.val();
                if (value.length >= scope.min) {
                    Search.query(value).success(function (data) {
                        //scope.userSearchResults = true;
                        scope.newresults = data;
                    });
                }
               
            });
            */         
        }
    }
}]);
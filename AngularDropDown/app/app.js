var app = angular.module("app", []);


app.controller("dropdownDemo", ['$scope', '$http', function ($scope, $http) {
    loadCountries();
    $scope.country = "";
    
    $scope.getCountry = function (item) {
        console.log("Get script: " + item.code);
    }
   
    //load countries
    function loadCountries() {
        $http.get("data.json").
            success(function (data) {
                $scope.countries = data;
            }).
            error(function (data, status) {
            console.log("Request failed " + status);
        });
    }
}]);

app.run(function ($rootScope) {
    angular.element(document).on("click", function (e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });
});

//animated directive
app.directive("dropdown", function ($rootScope) {
    return {
        restrict: "E",
        templateUrl: "views/templates/dropdown-animated.html",
        scope: {
            placeholder: "@",
            list: "=",
            selected: "=",
            property: "@"
        },
        link: function (scope) {
            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function (item) {
                scope.isPlaceholder = false;
                scope.selected = item;
            };

            scope.isSelected = function (item) {
                return item[scope.property] === scope.selected[scope.property];
            };

            scope.show = function () {
                scope.listVisible = true;
            };

            $rootScope.$on("documentClicked", function (inner, target) {
                var parent = angular.element(target.parent()[0]);
                if (!parent.hasClass("clicked")) {
                    scope.$apply(function () {
                        scope.listVisible = false;
                    });
                }
            });

            scope.$watch("selected", function (value) {
                scope.isPlaceholder = scope.selected[scope.property] === undefined;
                scope.display = scope.selected[scope.property];
            });
        }
    }
});
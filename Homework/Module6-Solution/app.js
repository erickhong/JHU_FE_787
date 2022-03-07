/**
Assignment#6
This is an AngularJS application that establishes a view model controller.
It will take input text from the view, parse it by commas, and return
a response back to the view.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
- ng-style reference
  = https://www.w3schools.com/angular/ng_ng-style.asp
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.lunchbox = "";               //Input text variable
    $scope.response = "";               //The returned repsonse
    $scope.decorator = "";              //ng-style css object

    //Get text from the input field
    $scope.tooMuchFood = function () {
        $scope.response = getResult($scope.lunchbox);
    };

    function getResult(string) {
        var items = string.split(",");        //Split items into an array
        var result = "";
        var count = 0;            //# of strings (not including white spaces)

        //Count non-empty items only
        for (var i=0; i < items.length; i++) {
            var trimmed = items[i].trim();
            if(trimmed){
                count++;
            }
        }
        //Determine the response based on count
        console.log("Count: " + count)
        //Array of length 1 and empty means nothing was input
        if ((items.length == 1 && items[0] === "") || count == 0) {
            result = "Please enter data first";
            $scope.decorator = red;
        } else if (count >= 1 && count <= 3) {
            result = "Enjoy!";
            $scope.decorator = green;
        } else if (count >= 4){
            result = "Too much!";
            $scope.decorator = green;
        }
        return result;
    }
}
//For use with ng-style
const green = {
    "color": "green",
    "border" : "solid",
    "border-color" : "green",
    "padding-left" : "10px"
};
const red = {
    "color": "red",
    "border" : "solid",
    "border-color" : "red",
    "padding-left" : "10px"
}

})();

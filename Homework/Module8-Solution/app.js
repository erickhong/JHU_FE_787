/**
Assignment#8
This is Week3 of the 2nd course in AngularJS. The assignment focuses on
promises, http service (JSON), and directives. Templating of html is also
used to interact with JSON display.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
- ng-style reference
  = https://www.w3schools.com/angular/ng_ng-style.asp
Author: Erick Hong
*/
(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBaseUrl', 'https://davids-restaurant.herokuapp.com/');   //+ menu_items.json

function FoundItems() {
    var ddo = {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
            foundItems: '<',
            onEmpty: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'narrow',
        bindToController: true
    };
    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.shortName = "";

    narrow.matchedMenuItems = function (searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
        promise.then(function (items) {
            if(items.length > 0) {
                narrow.message = "";
                narrow.found = items;
            }
            else {
                narrow.message = "Nothing found!";
                //narrow.found = [];
            }
        });
    };

    narrow.removeMenuItem = function (itemIndex) {
        narrow.found.splice(itemIndex, 1);
    };
}

MenuSearchService.$inject = ['$http', 'ApiBaseUrl'];
function MenuSearchService($http, ApiBaseUrl){
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: (ApiBaseUrl + "menu_items.json")
        }).then(function (response) {
            var foundItems = [];

            for (var index = 0; index < response.data['menu_items'].length; index++) {
                if ( (searchTerm.length > 0 ) && ( response.data['menu_items'][index]['description'].toLowerCase().indexOf(searchTerm) !== -1) ) {
                    foundItems.push(response.data['menu_items'][index]);
                }
            }
            return foundItems;
        });
    };
}
})();

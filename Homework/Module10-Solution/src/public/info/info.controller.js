(function() {
'use strict';

var infoController = function(MenuService, ApiBasePath) {
    var info = this;
    info.ApiBasePath = ApiBasePath;
    info.signedUp = false;

    info.user = MenuService.getUser();

    if (angular.equals(info.user, {})) {
        info.signedUp = false;
    } else {
        info.signedUp = true;
    }
};

infoController.$inject = ['MenuService', 'ApiBasePath'];
angular.module('public')
        .controller('InfoController', infoController);
})();

( function() {
'use strict';

var signupController = function (MenuService) {
    var controller = this;

    controller.user = {};
    controller.favoriteDish = {};
    controller.showMessage = false;
    controller.showError = false;

    controller.signup = function(form) {
        controller.showMessage = false;
        controller.showError = false;

        //Invalid form
        if(form.$invalid) {
            return;
        }

        MenuService.getFavoriteDishFromForm(controller.user.favoriteDish)
                    .then(function(response) {
                        controller.user.favoriteDishDetails = response.data;
                        console.log(controller.user.favoriteDish);
                        MenuService.saveUser(controller.user);
                        controller.showMessage = true;
                    }, function(error) {
                        controller.showError = true;
                    }
        );
    }

    controller.onBlur = function () {
        MenuService.getFavoriteDishFromForm(controller.user.favoriteDish)
                    .then(function(response) {
                        controller.user.favoriteDishDetails = response.data;
                        controller.showError = false;
                    }, function(error) {
                        controller.showError = true;
                    }
        );
    }
};

signupController.$inject = ['MenuService'];
angular.module('public').controller('SignupController', signupController);
})();

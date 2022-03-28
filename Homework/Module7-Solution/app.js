/**
Assignment#7
This is Week2 of the 2nd course in AngularJS. The assignment uses
2 controllers, 1 service, and 1 filter to accomplish a shopping list
application. Items are checked off a list with a button click that
transitions an item from a "buy" to a "purchased" list.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
- ng-style reference
  = https://www.w3schools.com/angular/ng_ng-style.asp
Author: Erick Hong
*/
(function(){
'use strict';

//Declaration of controllers, service, and filter
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('AngularDollars', AngularDollarsFilter);

/* ToBuyController */
// Calls ShoppingListCheckOffService to:
// - Show all the "to buy" items
// - Transition an item from "to buy" to "purchase" array
// - Utility function getBoxSize() calculates number of digits
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    //Getter: Items to buy
    toBuy.showItems = ShoppingListCheckOffService.getItemsToBuy();
    var items = toBuy.showItems;
    //Transition
    toBuy.transitionItem = function (itemIndex) {
        try {
            ShoppingListCheckOffService.transitionItem(itemIndex);
            //Always reset any error message
            toBuy.errorMessage = "";
        } catch (error) {
            toBuy.errorMessage = error.message;
        }
    }
    //Utility
    toBuy.getBoxSize = function (itemIndex) {
        var size = items[itemIndex].quantity.toString().length;
        //Constrain the box to a min of 1 when empty
        return ((size > 0) ? size : 1);
    }
}

/* AlreadyBoughtController */
// Calls ShoppingListCheckOffService to:
// - Show all the "purchased" items
// - Get total price calculation to avoid doing this on the frontend
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var purchased = this;
    //Getter: Items to purchase
    purchased.showPurchasedItems = ShoppingListCheckOffService.getPurchasedItems();
    var items = purchased.showPurchasedItems;
    //Calculate the total price by index
    purchased.getTotalPrice = function (itemIndex) {
        return items[itemIndex].quantity * items[itemIndex].pricePerItem;
    }
}

/* ShoppingListCheckOffService */
// - Holds 2 arrays for "to buy" and "purchased" with setters/getters
// - Transitions an item from "to buy" to "purchased" while ensuring quantity
//   is a valid integer greater than or equal to zero
function ShoppingListCheckOffService(){
    //References "this" as "service"
    var service = this;
    //Array of objects representing items to buy or purchased
    var itemsToBuy = initialItems;
    var purchasedItems = [];
    //Getter: Items to buy
    service.getItemsToBuy = function () {
        return itemsToBuy;
    }
    //Getter: purchasedItems
    service.getPurchasedItems = function () {
        return purchasedItems;
    };
    //Setter: Add to purchased items
    service.addPurchasedItem = function (index) {
        console.log("index: ", index);
        var item = {
            name: itemsToBuy[index].name,
            quantity: itemsToBuy[index].quantity,
            pricePerItem: itemsToBuy[index].pricePerItem
        };
        //Add to the front of array
        purchasedItems.unshift(item);
    };
    //Transition item from to buy to purchased array using an index
    service.transitionItem = function (itemIndex) {
        var quantity = Number(itemsToBuy[itemIndex].quantity);
        console.log("quantity check: ", Number.isNaN(quantity));

        if((Number.isNaN(quantity)) || (quantity < 0)){
            throw new Error("Quantity was not a valid integer greater than or equal to zero.");
        } else {
            itemsToBuy[itemIndex].quantity = quantity
            //Call the setter
            service.addPurchasedItem(itemIndex);
            //Remove using splice by index and number to remove
            itemsToBuy.splice(itemIndex, 1);
        }
    }
}

/* Custom Filter */
// - Ensures the dollar amount has 2 decimal places
// - Prepends $$$
function AngularDollarsFilter() {
    return function (amount) {
        //Fixed decimal
        amount = amount.toFixed(2) || 0.00;
        amount = "$$$" + amount;
        return amount;
    };
}

})();

//5+ initial items represented as an array of objects
const initialItems = [
    {
        name: "Cookies",
        quantity: 4,
        pricePerItem: 4.25
    },
    {
        name: "Sweet Tarts",
        quantity: 2,
        pricePerItem: 2.00
    },
    {
        name: "Salt and Vinegar Chips",
        quantity: 2,
        pricePerItem: 5.99
    },
    {
        name: "Milk",
        quantity: 1,
        pricePerItem: 4.00
    },
    {
        name: "Tortillas",
        quantity: 2,
        pricePerItem: 3.99
    },
    {
        name: "Pineapple",
        quantity: 2,
        pricePerItem: 6.25
    }
];

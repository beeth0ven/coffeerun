/**
 * Created by Air on 2017/6/13.
 */

(function (window) {
  "use strict";
  console.log('main.js');
  var formSelector = '[data-coffee-order="form"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(formSelector);
  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  console.log(formHandler);

})(window);
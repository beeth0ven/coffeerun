/**
 * Created by Air on 2017/6/13.
 */

(function (window) {
  "use strict";
  console.log('main.js');
  var formSelector = '[data-coffee-order="form"]';
  var checklistSelector = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var checkList = new CheckList(checklistSelector);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(formSelector);
  formHandler.addSubmitHandler(function (order) {
    myTruck.createOrder(order);
    checkList.addRow(order);
  });
  console.log(formHandler);

})(window);
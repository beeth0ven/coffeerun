/**
 * Created by Air on 2017/6/13.
 */

(function (window) {
  "use strict";
  console.log('main.js');
  var formSelector = '[data-coffee-order="form"]';
  var checklistSelector = '[data-coffee-order="checklist"]';
  // var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  // var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var Rx = window.Rx;
  // var remoteDs = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var checkList = new CheckList(checklistSelector);
  checkList.rxSelectedOrder()
    .flatMapLatest(myTruck.deliverOrder.bind(myTruck))
    .subscribe(function (id) {
      checkList.removeRow(id);
    });

  var formHandler = new FormHandler(formSelector);
  formHandler.rxNewOrder()
    .flatMapLatest(myTruck.createOrder.bind(myTruck))
    .subscribe(function (order) {
      console.log('subscribe order: ' + order);
      formHandler.resetState();
      checkList.addRow(order);
    });

  formHandler.addInputHandler(Validation.isCompanyEmail);
  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
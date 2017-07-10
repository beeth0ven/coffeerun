/**
 * Created by Air on 2017/6/12.
 */

(function (window) {
  "use strict";
  console.log('truck.js');
  var App = window.App || {};
  var Rx = window.Rx;

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function (custormId) {
    console.log('Delivering order for ' + custormId);
    return this.db.remove(custormId);
  };

  Truck.prototype.printOrders = function (printFn) {
    return this.db.getAll()
      .subscribe(function (orders) {
        var customerIds = Object.keys(orders);
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIds.forEach(function (id) {
          console.log(orders[id]);
          if (printFn) {
            printFn(orders[id]);
          }
        }.bind(this));
      }.bind(this));
  };
  
  App.Truck = Truck;
  window.App = App;

})(window);

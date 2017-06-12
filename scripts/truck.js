/**
 * Created by Air on 2017/6/12.
 */

(function (window) {
  "use strict";
  var  App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function (custormId) {
    console.log('Delivering order for ' + custormId);
    this.db.remove(custormId);
  };

  Truck.prototype.printOrders = function () {
    var customerIds = Object.keys(this.db.getAll());
    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIds.forEach(function (id) {
      console.log(this.db.get(id));
    }.bind(this));
  };
  
  App.Truck = Truck;
  window.App = App;

})(window);

// var myTruck = new App.Truck('007', new App.DataStore());
// myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
// myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
// myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
// myTruck.printOrders();

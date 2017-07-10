/**
 * Created by Air on 2017/6/12.
 */

(function (window) {
  "use strict";
  console.log('datastore.js');
  var App = window.App || {};
  var Promise = window.Promise;
  var Rx = window.Rx;

  function DataStore() {
    this.data = {};
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
    return Rx.Observable.just(val);
  };

  DataStore.prototype.get = function (key) {
    return Rx.Observable.just(this.data[key]);
  };

  DataStore.prototype.getAll = function () {
    return Rx.Observable.just(this.data);
  };

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return Rx.Observable.just(key);
  };

  App.DataStore = DataStore;
  window.App = App;

})(window);
/**
 * Created by Air on 2017/6/19.
 */

(function (window) {
  "use strict";
  console.log('remotedatastore.js');
  var App = window.App || {};
  var $ = window.jQuery;
  var Rx = window.Rx;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, value) {
    return $.post(this.serverUrl, value, function (response) {
      console.log(response);
    });
  };

  RemoteDataStore.prototype.getAll = function (fn) {
    return $.get(this.serverUrl, function (response) {
      if (fn) {
        console.log(response);
        fn(response);
      }
    })
  };

  RemoteDataStore.prototype.get = function (key, fn) {
    return $.get(this.serverUrl + '/' + key, function (response) {
      if (fn) {
        console.log(response);
        fn(response);
      }
    })
  };

  RemoteDataStore.prototype.remove = function (key) {
    return $.ajax(this.serverUrl + '/' + key, {
      type: 'Delete'
    })
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
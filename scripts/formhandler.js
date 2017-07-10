/**
 * Created by Air on 2017/6/14.
 */

(function (window) {
  "use strict";
  console.log('formhandler.js');
  var App = window.App || {};
  var $ = window.jQuery;
  var Rx = window.Rx;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.rxNewOrder = function () {
    return Rx.Observable.fromEvent(this.$formElement, 'submit')
      .doOnNext(function (event) {
        event.preventDefault();
      })
      .map(function (event) {
        var order = {};
        this.serializeArray().forEach(function (item) {
          order[item.name] = item.value;
          console.log(item.name + ' is ' + item.value);
        });
        return order;
      }.bind(this.$formElement))
  };

  FormHandler.prototype.resetState = function () {
    this.$formElement[0].reset();
    this.$formElement[0].elements[0].focus();
  };

  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {
      var emailAddress = event.target.value;
      var isValid = fn(emailAddress);
      event.target.setCustomValidity(isValid
        ? ''
        : emailAddress + ' is not an authorized email address!');
    })
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);

/**
 * Created by Air on 2017/6/14.
 */

(function (window) {
  "use strict";
  console.log('formhandler.js');
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      var order = {};
      $(this).serializeArray().forEach(function (item) {
        order[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(order);
      fn(order);
      this.reset();
      this.elements[0].focus();
    })
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);

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

    this.$strengthLevel = $('#strengthLevel');
    this.$strengthValueLabel = $('#strengthValueLabel');
    this.bindStrengthValueLabel();
  }

  FormHandler.prototype.bindStrengthValueLabel = function () {
    this.$strengthValueLabel.text(this.$strengthLevel.val() + '%');
    this.$strengthLevel.on('input change', function (event) {
      this.$strengthValueLabel.text(event.target.value + '%');
      // this.$strengthValueLabel.style.color = 'red';
    }.bind(this))
  };

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
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);

/**
 * Created by Air on 2017/6/17.
 */

(function (window) {
  "use strict";
  console.log('checklist.js');
  var App = window.App || {};
  var $ = window.jQuery;
  var Rx = window.Rx;

  function CheckList(selector) {

    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  function Row(coffeeOder) {

    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOder.emailAddress
    });

    var description = coffeeOder.size + ' ';
    if (coffeeOder.flavor) {
      description += coffeeOder.flavor + ' ';
    }

    description += coffeeOder.coffee + ', ';
    description += ' (' + coffeeOder.emailAddress + ')';
    description += ' [' + coffeeOder.strength + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  CheckList.prototype.rxSelectedOrder = function () {

    return Rx.Observable.fromEvent(this.$element, 'click', 'input')
      .map(function (event) {
        return event.target.value;
      })
  };

  CheckList.prototype.addRow = function (coffeeOder) {
    this.removeRow(coffeeOder.emailAddress);
    var rowElement = new Row(coffeeOder);
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  App.CheckList = CheckList;
  window.App = App;

})(window);

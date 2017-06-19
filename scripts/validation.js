/**
 * Created by Air on 2017/6/18.
 */

(function (window) {
  "use strict";
  console.log('validation.js');
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@bignerdranch\.com$/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;

})(window);

var AuthManager = require('../config/auth_manager');

var IndexController = Ember.Controller.extend({
	actions: {
    logout: function() {
      App.AuthManager.reset();
      this.transitionTo('index');
    }
  }  
});

module.exports = IndexController;
// var AuthManager = require('../config/auth_manager');

var ApplicationController = Ember.Controller.extend({
  actions: {
    logout: function() {
      App.AuthManager.reset();
      this.transitionTo('index');
    }
  },

  currentUser: function() {
    return App.AuthManager.get('apiKey.user')
  }.property('App.AuthManager.apiKey'),

  isAuthenticated: function() {
    return App.AuthManager.isAuthenticated();
  }.property('App.AuthManager.apiKey')  
});

module.exports = ApplicationController;
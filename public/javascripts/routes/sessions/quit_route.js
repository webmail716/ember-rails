var SessionsQuitRoute = Ember.Route.extend({
	beforeModel: function() {
      App.AuthManager.reset();
      this.transitionTo('index');
	}
});

module.exports = SessionsQuitRoute;


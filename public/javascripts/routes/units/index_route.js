var UnitsIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Unit.find());
    this.controller.set('isAuthenticated', App.AuthManager.isAuthenticated());
    console.log("in units index route");
  }
});

module.exports = UnitsIndexRoute;
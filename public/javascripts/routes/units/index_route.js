var UnitsIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', App.Unit.find());
    controller.set('isAuthenticated', App.AuthManager.isAuthenticated());
    console.log("in units index route");
  }
});

module.exports = UnitsIndexRoute;
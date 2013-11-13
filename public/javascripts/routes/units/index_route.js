var UnitsIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Unit.find());
  }
});

module.exports = UnitsIndexRoute;
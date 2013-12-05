var PropertiesIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Property.find());
  }
});

module.exports = PropertiesIndexRoute;
var PropertiesNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Property.createRecord());
  }
});

module.exports = PropertiesNewRoute;

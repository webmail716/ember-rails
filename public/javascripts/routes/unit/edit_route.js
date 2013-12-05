var UnitEditRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', model);
    this.controller.set('contacts', App.Contact.find());
    this.controller.set('properties', App.Property.find());
  },

  model: function(params) {
    return App.Unit.find(params.unit_id);
  }
});

module.exports = UnitEditRoute;

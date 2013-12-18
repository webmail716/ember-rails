var UnitIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', model);
    this.controller.set('contacts', App.Contact.find());
    this.controller.set('properties', App.Property.find());
    this.controller.set('images', App.Image.find());
  },

  model: function(params) {
    return App.Unit.find(params.unit_id);
  }
});

module.exports = UnitIndexRoute;

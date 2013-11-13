var UnitIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', model);
    this.controller.set('contacts', App.Contact.find());
    // this.controllerFor('ContactsSelect').set('model', App.Contact.find());    
  },

  model: function(params) {
    return App.Unit.find(params.unit_id);
  }
});

module.exports = UnitIndexRoute;

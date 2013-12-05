var UnitsNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Unit.createRecord());
    this.controller.set('contacts', App.Contact.find());
    this.controller.set('properties', App.Property.find());
  }

	// renderTemplate: function() {
	// 	this.render({ outlet: 'subbody' });
 //  } 
});

module.exports = UnitsNewRoute;

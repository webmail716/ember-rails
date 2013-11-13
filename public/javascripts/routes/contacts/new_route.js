var ContactsNewRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', App.Contact.createRecord());
	}
});

module.exports = ContactsNewRoute;
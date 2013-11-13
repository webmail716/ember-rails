var ContactsIndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', App.Contact.find());
	}
});

module.exports = ContactsIndexRoute;

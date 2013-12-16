var ContactRequestsIndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', App.ContactRequest.find());
	}
});

module.exports = ContactRequestsIndexRoute;

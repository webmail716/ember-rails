var ContactRequestsNewRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', App.ContactRequest.createRecord());
	}
});

module.exports = ContactRequestsNewRoute;
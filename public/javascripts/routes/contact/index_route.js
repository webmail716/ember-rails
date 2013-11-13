var ContactIndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', model);
	},

	model: function(params) {
		return App.Contact.find(params.contact_id);
	}
});

module.exports = ContactIndexRoute;
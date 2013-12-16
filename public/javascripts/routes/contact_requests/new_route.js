var ContactRequestsNewRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', App.ContactRequest.createRecord());

		var pages = App.Page.find({slug: "contact_us"});

		controller.set('pages', pages);
		
    controller.set('isAuthenticated', App.AuthManager.isAuthenticated());
    console.log("in contact request new route");
	}
});

module.exports = ContactRequestsNewRoute;
var ContactRequestsNewController = Ember.ObjectController.extend({
	contact_methods: ["Email", "Phone"],

	actions: {
	  createContactRequest: function() {
	  	var router = this.get('target');
	  	var contact_request = this.get('model');

	  	contact_request.save();
	  	router.transitionTo("contact_requests.thank_you");
		}
	}
});

module.exports = ContactRequestsNewController;
var ContactsNewController = Ember.ObjectController.extend({
	actions: {
	  createContact: function() {
	  	var router = this.get('target');
	  	var contact = this.get('model');

	  	contact.save();
	  	router.transitionTo("contacts.index");
		}
	}
});

module.exports = ContactsNewController;
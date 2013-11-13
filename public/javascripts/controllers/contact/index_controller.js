var ContactIndexController = Ember.ObjectController.extend({
	
	// isEditing: false, 

	actions: {
		// edit: function() {
		// 	this.set("isEditing", true);
		// },

	  destroy: function() {
	  	var router = this.get('target');
	  	var contact = this.get('model');

	  	var data = { id: contact.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find('contact', contact.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
				router.transitionTo('contacts.index');
			});
		}

		// done: function() {
		// 	this.set("isEditing", false);
		// 	var contact = this.get('model');
		// 	// var contact = this.controllerFor('contactsSelect').get('selectedContact');

		// 	contact.save();
		// }
	}	
});

module.exports = ContactIndexController;
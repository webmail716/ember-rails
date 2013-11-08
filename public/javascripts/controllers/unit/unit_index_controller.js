App.UnitIndexController = Ember.ObjectController.extend({
	selectedContact: "blah", 

	contacts: function() {
		return App.Contact.find();
	},
	
	isEditing: false, 

	actions: {
		edit: function() {
			this.set("isEditing", true);
		},

		done: function() {
			this.set("isEditing", false);
			var unit = this.get('model');
			// var contact = this.controllerFor('contactsSelect').get('selectedContact');

	  	var sc = this.get('selectedContact');
	  	if (sc != null) {
	  		alert("selected contact = " + sc);
	  		var contact = App.Contact.find(sc.id);
	  		
	  		unit.set('contact', contact);

	  		unit.contact = contact;
	  	}

			unit.save();
		}		
	}	
});

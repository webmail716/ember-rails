var UnitIndexController = Ember.ObjectController.extend({
	selectedContact: null, 
	selectedProperty: null,
	
	isEditing: false, 

	actions: {
		// edit: function() {
		// 	this.set("isEditing", true);
		// },

	  destroy: function() {
	  	var router = this.get('target');
	  	var unit = this.get('model');

	  	var data = { id: unit.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find('unit', unit.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
				router.transitionTo('units.index');
			});
		}

		// done: function() {
		// 	this.set("isEditing", false);
		// 	var unit = this.get('model');
		// 	// var contact = this.controllerFor('contactsSelect').get('selectedContact');

	 //  	var sc = this.get('selectedContact');
	 //  	if (sc != null) {
	 //  		alert("selected contact = " + sc);
	 //  		var contact = App.Contact.find(sc.id);
	  		
	 //  		if (contact != null) {
		//   		unit.set('contact', contact);

		//   		unit.contact = contact;	  			
	 //  		}
	 //  	}

  //     var prop = this.get('selectedProperty');
  //     if (prop != null) {
  //       unit.set('property', App.Property.find(prop.id));
  //     }	  	

		// 	unit.save();
		// }
	}	
});

module.exports = UnitIndexController;
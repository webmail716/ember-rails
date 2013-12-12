var PropertyIndexController = Ember.ObjectController.extend({
	// selectedContact: null, 

	// contacts: function() {
	// 	return App.Contact.find();
	// },

	isEditing: false, 

	actions: {
		edit: function() {
			this.set("isEditing", true);
		},

	  destroy: function() {
	  	var router = this.get('target');
	  	var property = this.get('model');

	  	var data = { id: property.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find('property', property.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
				router.transitionTo('properties.index');
			});
		},

		done: function() {
			this.set("isEditing", false);
			var property = this.get('model');
			property.save();
		}
	}	
});

module.exports = PropertyIndexController;
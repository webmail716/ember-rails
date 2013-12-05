var PageIndexController = Ember.ObjectController.extend({
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
	  	var page = this.get('model');

	  	var data = { id: page.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find('page', page.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
				router.transitionTo('pages.index');
			});
		},

		done: function() {
			this.set("isEditing", false);
			var page = this.get('model');
			page.save();
		}
	}	
});

module.exports = PageIndexController;
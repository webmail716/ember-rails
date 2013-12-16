var ContactRequestsIndexController = Ember.ArrayController.extend({
	actions: {
	  destroy: function(cr) {
	  	var data = { id: cr.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find('contact_request', cr.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
			});
		}
	}
});

module.exports = ContactRequestsIndexController;
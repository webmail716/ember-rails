var UnitsIndexController = Ember.ArrayController.extend({
	actions: {
	  destroy: function(unit) {
	  	var router = this.get('target');
	  	
	  	var data = { id: unit.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find('unit', unit.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
			});
		}
	}
});


module.exports = UnitsIndexController;
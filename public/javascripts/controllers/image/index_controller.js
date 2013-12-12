var ImageIndexController = Ember.ObjectController.extend({
	actions: {
    selectedUnit: null, 

    myunits: function() {
      return App.Unit.find();
    },
  
		edit: function() {
			this.set("isEditing", true);
		},

		done: function() {
			this.set("isEditing", false);
			var image = this.get('model');
			// var contact = this.controllerFor('contactsSelect').get('selectedContact');

	  	var selected = this.get('selectedUnit');
	  	if (selected != null) {
	  		var unit = App.Unit.find(selected.id);
	  		// alert("selected unit = " + selected);

	  		image.set('unit', unit);
	  		// unit.images.add(image);
	  	}

			image.save();
		},

		destroy: function(obj) {
	  	var objType = 'image';

	  	var router = this.get('target');
	  	
	  	var data = { id: obj.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find(objType, obj.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
				router.transitionTo('images.index');
			});
		}
	}
});


module.exports = ImageIndexController;
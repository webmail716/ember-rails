App.UnitsSearchController = Ember.ObjectController.extend({
	actions: {
		search: function() {
			// alert("model = " + this.get("model"));
			var model = this.get('model');
			var units = this.get('store').find('unit', 
				{ min_bedrooms: model.min_bedrooms, 	max_bedrooms: model.max_bedrooms,
					min_bathrooms: model.min_bathrooms,	max_bathrooms: model.max_bathrooms,
					min_price: model.min_price,					max_price: model.max_price,
					for_sale: model.for_sale,  					for_rent: model.for_rent });

	  	var router = this.get('target');
	  	model.set('results', units);
	 //  	$.post('/units/search', data, function(results) {
	 //  		router.transitionTo('units');
	 //  	}).fail(function(jqxhr, textStatus, error) {
	 //      if (jqxhr.status === 422) {
	 //        errs = JSON.parse(jqxhr.responseText)
	 //        unit.set('errors', errs.errors);
	 //      }
	 //  	});
		// }

		}
	}
});


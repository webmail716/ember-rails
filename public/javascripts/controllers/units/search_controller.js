var UnitsSearchController = Ember.ObjectController.extend({
	actions: {
		search: function() {
			// alert("model = " + this.get("model"));
			var model = this.get('model');
			var query_params = this.buildQueryHash(model);

			// var units = this.get('store').find('unit', 
			// 	{ min_bedrooms: model.min_bedrooms, 	max_bedrooms: model.max_bedrooms,
			// 		min_bathrooms: model.min_bathrooms,	max_bathrooms: model.max_bathrooms,
			// 		min_price: model.min_price,					max_price: model.max_price,
			// 		for_sale: model.for_sale,  					for_rent: model.for_rent });

			var units = this.get('store').find('unit', query_params);

			model.set('results', units);

			return model;

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
  },

	buildQueryHash: function(model) {
		//only include the parameters if they are not the default value of 0
		var query_params = {for_sale: model.for_sale, 
				for_rent: model.for_rent};

		if (model.min_bedrooms > 0) { query_params['min_bedrooms'] = model.min_bedrooms; }
		if (model.max_bedrooms > 0) { query_params['max_bedrooms'] = model.max_bedrooms; }

		if (model.min_bathrooms > 0) { query_params['min_bathrooms'] = model.min_bathrooms; }
		if (model.max_bathrooms > 0) { query_params['max_bathrooms'] = model.max_bathrooms; }

		if (model.min_price > 0) { query_params['min_price'] = model.min_price; }
		if (model.max_price > 0) { query_params['max_price'] = model.max_price; }

		return query_params;
	}

});

module.exports = UnitsSearchController;
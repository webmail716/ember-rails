var UnitsSearchRoute = Ember.Route.extend({
	model: function(params) {
		// return App.SearchParams.createRecord();
		var model = App.SearchParams.create();
		// console.log("params qt = " + params.query_type);
console.log("in units search route");
		if (params.query_type == "coop") {
			model.set('for_sale', 't');
			model.set('for_rent', 'f');
		} else {
			model.set('for_sale', 'f');
			model.set('for_rent', 't');
		}

		//only include the parameters if they are not the default value of 0
		var query_params = {for_sale: model.for_sale, 
				for_rent: model.for_rent};

		// var units = this.get('store').find('unit', 
		// 	{ min_bedrooms: model.min_bedrooms, 	max_bedrooms: model.max_bedrooms,
		// 		min_bathrooms: model.min_bathrooms,	max_bathrooms: model.max_bathrooms,
		// 		min_price: model.min_price,					max_price: model.max_price,
		// 		for_sale: model.for_sale,  					for_rent: model.for_rent });

		var units = this.get('store').find('unit', query_params);

  	model.set('results', units);

		return model;
	},

	setupController: function(controller, model){
	  controller.set('model', model);
  },

	// renderTemplate: function() {
	// 	this.render({ outlet: 'subbody' });
 //  } 
});

module.exports = UnitsSearchRoute;
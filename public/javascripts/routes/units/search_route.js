var UnitsSearchRoute = Ember.Route.extend({
	model: function() {
		// return App.SearchParams.createRecord();
		return App.SearchParams.create();
	},

	setupController: function(controller, model){
	  controller.set('model', model);
  }

	// renderTemplate: function() {
	// 	this.render({ outlet: 'subbody' });
 //  } 
});

module.exports = UnitsSearchRoute;
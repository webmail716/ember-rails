var ImageIndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', model);
	},

	model: function(params) {
		return App.Image.find(params.image_id);
	}
});

module.exports = ImageIndexRoute;
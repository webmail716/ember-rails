var HomeShowRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		
		var pages = App.Page.find();
		controller.set('pages', pages);
		console.log("pages === " + pages);
		console.log("pages length === " + pages.content.length);
		console.log("params === " + params);
		console.log("slug = " + params.slug)
		var page = pages.findBy("slug", params.slug);
		console.log("page === " + page);
		if (page != undefined) {
			controller.set('page', page);
		}
	},

	model: function(params) {
		var pages = App.Page.find();
		console.log("pages === " + pages);
		console.log("pages length === " + pages.content.length);
		console.log("params === " + params);
		console.log("slug = " + params.slug)
		var page = pages.findBy("slug", params.slug);
		console.log("page === " + page);
		if (page != undefined) {
			controller.set('page', page);
		}
	},

	serialize: function(model) {
    // this will make the URL `/posts/foo-post`
    return { slug: model.get('slug') };
  }	
});

module.exports = HomeShowRoute;
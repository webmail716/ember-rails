var IndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
		// var pages = App.Page.find();
		// controller.set('pages', pages);
		// console.log("pages === " + pages);
		// console.log("pages length === " + pages.content.length);
		// // console.log("params === " + params);
		// // console.log("slug = " + params.slug);
		// var page = pages.findBy("slug", "/");
		

		var pages = App.Page.find({slug: "/"});
		var page = pages[0];
		controller.set('pages', pages);
		
		console.log("page === " + page);

		if (page != undefined) {
			controller.set('page', page);
		}

    controller.set('isAuthenticated', App.AuthManager.isAuthenticated());
    console.log("in index route");
  }
});

module.exports = IndexRoute;
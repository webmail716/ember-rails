var PageRenderRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('pages', model);
		// var pages = App.Page.find({slug: params.page_name});
		// var page = pages[0];

		// controller.set('pages', pages);
		
		// console.log("page === " + page);

		// if (page != undefined) {
			controller.set('page', model);
		// }

    controller.set('isAuthenticated', App.AuthManager.isAuthenticated());
    console.log("in page render route")
  },

  model: function(params) {
		var pages = App.Page.find({slug: params.page_name});
		// console.log("page name = " + params.page_name);
		// var page = pages[0];
    // return App.Page.find(params.page_id);
    return pages;
  }
});

module.exports = PageRenderRoute;

var PagesRenderRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', model);
  },

  model: function(params) {
    return App.Page.find(params.page_id);
  }
});

module.exports = PagesRenderRoute;

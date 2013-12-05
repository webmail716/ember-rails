var PagesIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Page.find());
  }
});

module.exports = PagesIndexRoute;
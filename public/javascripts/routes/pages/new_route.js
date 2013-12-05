var PagesNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Page.createRecord());
  }
});

module.exports = PagesNewRoute;

var ImagesIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Image.find());
  }
});

module.exports = ImagesIndexRoute;
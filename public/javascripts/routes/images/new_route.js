var ImagesNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Image.createRecord());
  }
});

module.exports = ImagesNewRoute;

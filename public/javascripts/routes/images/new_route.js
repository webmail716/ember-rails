var ImagesNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Image.createRecord());
    this.controller.set('units', App.Unit.find());
  }
});

module.exports = ImagesNewRoute;

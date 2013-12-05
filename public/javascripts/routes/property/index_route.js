var PropertyIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', model);
    // this.assignUnits();
    
    console.log("model = " + model);
    var units = model.get('units');

    console.log("units = " + units);
    console.log("property index route setupController");
    
    console.log("units size = " + units.content.length);
    
    controller.set('munits', units);
  },

  model: function(params) {
    return App.Property.find(params.property_id);
  },

  // units: function() {
  // 	var prop = this.get('model');
  // 	var units = App.Unit.find().filterProperty('property_id', prop.id);
  // 	return units;
  // }
});

module.exports = PropertyIndexRoute;

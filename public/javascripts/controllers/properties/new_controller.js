var PropertiesNewController = Ember.ObjectController.extend({
    actions: {
      createProperty: function() {
        var router = this.get('target');
        var property = this.get('model');

        property.save();
        property.get("store").commit();
        router.transitionTo("properties.index");
      }
    }
});

module.exports = PropertiesNewController;
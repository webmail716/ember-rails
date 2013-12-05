var UnitsNewController = Ember.ObjectController.extend({
    // needs: ['contacts'],
    // possibleContacts: function() {
    //  return this.get('controllers.contacts');
    // }.property(),

    //contacts: setup by route
    //properties: setup by route
    
    selectedContact: null, 
    selectedProperty: null,

    actions: {
      createUnit: function() {
        var router = this.get('target');
        var unit = this.get('model');
        var sc = this.get('selectedContact');
        if (sc != null) {
            alert("selected contact = " + sc);
            // unit.contact = App.Contact.find(sc.id);
            unit.set('contact', App.Contact.find(sc.id));
        }

        var prop = this.get('selectedProperty');
        if (prop != null) {
          unit.set('property', App.Property.find(prop.id));
        }

        unit.save();
        unit.get("store").commit();
        router.transitionTo("units.index");
      }

      //   createUnitAjax: function() {
      //       var unit = this.get('model');

      //       var data = new FormData();  
      // data.append('bedrooms', unit.get('bedrooms'));
      // data.append('bathrooms', unit.get('bathrooms'));
      // data.append('price', unit.get('price'));          
      // data.append('neighborhood', '');

      //   $.post('/units', data, function(results) {
      //       router.transitionTo('units.index');
      //   }).fail(function(jqxhr, textStatus, error) {
      //     if (jqxhr.status === 422) {
      //       errs = JSON.parse(jqxhr.responseText)
      //       unit.set('errors', errs.errors);
      //     }
      //   });
    }
});

module.exports = UnitsNewController;
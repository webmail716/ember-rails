// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/jquery.cookie');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data');

var App = window.App = Ember.Application.create({
	LOG_TRANSITIONS: true
});
App.Store = require('./store'); // delete if you don't want ember-data

// var UnitRoute = Ember.Route.extend({
// 	redirect: function() {
// 		this.transitionTo('unit.index');
// 	}
// });

App.Contact = DS.Model.extend({
	units: DS.hasMany('App.Unit'),

	name:     DS.attr('string'),
	email:    DS.attr('string'),
	phone:    DS.attr('string')

});


App.UnitsNewController = Ember.ObjectController.extend({
	// needs: ['contacts'],
	// possibleContacts: function() {
	// 	return this.get('controllers.contacts');
	// }.property(),

	selectedContact: "blah", 

	contacts: function() {
		return App.Contact.find();
	},

	actions: {
	  createUnit: function() {
	  	var router = this.get('target');
	  	var unit = this.get('model');
	  	var sc = this.get('selectedContact');
	  	if (sc != null) {
	  		alert("selected contact = " + sc);
	  		unit.contact = App.Contact.find(sc.id);
	  	}

	  	unit.save();
	  	router.transitionTo("units.index");
		},

		createUnitAjax: function() {
			var unit = this.get('model');

			var data = new FormData();	
      data.append('bedrooms', unit.get('bedrooms'));
      data.append('bathrooms', unit.get('bathrooms'));
      data.append('price', unit.get('price'));			
      data.append('neighborhood', '');

	  	$.post('/units', data, function(results) {
	  		router.transitionTo('units.index');
	  	}).fail(function(jqxhr, textStatus, error) {
	      if (jqxhr.status === 422) {
	        errs = JSON.parse(jqxhr.responseText)
	        unit.set('errors', errs.errors);
	      }
	  	});

		}
	}
});

App.ContactsController = Ember.ArrayController.extend({
	selectedContact: null
	// itemController: 'contact'
});

App.ContactsRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		controller.set('model', App.Contact.find());
		controller.set('content', App.Contact.find());
	}
});

App.ContactsSelectController = Ember.ArrayController.extend({
	selectedContact: null
	// itemController: 'contact'
});

App.ContactsSelectRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		controller.set('model', App.Contact.find());
		controller.set('content', App.Contact.find());
	}
});

// contacts: Ember.Object.create({
// 	selected: null,
// 	content: App.Contact.find()
// });

// JG - borrowed from http://stackoverflow.com/questions/15049904/using-ember-select-bound-to-an-arraycontroller-that-has-an-itemcontroller

// App.ContactsSelectView = Ember.Select.extend({
// 	model: 'App.Contact.find()',
// 	contentBinding: 'App.Contact.find()',
// 	prompt: "Choose a contact",
// 	selectionBinding: 'selectedContact',
// 	optionLabelPath: 'content.name',
// 	optionValuePath: 'content.id'
// });

App.ContactsNewController = Ember.ObjectController.extend({
	actions: {
	  createContact: function() {
	  	var router = this.get('target');
	  	var contact = this.get('model');

	  	contact.save();
	  	router.transitionTo("contacts.index");
		}
	}
});

App.Unit = DS.Model.extend({
		contact:     DS.belongsTo('App.Contact'),

    unit_number: DS.attr('string'),

    bedrooms: 			DS.attr('number'),

    bathrooms: 			DS.attr('number'),

    neighborhood: 	DS.attr('string'),

    price: 					DS.attr('number'),

    for_rent: 			DS.attr('boolean'),

    for_sale: 			DS.attr('boolean'),

    // biography: 			DS.attr('string'),

    lat: 						DS.attr('number'),

    lon: 						DS.attr('number'),

    sqft:            DS.attr('number'),

    unit_type:       DS.attr('string'), //commercial or residential

    description:     DS.attr('string'),

    searchable:      DS.attr('boolean'),

    amenity_list:    DS.attr('string'),

    google_map_url:  function() {
    	var map_url = "http://maps.googleapis.com/maps/api/staticmap?";
    	return map_url + "center=" + this.get('lat') + "," + this.get('lon');
    }.property('lat', 'lon'),

    google_map_link: function() {
    	return "<a href='" + google_map_url + "'>Click here</a>";
    }.property('google_map_url')
});

App.UnitIndexController = Ember.ObjectController.extend({
	selectedContact: "blah", 

	contacts: function() {
		return App.Contact.find();
	},
	
	isEditing: false, 

	actions: {
		edit: function() {
			this.set("isEditing", true);
		},

		done: function() {
			this.set("isEditing", false);
			var unit = this.get('model');
			// var contact = this.controllerFor('contactsSelect').get('selectedContact');

	  	var sc = this.get('selectedContact');
	  	if (sc != null) {
	  		alert("selected contact = " + sc);
	  		var contact = App.Contact.find(sc.id);
	  		
	  		unit.set('contact', contact);

	  		unit.contact = contact;
	  	}

			unit.save();
		}		
	}	
});

App.UnitsIndexController = Ember.ObjectController.extend({
	actions: {
	  destroy: function(unit) {
	  	var router = this.get('target');
	  	
	  	var data = { id: unit.id, type: 'DELETE' };
	  	var store = this.get('store');

			store.find('unit', unit.id).then(function(rec) {
				rec.deleteRecord();
				rec.save();
			});
		}
	}
});

App.SearchParams = Ember.Object.extend({
	min_bedrooms:   0,
	max_bedrooms:   0,
	min_bathrooms:  0,
	max_bathrooms:  0,
	min_price:      0,
	max_price:      0,
	for_sale:       'f'
});

// App.SearchParams = DS.Model.extend({
// 	min_bedrooms: DS.attr('number'),

// 	max_bedrooms: DS.attr('number'),

// 	min_bathrooms: DS.attr('number'),

// 	max_bathrooms: DS.attr('number'),

// 	min_price: DS.attr('number'),

// 	max_price: DS.attr('number')

// });

App.UnitsSearchController = Ember.ObjectController.extend({
	actions: {
		search: function() {
			// alert("model = " + this.get("model"));
			var model = this.get('model');
			var units = this.get('store').find('unit', 
				{ min_bedrooms: model.min_bedrooms, 	max_bedrooms: model.max_bedrooms,
					min_bathrooms: model.min_bathrooms,	max_bathrooms: model.max_bathrooms,
					min_price: model.min_price,					max_price: model.max_price,
					for_sale: model.for_sale,  					for_rent: model.for_rent });

	  	var router = this.get('target');
	  	model.set('results', units);
	 //  	$.post('/units/search', data, function(results) {
	 //  		router.transitionTo('units');
	 //  	}).fail(function(jqxhr, textStatus, error) {
	 //      if (jqxhr.status === 422) {
	 //        errs = JSON.parse(jqxhr.responseText)
	 //        unit.set('errors', errs.errors);
	 //      }
	 //  	});
		// }

		}
	}
});

App.UnitsRoute = Ember.Route.extend({});

App.UnitsSearchRoute = Ember.Route.extend({
	model: function() {
		// return App.SearchParams.createRecord();
		return App.SearchParams.create();
	},

	setupController: function(controller, model){
	  controller.set('model', model);
  }

	// renderTemplate: function() {
	// 	this.render({ outlet: 'subbody' });
 //  } 
});

App.UnitIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', model);
    this.controller.set('contacts', App.Contact.find());
    // this.controllerFor('ContactsSelect').set('model', App.Contact.find());    
  },

  model: function(params) {
    return App.Unit.find(params.unit_id);
  }
});

App.UnitsIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Unit.find());
  }
});

App.UnitsNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', App.Unit.createRecord());
    this.controller.set('contacts', App.Contact.find());
  }

	// renderTemplate: function() {
	// 	this.render({ outlet: 'subbody' });
 //  } 
});

App.ContactIndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', model);
	},

	model: function(params) {
		return App.Contact.find(params.contact_id);
	}
});

App.ContactsIndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', App.Contact.find());
	}
});

App.ContactsNewRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		this.controller.set('model', App.Contact.createRecord());
	}
});

// borrowed from http://stackoverflow.com/questions/9200000/file-upload-with-ember-data
App.UploadFileView = Ember.TextField.extend({
    type: 'file',
    attributeBindings: ['name'],
    change: function(evt) {
      var self = this;
      var input = evt.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var that = this;
        reader.onload = function(e) {
          var fileToUpload = e.srcElement.result;
          var unit = App.Unit.createRecord({ neighborhood: fileToUpload });
          self.get('controller.target').get('store').commit();
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
});

module.exports = App;

// App.UnitRoute = Ember.Route.extend({
//   model: function(model) {
//     return App.Unit.find(model.unit_id);
//   }
// });


// App.UnitsController = Ember.ArrayController.extend({
// 	model: function() {
// 		App.Unit.find();
// 	}
// });

// 	// needs: ['unit.destroy']
// // 	actions: {
// // 	  destroy: function() {
// // 	  	var router = this.get('target');
	  	
// // 	  	var unit = this.get('model');
// // 	  	var data = { id: unit.id, _method: 'delete' };
// // alert("unit=" + unit);
// // 	  	$.post('/units', data, function(results) {
// // 	  		router.transitionTo('units');
// // 	  	}).fail(function(jqxhr, textStatus, error) {
// // 	      if (jqxhr.status === 422) {
// // 	        errs = JSON.parse(jqxhr.responseText)
// // 	        unit.set('errors', errs.errors);
// // 	      }
// // 	  	});
// // 		}

	  	// $.ajax({url: '/units/' + unit.id, 
	  	// 				data: data, 
	  	// 				type: 'DELETE',
	  	// 				success: function(results) {
	  	// 										store.find('unit', unit.id).then(function(rec) {
	  	// 											rec.deleteRecord();
	  	// 											rec.save();
	  	// 										});
	  	// 										router.transitionTo('units.index');
	  	// }}).fail(function(jqxhr, textStatus, error) {
	  	// 	alert("destroy fail");
	   //    if (jqxhr.status === 422) {
	   //      errs = JSON.parse(jqxhr.responseText)
	   //      unit.set('errors', errs.errors);
	   //    }
	  	// });

// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/jquery.cookie');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data');
require('../models/unit');


var App = window.App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Store = require('./store'); // delete if you don't want ember-data

// var UnitRoute = Ember.Route.extend({
// 	redirect: function() {
// 		this.transitionTo('unit.index');
// 	}
// });

// App.ContactsController = Ember.ArrayController.extend({
// 	selectedContact: null
// 	// itemController: 'contact'
// });

// App.ContactsRoute = Ember.Route.extend({
// 	setupController: function(controller, model) {
// 		controller.set('model', App.Contact.find());
// 		controller.set('content', App.Contact.find());
// 	}
// });

// App.ContactsSelectController = Ember.ArrayController.extend({
// 	selectedContact: null
// 	// itemController: 'contact'
// });

// App.ContactsSelectRoute = Ember.Route.extend({
// 	setupController: function(controller, model) {
// 		controller.set('model', App.Contact.find());
// 		controller.set('content', App.Contact.find());
// 	}
// });

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

// App.Unit = DS.Model.extend({
// 	contact:     DS.belongsTo('App.Contact'),

//     unit_number: DS.attr('string'),

//     bedrooms: 			DS.attr('number'),

//     bathrooms: 			DS.attr('number'),

//     neighborhood: 	DS.attr('string'),

//     price: 					DS.attr('number'),

//     for_rent: 			DS.attr('boolean'),

//     for_sale: 			DS.attr('boolean'),

//     // biography: 			DS.attr('string'),

//     lat: 						DS.attr('number'),

//     lon: 						DS.attr('number'),

//     sqft:            DS.attr('number'),

//     unit_type:       DS.attr('string'), //commercial or residential

//     description:     DS.attr('string'),

//     searchable:      DS.attr('boolean'),

//     amenity_list:    DS.attr('string'),

//     google_map_url:  function() {
//     	var map_url = "http://maps.googleapis.com/maps/api/staticmap?";
//     	return map_url + "center=" + this.get('lat') + "," + this.get('lon');
//     }.property('lat', 'lon'),

//     google_map_link: function() {
//     	return "<a href='" + google_map_url + "'>Click here</a>";
//     }.property('google_map_url')
// });


// App.SearchParams = Ember.Object.extend({
// 	min_bedrooms:   0,
// 	max_bedrooms:   0,
// 	min_bathrooms:  0,
// 	max_bathrooms:  0,
// 	min_price:      0,
// 	max_price:      0,
// 	for_sale:       'f'
// });

// App.UnitsRoute = Ember.Route.extend({});

// App.UnitDetailsView = Ember.View.extend({
// 	templateName: "unit/_details",
// 	controller: App.UnitIndexController
// })

// borrowed from http://stackoverflow.com/questions/9200000/file-upload-with-ember-data
App.UploadFileView = Ember.TextField.extend({
    type: 'file',
    attributeBindings: ['name'],
    change: function(evt) {
      var self = this;
      var input = evt.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        // var that = this;
        reader.onload = function(e) {
          var fileToUpload = e.srcElement.result;
          var unit = App.Unit.createRecord({ neighborhood: fileToUpload });

          var store = unit.get('store');
          store.commit();
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
});

App.UploadFileView_Image = Ember.TextField.extend({
		controller: App.ImagesNewController,
    type: 'file',
    attributeBindings: ['name'],
    file: null,
    change: function(evt) {
      
      var input = evt.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var that = this;

        reader.onload = function(e) {
          var fileToUpload = e.srcElement.result;
          // var image = this.get('model');

          // var image = App.Image.createRecord({ image: fileToUpload });

          // var store = image.get('store');
          // store.commit();

          // JG - 2013-11-12 - stolen from http://stackoverflow.com/questions/16917123/how-to-get-uploaded-image-in-serverside-using-ember-js
          that.$().parent(':eq(0)').children('img:eq(0)').attr('src', e.target.result);

          Ember.run(function() {
          	that.set('file', fileToUpload);
          });

          // App.imagesNewController.get('model').set('image', e.target.result);
          

          // var image = App.imagesNewController
          // image.image = fileToUpload;
          // var image = App.Image.createRecord({ image: fileToUpload }); //name: name, description: description, 

          // var store = image.get('store');
          // store.commit();
        }

        return reader.readAsDataURL(input.files[0]);
      }
    }
});

// JG - borrowed from http://stackoverflow.com/questions/19620122/ember-with-jquery-file-upload
// App.UploadButton = Ember.View.extend({
//     tagName: 'input',
//     attributeBindings: ['type'],
//     type: 'file',
//     originalText: 'Upload Finished Product',
//     uploadingText: 'Busy Uploading...',

//     newItemHandler: function (data) {
//         var store = this.get('controller.store');

//         store.push('item', data);
//     },

//     // preUpload: function () {
//     //     var me = this.$(),
//     //         parent = me.closest('.fileupload-addbutton'),
//     //         upload = this.get('uploadingText');

//     //     parent.addClass('disabled');
//     //     me.css('cursor', 'default');
//     //     me.attr('disabled', 'disabled');
//     // },

//     // postUpload: function () {
//     //     var me = this.$(),
//     //         parent = me.closest('.fileupload-addbutton'),
//     //         form = parent.closest('#fake_form_for_reset')[0],
//     //         orig = this.get('originalText');

//     //     parent.removeClass('disabled');
//     //     me.css('cursor', 'pointer');
//     //     me.removeAttr('disabled');
//     //     form.reset();
//     // },

//     change: function (e) {
//         var self = this;
//         var formData = new FormData();
//         // This is just CSS
//         // this.preUpload();
//         // formData.append('group_id', this.get('group.id'));
//         formData.append('file', this.$().get(0).files[0]);
//         $.ajax({
//             url: '/file_upload_handler/',
//             type: 'POST',
//             //Ajax events
//             success: function (data) { 
//             	// self.postUpload(); 
//             	self.newItemHandler(data); },
//             error: function () { 
//             	// self.postUpload(); 
//             	alert('Failure'); },
//             // Form data
//             data: formData,
//             //Options to tell jQuery not to process data or worry about content-type.
//             cache: false,
//             contentType: false,
//             processData: false
//         });
//     }
// });



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

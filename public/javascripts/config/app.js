// require other, dependencies here, ie:
// require('./vendor/moment');

require('../vendor/jquery');
require('../vendor/jquery.cookie');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data');
require('../vendor/jquery.prettyPhoto');
// require('../vendor/ember-1.2.0-debug');
// require('../vendor/ember-data-v1.0.0-beta.3-debug');
require('../models/unit');


var App = window.App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Store = require('./store'); // delete if you don't want ember-data

App.SearchNavComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    this.scheduleAlert();
  },

  scheduleAlert: function() {
    Ember.run.scheduleOnce('afterRender', this, this.sayHello);
  },

  sayHello: function() {
    // alert("Hey Homey!!!");
  }
});

App.UnitCalculatorComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.initComponent);
  },

  initComponent: function() {
    this.$('#mor-amount').click(function() {
      alert("Clicked MOFO!!!");
      $('#mor-year').val("blah");
    });
  }
});

App.UnitSideBarComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.next(this, this.initComponent);
  },

  initComponent: function() {
    setTimeout(Ember.run.sync(), 5);

    this.$('.thumb').click(function() {
      var src = $(this).attr("src");
      $('.img_large').attr("src", src);
      $('.img_large_link').attr("href", src);
    });
  }
});

App.UnitSideContentComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    // Ember.run.scheduleOnce('afterRender', this, this.initComponent);
    Ember.run.next(this, this.initComponent);
  },

  initComponent: function() {
    // this.$("a[rel^='prettyPhoto']").prettyPhoto();
    
    // this.$('.detail_price').click(function() {
    //   alert("test");
    // });

    // this.$('.light').click(function() {
    //   alert("test");
    // });
  }
});

Handlebars.registerHelper('formatCurrency', function(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
});

App.SearchParams = Ember.Object.extend({
	min_bedrooms:   0,
	max_bedrooms:   0,
	min_bathrooms:  0,
	max_bathrooms:  0,
	min_price:      0,
	max_price:      0,
	for_sale:       'f',
  for_rent:       'f'
});

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

// var Unit = require('../../models/unit');

var ImagesNewController = Ember.ObjectController.extend({
		file: null,

    selectedUnit: null, 

    // units: App.Unit.find(),

    // units: function() {
    //   return App.Unit.find();
    //   // return ["jay1", "unitjay2"];
    //   // return null;
    // },
  
    actions: {
      createImage: function() {
        var router = this.get('target');
        var image = this.get('model');
        // var file = this.get('file');
        // var ctlr = this.get('controller');
        // var ff = App.UploadFileView_Image.file;
        // var tt = this.file;
        
		  	var selected = this.get('selectedUnit');
		  	if (selected != null) {
		  		var unit = App.Unit.find(selected.id);
		  		
		  		image.set('unit', unit);

		  		// unit.images.add(image);
		  	}

        image.save();
        // image.image = this.$().parent(':eq(0)').children('img:eq(0)').attr('src');

        // image.get("store").commit();
        router.transitionTo("images.index");
      }
    }
});

module.exports = ImagesNewController;

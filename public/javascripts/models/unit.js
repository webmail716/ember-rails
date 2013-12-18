var Unit = DS.Model.extend({
	contact:            DS.belongsTo('App.Contact'),

    property:           DS.belongsTo('App.Property'),
    
    images:             DS.hasMany('App.Image'),
    
    unit_number:        DS.attr('string'),

    bedrooms: 			DS.attr('number'),

    bathrooms: 			DS.attr('number'),

    neighborhood: 	    DS.attr('string'),

    price: 				DS.attr('number'),

    for_rent: 			DS.attr('boolean'),

    for_sale: 			DS.attr('boolean'),

    // biography: 			DS.attr('string'),

    lat: 				DS.attr('number'),

    lon: 				DS.attr('number'),

    sqft:               DS.attr('number'),

    unit_type:          DS.attr('string'), //commercial or residential

    description:        DS.attr('string'),

    searchable:         DS.attr('boolean'),

    amenity_list:       DS.attr('string'),
    
    // google_map_url:  function() {
    // 	var map_url = "http://maps.googleapis.com/maps/api/staticmap?";
    // 	return map_url + "center=" + this.get('lat') + "," + this.get('lon') +
    //     "&size=1000x1000&sensor=true";
    // }.property('lat', 'lon'),

    // floor_plan_photo: function() {
    //     return this.get('images').findBy('is_floorplan', true);
    // }.property('images.@each'),

    street: function() {
      return this.get('property').get('street');
    }.property("property"),

    address: function() {
        return this.get('street') + "," + this.get('property').get('city') +
        "," + this.get('property').get('state');
    }.property("property"),

    floor_plan_photo: function() {
        return this.get('images');
    }.property('images.@each'),

    google_map_url:  function() {
        var map_url = "http://maps.googleapis.com/maps/api/staticmap?";
        return map_url + "center=" + this.get('address') + " " + this.get('property').get('zip') + 
        "&size=1000x1000&sensor=true&zoom=15&markers=color:blue|" + this.get('address') + " " + 
        this.get('property').get('zip');
    }.property("property"),

    // google_map_link: function() {
    // 	return "<a href='" + google_map_url + "'>Click here</a>";
    // }.property('google_map_url'),

    // featured_image: function() {
    //     var images = this.get('images');
    //     if (images != null && images.size > 0) {
    //         return images.objectAt(0);
    //     } else {
    //         return null;
    //     }
    // }.property('images.@each'),

    firstImage: function() {
      var images = this.get('images');
      return images.objectAt(0);
    }.property('images.@each.isLoaded')
});

module.exports = Unit;

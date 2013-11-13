var Unit = DS.Model.extend({
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

module.exports = Unit;

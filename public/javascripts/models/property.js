var Property = DS.Model.extend({
    units:          DS.hasMany('App.Unit'),
    
    name:           DS.attr('string'),

    street:         DS.attr('string'),

    city:           DS.attr('string'),

    state:          DS.attr('string'),

    zip:            DS.attr('string'),

    amenity_list:   DS.attr('string'),

    neighborhood: 	DS.attr('string')

});

module.exports = Property;

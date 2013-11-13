var Contact = DS.Model.extend({
	units: DS.hasMany('App.Unit'),

	name:     DS.attr('string'),
	email:    DS.attr('string'),
	phone:    DS.attr('string')

});

module.exports = Contact;
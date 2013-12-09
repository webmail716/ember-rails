var ContactRequest = DS.Model.extend({
	name:     			DS.attr('string'),
	email:    			DS.attr('string'),
	phone:    			DS.attr('string'),
	message:  			DS.attr('string'),
	contact_method: DS.attr('string')

});

module.exports = ContactRequest;
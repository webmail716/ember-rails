var Image = DS.Model.extend({
  name:     			DS.attr('string'),
  description:    DS.attr('string'),
  image: 					DS.attr('string'),

  errors: {}
});

module.exports = Image;
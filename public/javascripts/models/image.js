var Image = DS.Model.extend({
  name:     			DS.attr('string'),
  description:    DS.attr('string'),
  image: 					DS.attr('string'),

  unit: 					DS.belongsTo('App.Unit'),

  errors: {}
});

module.exports = Image;
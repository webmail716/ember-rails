var Image = DS.Model.extend({
  name:     			DS.attr('string'),
  description:    DS.attr('string'),
  image: 					DS.attr('string'),

  is_floorplan:   DS.attr('boolean'),
  
  unit: 					DS.belongsTo('App.Unit'),

  errors: {}
});

module.exports = Image;
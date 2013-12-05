var Page = DS.Model.extend({
    title:          DS.attr('string'),

    slug:           DS.attr('string'),

    content_area:   DS.attr('string')
});

module.exports = Page;

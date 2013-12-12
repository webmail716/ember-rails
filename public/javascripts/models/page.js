var Page = DS.Model.extend({
    title:          DS.attr('string'),

    slug:           DS.attr('string'),

    content_area:   DS.attr('string'),

    isHomePage: function() {
    	if (this.get('slug') == "/") {
    		return true;
    	} else {
    		return false;
    	}
    }.property("slug")
});

module.exports = Page;

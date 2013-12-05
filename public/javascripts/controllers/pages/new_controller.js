var PagesNewController = Ember.ObjectController.extend({
    actions: {
      createPage: function() {
        var router = this.get('target');
        var page = this.get('model');

        page.save();
        page.get("store").commit();
        router.transitionTo("pages.index");
      }
    }
});

module.exports = PagesNewController;
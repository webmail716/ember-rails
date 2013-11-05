var App = require('./app');

App.Router.map(function() {
  this.resource('sessions', function() {
    this.route('new');
  });
  this.resource('users', function() {
    this.route('new');
  })
  this.route('top_secret');

  
	this.resource("units", function() {
		this.route("index");
		this.route("new");
		this.route("search");

		this.resource("unit", { path: "" }, function() {
			this.route("index", { path: ":unit_id" });
// 	// 		this.route("edit");	
// 	// 		this.route("destroy");
		});
	});

	this.resource("contacts", function() {
		this.route("index");
		this.route("new");

		this.resource("contact", { path: "" }, function() {
			this.route("index", { path: ":contact_id" });
		});
	});
	
// 	// this.resource("unit.index", { path: "/units/:unit_id" });

});


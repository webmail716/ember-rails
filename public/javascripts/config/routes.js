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
		this.route("index", { path: "index"} );
		this.route("new");
		this.route("search", { path: "search/:query_type"});

		this.resource("unit", { path: "" }, function() {
		// this.resource("unit", { path: ":unit_id" }, function() {
			this.route("index", { path: ":unit_id" });
			this.route("edit", { path: ":unit_id/edit" });
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
	
	this.resource("images", function() {
		this.route("index");
		this.route("new");

		this.resource("image", { path: "" }, function() {
			this.route("index", { path: ":image_id" });
		});
	});

	this.resource("properties", function() {
		this.route("index");
		this.route("new");

		this.resource("property", { path: "" }, function() {
			this.route("index", { path: ":property_id" });
		});
	});

	this.resource("pages", function() {
		this.route("index");
		this.route("new");

		this.resource("page", { path: "" }, function() {
			this.route("index", { path: ":page_id" });
			this.route("render", { path: ":page_name" });
		});
	});
	
	this.resource("contact_requests", function() {
		this.route("index");
		this.route("new");
		this.route("thank_you");
	});

	this.resource("home", function() {
		this.route("show", { path: ":slug" });
	});


// 	// this.resource("unit.index", { path: "/units/:unit_id" });

});


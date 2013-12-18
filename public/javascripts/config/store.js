// // by default, persist application data to localStorage.
// require('../vendor/localstorage_adapter');

// module.exports = DS.Store.extend({
//   revision: 11,
//   //adapter: DS.RESTAdapter.create()
//   adapter: DS.LSAdapter.create()
// });

// http://stackoverflow.com/questions/10875285/where-do-i-specify-the-pluralization-of-a-model-in-ember-data
DS.RESTAdapter.configure("plurals", { property: "properties" });

DS.RESTAdapter.configure('App.Unit', {
    sideloadsAs: 'units'
});

// DS.RESTAdapter.configure('App.Image', {
//     sideloadsAs: 'images'
// });

// DS.RESTAdapter.map('App.Unit', {
//   images: { embedded: 'load' }
// });

module.exports = DS.Store.extend({
  // adapter: DS.RESTAdapter.create({plurals: {"property": "properties"}})
  adapter: DS.RESTAdapter.create()
});

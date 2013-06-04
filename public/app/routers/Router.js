var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index",
  },

  initialize: function() {
    this.users = new Users();
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
  }

});
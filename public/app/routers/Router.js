var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index"
  },

  initialize: function() {
    this.sessions = new Sessions(testData);
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('body').append(this.sessionsView.render());
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
  }

});
var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index",
    "sessions": "sessions"
  },

  initialize: function() {
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
  },

  sessions: function() {
    this.sessions = new Sessions(testData);
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('body').append(this.sessionsView.render());
  }

});
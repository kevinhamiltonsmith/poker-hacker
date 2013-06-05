var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index",
    "sessions": "sessions",
    "session": "session"
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
    $('body').empty().append(this.sessionsView.render());
  },

  session: function() {
    console.log("inside session");
    this.session = new Session();
    this.sessionView = new SessionView({model: this.session});
    $('body').empty().append(this.sessionView.render());
  }

});
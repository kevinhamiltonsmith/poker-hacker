var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index",
    "sessions": "sessionsNav",
    "session/:id": "sessionNav"
  },

  initialize: function() {
    this.sessions = new Sessions(testData);
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
  },

  sessionsNav: function() {
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('body').empty().append(this.sessionsView.render());
  },

  sessionNav: function(id) {
    this.session = new Session(this.sessions.findWhere({sessionId: id}).attributes);
    this.sessionView = new SessionView({model: this.session});
    $('body').empty().append(this.sessionView.render());
  }

});
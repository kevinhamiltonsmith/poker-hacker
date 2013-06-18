var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index",
    "session/all": "sessionsNav",
    "session/:id": "sessionNav",
    "overview": "overviewNav",
    "stats": "statsNav"
  },

  initialize: function() {
    this.sessions = new Sessions(testData);
    this.appView = new AppView();
    $('body').empty().append(this.appView.render());
  },

  start: function() {
    Backbone.history.start();
  },

  index: function() {
    this.indexView = new IndexView();
    $('.main-content').empty().append(this.indexView.render());
  },

  sessionsNav: function() {
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('.main-content').empty().append(this.sessionsView.render());
  },

  sessionNav: function(id) {
    this.session = new Session(this.sessions.findWhere({sessionId: id}).attributes);
    this.sessionView = new SessionView({model: this.session});
    $('.main-content').empty().append(this.sessionView.render());
  },

  overviewNav: function() {
    this.overviewView = new OverviewView({collection: this.sessions});
    $('.main-content').empty().append(this.overviewView.render());
    this.overviewChartView = new OverviewChartView({collection: this.sessions});
    $('.overview-chart-wrapper').empty().append(this.overviewChartView.render());
  },

  statsNav: function() {
    this.statsView = new StatsView({collection: this.sessions});
    $('.main-content').empty().append(this.statsView.render());
  }
});

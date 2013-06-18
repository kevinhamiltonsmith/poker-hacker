var PokerHacker = Parse.Router.extend({

  routes: {
    "": "index",
    "session/all": "sessionsNav",
    "session/:id": "sessionNav",
    "overview": "overviewNav",
    "stats": "statsNav"
  },

  initialize: function() {
    Parse.initialize("3fI4larsOgFFmf2wXb1NL9LWZHydgHZl5IGpV8fz", "Kg3zRBFWsyLb4gszNN3Yv4EK4nPoUN5wMdSo7RcT");
    var self = this;
    this.sessions = new Sessions();      
    this.sessions.fetch({
      success: function() {
        for (var i = 0; i < self.sessions.models.length; i++) {
          self.sessions.models[i].trigger('start');
        };
      }
    });
    this.appView = new AppView();
    $('body').empty().append(this.appView.render());
  },

  start: function() {
    Parse.history.start();
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
    console.log(this.sessions)
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

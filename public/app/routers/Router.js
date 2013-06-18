var PokerHacker = Backbone.Router.extend({

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
    
    this.setupData = new SetupData(setupData);
    this.addGameSidebarView = new AddGameSidebarView({model: this.setupData});
    $('.new-game-sidebar').empty().append(this.addGameSidebarView.render());
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
    $('.main-content').empty().append(this.sessionsView.render().el);
  },

  sessionNav: function(id) {
    var query = new Parse.Query(Session);
    query.equalTo("sessionId", id);
    query.find({
      success: function(results) {
        results[0].trigger('start');
        this.session = results[0];
        this.sessionView = new SessionView({model: this.session});
        $('.main-content').empty().append(this.sessionView.render());
      }
    });
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

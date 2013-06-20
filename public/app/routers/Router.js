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
    
    this.fetchCollection();
    this.appView = new AppView();
    $('body').empty().append(this.appView.render());
  },

  start: function() {
    Backbone.history.start();
  },

  fetchCollection: function() {
    this.sessions = new Sessions();
    this.sessions.fetch({
      success: function() {
        console.log('sessions fetched successfully');
      }
    });
  },

  index: function() {
    this.indexView = new IndexView();
    $('.main-content').empty().append(this.indexView.render());
    this.loginSidebar();
  },

  sessionsNav: function() {
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('.main-content').empty().append(this.sessionsView.render().el);
    this.newSessionSidebar();
  },

  sessionNav: function(id) {
    var query = new Parse.Query(Session);
    query.equalTo("sessionId", parseInt(id));
    query.find({
      success: function(results) {
        results[0].trigger('start');
        this.session = results[0];
        this.sessionView = new SessionView({model: this.session});
        $('.main-content').empty().append(this.sessionView.render());
      }
    });
    this.newSessionSidebar();
  },

  overviewNav: function() {
    this.overviewView = new OverviewView({collection: this.sessions});
    $('.main-content').empty().append(this.overviewView.render());
    this.overviewChartView = new OverviewChartView({collection: this.sessions});
    $('.overview-chart-wrapper').empty().append(this.overviewChartView.render());
    this.newSessionSidebar();
  },

  statsNav: function() {
    this.statsView = new StatsView({collection: this.sessions});
    $('.main-content').empty().append(this.statsView.render());
    this.newSessionSidebar();
  },

  loginSidebar: function() {
    this.loginView = new LoginView();
    $('.new-game-sidebar').empty().append(this.loginView.render());
  },

  newSessionSidebar: function() {
    this.setupData = new SetupData(setupData);
    this.addGameSidebarView = new AddGameSidebarView({model: this.setupData, collection: this.sessions});
    $('.new-game-sidebar').empty().append(this.addGameSidebarView.render());
  }
});

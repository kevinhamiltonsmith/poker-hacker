var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index",
    "session/all": "sessionsNav",
    "session/:id": "sessionNav",
    "overview": "overviewNav",
    "stats": "statsNav",
    "newsession": "newSession",
    "tour/session/all": "tourSessionsNav",
    "tour/session/:id": "tourSessionNav",
    "tour/overview": "tourOverviewNav",
    "tour/stats": "tourStatsNav",
    "tour/newsession": "tourNewSession"
  },

  initialize: function() {
    Parse.initialize("3fI4larsOgFFmf2wXb1NL9LWZHydgHZl5IGpV8fz", "Kg3zRBFWsyLb4gszNN3Yv4EK4nPoUN5wMdSo7RcT");
    this.startFB();
    this.fetchCollection();
    this.appView = new AppView();
    $('body').empty().append('<div id="fb-root"></div>').append(this.appView.render());
    this.appSidebar();
  },

  start: function() {
    Backbone.history.start();
  },

  startFB: function() {
    facebookInit();
  },

  fetchCollection: function() {
    this.sessions = new Sessions();
    var query = new Parse.Query(Session);
    query.ascending("sessionId");
    this.sessions.query = query;
    this.sessions.fetch();
  },

  index: function() {
    this.indexView = new IndexView();
    $('.main-content').empty().append(this.indexView.render());
    $('.tour-nav, .top-in-progress-alert-tour').hide();
  },

  sessionsNav: function() {
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('.main-content').empty().append(this.sessionsView.render().el);
  },

  sessionNav: function(id) {
    var query = new Parse.Query(Session);
    query.equalTo("sessionId", parseInt(id));
    query.find({
      success: function(results) {
        // results[0].trigger('start');
        this.session = results[0];
        this.sessionView = new SessionView({model: this.session});
        $('.main-content').empty().append(this.sessionView.render());
      }
    });
  },

  overviewNav: function() {
    this.overviewView = new OverviewView({collection: this.sessions});
    $('.main-content').empty().append(this.overviewView.render().el);
    this.overviewChartView = new OverviewChartView({collection: this.sessions});
    $('.overview-chart-wrapper').empty().append(this.overviewChartView.render());
  },

  statsNav: function() {
    this.statsView = new StatsView({collection: this.sessions});
    $('.main-content').empty().append(this.statsView.render().el);
  },

  newSession: function() {
    this.setupData = new SetupData(setupData);
    this.addSessionView = new AddSessionView({model: this.setupData, collection: this.sessions});
    $('.main-content').empty().append(this.addSessionView.render().el);
  },

  appSidebar: function() {
    this.sidebarView = new SidebarView({tour: false});
    $('.app-sidebar').empty().append(this.sidebarView.render().el);
  },


  //TOUR MODE
  //Dublicate functions for app tour with test data
  tourSessionsNav: function() {
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('.main-content').empty().append(this.sessionsView.render().el);
  },

  tourSessionNav: function(id) {
    var query = new Parse.Query(Session);
    query.equalTo("sessionId", parseInt(id));
    query.find({
      success: function(results) {
        // results[0].trigger('start');
        this.session = results[0];
        this.sessionView = new SessionView({model: this.session});
        $('.main-content').empty().append(this.sessionView.render());
      }
    });
  },

  tourOverviewNav: function() {
    this.overviewView = new OverviewView({collection: this.sessions});
    $('.main-content').empty().append(this.overviewView.render().el);
    this.overviewChartView = new OverviewChartView({collection: this.sessions});
    $('.overview-chart-wrapper').empty().append(this.overviewChartView.render());
  },

  tourStatsNav: function() {
    this.statsView = new StatsView({collection: this.sessions});
    $('.main-content').empty().append(this.statsView.render().el);
  },

  tourNewSession: function() {
    this.setupData = new SetupData(setupData);
    this.addSessionView = new AddSessionView({model: this.setupData, collection: this.sessions});
    $('.main-content').empty().append(this.addSessionView.render().el);
  }
});

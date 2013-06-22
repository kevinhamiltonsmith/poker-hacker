var PokerHacker = Backbone.Router.extend({

  routes: {
    "": "index",
    "session/all": "sessionsNav",
    "session/:id": "sessionNav",
    "overview": "overviewNav",
    "stats": "statsNav",
    "newsession": "newSession"
  },

  initialize: function() {
    Parse.initialize("3fI4larsOgFFmf2wXb1NL9LWZHydgHZl5IGpV8fz", "Kg3zRBFWsyLb4gszNN3Yv4EK4nPoUN5wMdSo7RcT");
    
    this.fetchCollection();
    this.appView = new AppView();
    $('body').empty().append('<div id="fb-root"></div>').append(this.appView.render());
  },

  start: function() {
    Backbone.history.start();
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
    this.appSidebar();
  },

  sessionsNav: function() {
    this.sessionsView = new SessionsView({collection: this.sessions});
    $('.main-content').empty().append(this.sessionsView.render().el);
    this.appSidebar();
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
    this.appSidebar();
  },

  overviewNav: function() {
    this.overviewView = new OverviewView({collection: this.sessions});
    $('.main-content').empty().append(this.overviewView.render().el);
    this.overviewChartView = new OverviewChartView({collection: this.sessions});
    $('.overview-chart-wrapper').empty().append(this.overviewChartView.render());
    this.appSidebar();
  },

  statsNav: function() {
    this.statsView = new StatsView({collection: this.sessions});
    $('.main-content').empty().append(this.statsView.render().el);
    this.appSidebar();
  },

  newSession: function() {
    this.setupData = new SetupData(setupData);
    this.addSessionView = new AddSessionView({model: this.setupData, collection: this.sessions});
    $('.main-content').empty().append(this.addSessionView.render().el);
    this.appSidebar();
  },

  appSidebar: function() {
    this.sidebarView = new SidebarView();
    $('.app-sidebar').empty().append(this.sidebarView.render().el);
  }
});

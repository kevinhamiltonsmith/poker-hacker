var OverviewView = Backbone.View.extend({

  className: 'overview',

  initialize: function() {
    this.collection.on('sync', function(){
      this.$el.empty();
      this.overviewChartView = new OverviewChartView({collection: this.collection});
      this.render().el;
      $('.overview-chart-wrapper').empty().append(this.overviewChartView.render());
    }, this);
  },

  template: _.template(''+
    '<h3>All Results</h3>' +
    '<div class="overview-chart-wrapper"></div>' +
    '<table class="sesh-detail">' +
      '<tr><td>Number of Sessions</td><td class="data-column"><%= numSessions %></td></tr>' +
      '<tr><td>Total Won</td><td class="data-column <%= winClass %>"><%= totalWon %></td></tr>' +
      '<tr><td>Total Hours</td><td class="data-column"><%= totalHours %></td></tr>' +
      '<tr><td>Average Win Rate</td><td class="data-column <%= winClass %>"><%= winRate %> / hour</td></tr>' +
      '<tr><td>Average Win Per Session</td><td class="data-column <%= winClass %>"><%= winRateSesh %> / session</td></tr>' +
      '<tr><td>Win Rate Std Deviation</td><td class="data-column <%= winClass %>"><%= winRateStdDev %> / hour</td></tr>' +
    '</table>'
  ),

  render: function(){
    var overView = {};

    overView.numSessions = this.collection.totalSessions();
    overView.totalHours = this.collection.totalHours();

    var totalWon = this.collection.totalWon();
    var winRate = this.collection.winRate();
    var winRateSesh = this.collection.winRateSesh();
    var winRateStdDev = this.collection.winRateStdDev();
    if (totalWon < 0) {
      overView.winClass = "session-loss";
      overView.totalWon = '($' + totalWon*-1 + ')';
      overView.winRate = '($' + winRate*-1 + ')';
      overView.winRateSesh = '($' + winRateSesh*-1 + ')';
      overView.winRateStdDev = '($' + winRateStdDev + ')';
    } else {
      overView.winClass = "session-win";
      overView.totalWon = '$' + totalWon;
      overView.winRate = '$' + winRate;
      overView.winRateSesh = '$' + winRateSesh;
      overView.winRateStdDev = '$' + winRateStdDev;
    }

    this.$el.append(this.template(overView));

    return this;
  }
});

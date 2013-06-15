var OverviewView = Backbone.View.extend({

  className: 'overview',

  template: _.template(''+
    '<h3>All Results</h3>' +
    '<div class="overview-chart">Profit Chart</div>' +
    '<table class="sesh-detail">' +
      '<tr><td>Number of Sessions</td><td class="data-column"><%= numSessions %></td></tr>' +
      '<tr><td>Total Won</td><td class="data-column <%= winClass %>"><%= totalWon %></td></tr>' +
      '<tr><td>Total Hours</td><td class="data-column"><%= totalHours %></td></tr>' +
      '<tr><td>Average Win Rate</td><td class="data-column <%= winClass %>"><%= winRate %> / hour</td></tr>' +
      '<tr><td>Average Win Per Session</td><td class="data-column <%= winClass %>"><%= winRateSesh %> / session</td></tr>' +
      '<tr><td>Win Rate Std Deviation</td><td class="data-column <%= winClass %>"><%= winRateStdDev %> / hour</td></tr>' +
    '</table>'
  ),

  initialize: function() {
  },

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

    return this.$el.html(this.template(overView));
  }
});

var OverviewView = Backbone.View.extend({

  className: 'overview',

  template: _.template(''+
    '<div class="row">' +
      '<div class="centered six columns">' +
        '<h3>All Results</h3>' +
        '<div class="overview-chart">Profit Chart</div>' +
        '<table class="sesh-detail">' +
          '<tr><td>Number of Sessions</td><td class="data-column"><%= numSessions %></td></tr>' +
          '<tr><td>Total Won</td><td class="data-column">$<%= totalWon %></td></tr>' +
          '<tr><td>Total Hours</td><td class="data-column"><%= totalHours %></td></tr>' +
          '<tr><td>Average Win Rate</td><td class="data-column">$<%= winRate %> / hour</td></tr>' +
        '</table>' +
      '</div>' +
    '</div>'
  ),

  events: {
  },

  initialize: function() {
  },

  render: function(){
    var overView = {};

    overView.numSessions = this.collection.totalSessions();
    overView.totalWon = this.collection.totalWon();
    overView.totalHours = this.collection.totalHours().toFixed(2);
    overView.winRate = this.collection.winRate();

    return this.$el.html(this.template(overView));
  }
});

var StatsView = Backbone.View.extend({

  className: 'stats',

  template: _.template(''+
    '<div class="row">' +
      '<div class="centered seven columns">' +
        '<h3>Stats</h3>' +
        '<table class="sesh-detail">' +
          '<caption>Totals</caption>' +
          '<tr><td>Total Won / (Lost)</td><td class="data-column"><%= totalWon %></td></tr>' +
          '<tr><td>Total Hours</td><td class="data-column"><%= totalHours %></td></tr>' +
          '<tr><td>Number of Sessions</td><td class="data-column"><%= numSessions %></td></tr>' +
          '<tr><td>Win Percentage</td><td class="data-column"><%= winPercent %>%</td></tr>' +
          '<tr><td>Loss Percentage</td><td class="data-column"><%= lossPercent %>%</td></tr>' +
          '<tr><td>Wins</td><td class="data-column"><%= wins %></td></tr>' +
          '<tr><td>Losses</td><td class="data-column"><%= losses %></td></tr>' +
          '<tr><td>Break Even</td><td class="data-column"><%= breakEven %></td></tr>' +
        '</table>' +
        '<table class="sesh-detail">' +
          '<caption>Best / Worst</caption>' +
          '<tr><td>Best Session</td><td class="data-column"><%= bestSesh %></td></tr>' +
          '<tr><td>Worst Session</td><td class="data-column"><%= worstSesh %></td></tr>' +
        '</table>' +
        '<table class="sesh-detail">' +
          '<caption>Streaks</caption>' +
          '<tr><td>Winning Sessions</td><td class="data-column"><%= winStreakSesh %></td></tr>' +
          '<tr><td>Losing Sessions</td><td class="data-column"><%= loseStreakSesh %></td></tr>' +
        '</table>' +
      '</div>' +
    '</div>'
  ),

  events: {
  },

  initialize: function() {
  },

  render: function(){
    var stats = {};

    stats.totalWon = this.addDollar(this.collection.totalWon());
    stats.totalHours = this.collection.totalHours();
    stats.numSessions = this.collection.totalSessions();
    stats.winPercent = this.collection.winPercentage(true, false);
    stats.lossPercent = this.collection.winPercentage(false, false);
    stats.wins = this.collection.winPercentage(true, true);
    stats.losses = this.collection.winPercentage(false, true);
    stats.breakEven = stats.numSessions - stats.wins - stats.losses;

    stats.bestSesh = this.addDollar(this.collection.bestSession(true));
    stats.worstSesh = this.addDollar(this.collection.bestSession(false));

    stats.winStreakSesh = this.collection.sessionStreak(true);
    stats.loseStreakSesh = this.collection.sessionStreak(false);

    return this.$el.html(this.template(stats));
  },

  addDollar: function(num){
    return (num < 0) ? '-$' + (num * -1) : '$' + num;
  }
});

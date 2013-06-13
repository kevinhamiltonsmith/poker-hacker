var StatsView = Backbone.View.extend({

  className: 'stats',

  template: _.template(''+
    '<div class="row">' +
      '<div class="centered seven columns">' +
        '<h3>Stats</h3>' +
        '<table class="sesh-detail">' +
          '<caption>Totals</caption>' +
          '<tr><td>Number of Sessions</td><td class="data-column"><%= numSessions %></td></tr>' +
          '<tr><td>Win Percentage</td><td class="data-column"><%= winPercent %>%</td></tr>' +
          '<tr><td>Loss Percentage</td><td class="data-column"><%= lossPercent %>%</td></tr>' +
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

    stats.numSessions = this.collection.totalSessions();
    stats.winPercent = this.collection.winPercentage(true);
    stats.lossPercent = this.collection.winPercentage(false);

    return this.$el.html(this.template(stats));
  }
});

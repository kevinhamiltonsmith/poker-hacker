var SessionView = Backbone.View.extend({

  className: 'session',

  template: _.template(''+
    '<div data-session-id=<%= sessionId %> class="session-row">' +
      '<div class="row">' +
        '<div class="centered six columns">' +
          '<h3>Cash Game Session Detail</h3>' +
          '<table class="session-detail">' +
            '<tr><td>Location</td><td class="data-column"><%= location %></td></tr>' +
            '<tr><td>Stakes</td><td class="data-column"><%= stakes %></td></tr>' +
            '<tr><td>Game</td><td class="data-column"><%= game %></td></tr>' +
            '<tr><td>Net Profit</td><td class="data-column <%= profitClass %>"><%= parenProfit %></td></tr>'+
            '<tr><td>Start Date and Time</td><td class="data-column"><%= dateStart %></td></tr>' +
            '<tr><td>End Date and Time</td><td class="data-column"><%= dateEnd %></td></tr>' +
            '<tr><td>Session Length</td><td class="data-column"><%= sessionLengthShort %></td></tr>' +
            '<tr><td>Day of the Week</td><td class="data-column"><%= weekday %></td></tr>' +
            '<tr><td>Location Type</td><td class="data-column"><%= locationType %></td></tr>' +
            '<tr><td>Total Buyin</td><td class="data-column <%= profitClass %>">$<%= totalBuyin %></td></tr>' +
            '<tr><td>Cashed Out</td><td class="data-column <%= profitClass %>">$<%= cashedOut %></td></tr>' +
            '<tr><td>Rebuy Count</td><td class="data-column <%= profitClass %>"><%= rebuyCount %></td></tr>' +
            '<tr><td>Rebuy Total</td><td class="data-column <%= profitClass %>">$<%= rebuyTotal %></td></tr>' +
            '<tr><td>Notes</td><td class="data-column session-note"><%= note %></td></tr>' +
          '</table>' +
        '</div>' +
      '</div>' +
    '</div>'
  ),

  initialize: function() {
    this.render();
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
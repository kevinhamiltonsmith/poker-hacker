var SessionView = Backbone.View.extend({

  className: 'sesh',

  template: _.template(''+
    '<div class="row">' +
      '<div class="ten columns centered">' +
        '<h3>Cash Game Session Detail</h3>' +
        '<ul class="three_up tiles sesh-nav">' +
          '<li class="button-bottom prev-sesh-nav">' +
            '<div class="btn small info metro"><a href="#">Prev Session</a></div>' +
          '</li>' +
          '<li class="button-bottom all-sesh-nav">' +
            '<div class="btn small info metro"><a href="#">All Sessions</a></div>' +
          '</li>' +
          '<li class="button-bottom next-sesh-nav">' +
            '<div class="btn small info metro"><a href="#">Next Session</a></div>' +
          '</li>' +
        '</ul>' +
        '<table class="sesh-detail">' +
          '<tr><td>Session Number</td><td class="data-column"><%= sessionId %></td></tr>' +
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
    '</div>'
  ),

  events: {
    "click .prev-sesh-nav a" : function(e){
      e.preventDefault();
      var seshId = Number(this.model.get('sessionId')) - 1;
      this.sessionNav(seshId);
    },

    "click .all-sesh-nav a" : function(e){
      e.preventDefault();
      this.sessionNav("all");
    },

    "click .next-sesh-nav a" : function(e){
      e.preventDefault();
      var seshId = Number(this.model.get('sessionId')) + 1;
      this.sessionNav(seshId);
    },
  },

  initialize: function() {
    this.render();
    this.setupData = new SetupData(setupData);
    this.addGameSidebarView = new AddGameSidebarView({model: this.setupData});
    $('.new-game-sidebar').empty().append(this.addGameSidebarView.render());
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  },

  sessionNav: function(id) {
    pokerHacker.navigate('session/' + id, true);
  }
});
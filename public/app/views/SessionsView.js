var SessionsView = Backbone.View.extend({

  className: 'sessions',

  template: _.template(''+
    '<div data-session-id=<%= sessionId %> class="sessions-row">' +
      '<div class="row">' +
        '<div class="centered six columns single-session-row">' +
          '<div class="sessions-profit <%= profitClass %>"><%= parenProfit %></div>'+
          '<div class="sessions-game"><%= game %></div>' +
          '<div class="sessions-stakes"><%= stakes %></div>' +
          '<div class="sessions-time"><%= sessionLengthShort %></div>'+
          '<div class="clearfix"></div>' +
          '<div class="sessions-location"><%= location %></div>'+
          '<div class="sessions-date"><%= date %></div>'+
        '</div>' +
      '</div>' +
    '</div>'
  ),

  events: {
    "click .sessions-row" : function(event){
      var id = $(event.currentTarget).data("session-id");
      this.sessionNav(id);
    }
  },

  initialize: function() {
  },

  render: function(){
    var self = this;
    this.$el.append('<h3>Cash Game Session History</h3>');
    return this.$el.append(
      this.collection.map(function(session){
        return self.$el.append(self.template(session.attributes));
      })
    );
  },

  sessionNav: function(id) {
    pokerHacker.navigate('session/' + id, true);
  }
});
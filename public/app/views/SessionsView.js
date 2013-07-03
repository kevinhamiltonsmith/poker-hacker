var SessionsView = Backbone.View.extend({

  className: 'sessions',

  initialize: function() {
    this.collection.on('sync', function(){
      this.$el.empty();
      $('.main-content').empty().append(this.render().el);
    }, this);
  },

  events: {
    "click .single-session-row" : function(event){
      var id = $(event.currentTarget).data("session-id");
      this.sessionNav(id);
    }
  },

  sessionNav: function(id) {
    pokerHacker.navigate('session/' + id, true);
  },

  template: _.template(''+
    '<div class="row">' +
      '<div class="ten columns centered single-session-row" data-session-id=<%= sessionId %>>' +
        '<div class="sessions-data">' +
          '<div class="sessions-profit <%= profitClass %>"><%= parenProfit %></div>'+
          '<div class="sessions-location"><%= location %></div>'+
          '<div class="sessions-time"><%= sessionLength %></div>'+
          '<div class="clearfix"></div>' +
          '<div class="sessions-stakes"><%= stakes %></div>' +
          '<div class="sessions-game"><%= game %></div>' +
          '<div class="sessions-date"><%= date %></div>'+
        '</div>' +
        '<div class="more-detail">' +
          '<div class="right-arrow">></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  ),

  render: function(){
    var self = this;
    this.$el.append(
      this.collection.map(function(session){
        return self.$el.prepend(self.template(session.attributes));
      })
    );
    this.$el.prepend('<h3>Cash Game Session History</h3>');
    return this;
  }
});
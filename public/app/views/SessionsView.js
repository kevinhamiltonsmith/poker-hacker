var SessionsView = Backbone.View.extend({

  className: 'sessions',

  template: _.template(''+
    '<div class="sessions-row">' +
      '<div class="row">' +
        '<div class="centered six columns session-top">' +
          '<div class="sessions-profit <%= profitClass %>"><%= parenProfit %></div>'+
          '<div class="sessions-game"><%= game %></div>' +
          '<div class="sessions-stakes"><%= stakes %></div>' +
          '<div class="sessions-time"><%= sessionLength %></div>'+
        '</div>' +
      '</div>' +
      '<div class="row">' +
        '<div class="centered six columns session-bottom">' +
          '<div class="sessions-location"><%= location %></div>'+
          '<div class="sessions-date"><%= date %></div>'+
        '</div>' +
      '</div>' +
    '</div>'
  ),

  initialize: function() {
    this.render();
  },

  render: function(){
    var self = this;
    return this.$el.append(
      this.collection.map(function(session){
        return self.$el.append(self.template(session.attributes));
      })
    );
  }
});
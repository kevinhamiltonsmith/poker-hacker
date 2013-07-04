var IndexView = Backbone.View.extend({

  className: 'index',

  template: _.template(''+
    '<div class="row">' +
      '<div class="ten columns centered">' +
        '<h1>Hack Your<br>Poker Game</h1>' +
        '<div class="index-info">' +
          '<h4 style="color: red;">Currently in Private Beta Testing</h4>' +
          '<p>Check back soon for version 1.0 of Poker Hacker. Try the Tour mode!</p>' +
          '<h4>Powerful Session Tracking</h4>' +
          '<p>Live poker tracking, the way it should be: a simple to use interface, complete stats analysis, and no Excel spreadsheets.</p>' +
          '<h4>View on Any Device</h4>' +
          '<p>Responsive, mobile-first design for easy access while at the table.</p>' +
          '<h4>Your Data is Secure in the Cloud</h4>' +
          '<p>Modern database storage, so your data is always backed-up and accessible from anywhere, on any device.</p>' +
        '</div>' +
      '</div>' +
    '</div>'
  ),

  render: function(){
    return this.$el.html(this.template());
  }
});

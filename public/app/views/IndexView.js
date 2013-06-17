var IndexView = Backbone.View.extend({

  className: 'index',

  template: _.template(''+
    '<div class="row">' +
      '<div class="ten columns centered">' +
        '<h1>Hack Your<br>Poker Game</h1>' +
        '<div class="sign-in">' +
          '<div class="btn large primary metro"><a href="#">Sign In</a></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  ),

  initialize: function() {
    this.addGameSidebarView = new AddGameSidebarView();
    $('.new-game-sidebar').empty().append(this.addGameSidebarView.render());
  },

  render: function(){
    return this.$el.html(this.template());
  }
});

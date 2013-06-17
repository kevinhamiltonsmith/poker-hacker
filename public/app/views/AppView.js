var AppView = Backbone.View.extend({

  className: 'app',

  template: _.template(''+
    '<div class="navbar fixed" gumby-fixed="top" id="nav1">' +
      '<div class="row">' +
        '<a class="toggle" gumby-trigger=".ul-nav" href="#"><i class="icon-menu"></i></a>' +
        '<h3 class="four columns logo">' +
          '<a href="index.html">Poker Hacker</a>' +
        '</h3>' +
        '<ul class="eight columns ul-nav">' +
          '<li><a href="index.html#overview">Overview</a></li>' +
          '<li><a href="index.html#stats">Stats</a></li>' +
          '<li><a href="index.html#session/all">All Sessions</a></li>' +
        '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="row container">' +
      '<div class="eight columns main-content">' +
      '</div>' +
      '<div class="push_one three columns">' +
        '<h4>Add New Session Goes Here</h4>' +
      '</div>' +
    '</div>'
  ),

  initialize: function() {
  },

  render: function(){
    return this.$el.html(this.template());
  }
});

var AppView = Backbone.View.extend({

  className: 'app',

  template: _.template(''+
    '<div class="modal" id="modal1">' +
      '<div class="content">' +
        '<a class="close switch" gumby-trigger="|#modal1"><i class="icon-cancel" /></i></a>' +
        '<div class="row">' +
          '<div class="ten columns centered center-text">' +
            '<h2>Login With Facebook</h2>' +
            '<p>Coming Soon</p>' +
            '<p class="btn primary medium"><a href="#" class="switch" gumby-trigger="|#modal1">Login</a></p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="navbar fixed" gumby-fixed="top" id="nav1">' +
      '<div class="row top-in-progress-alert">' +
        '<div class="danger alert">Session currently in progress.</div>' +
      '</div>' +
      '<div class="row">' +
        '<a class="toggle" gumby-trigger=".ul-nav" href="#"><i class="icon-menu"></i></a>' +
        '<h3 class="four columns logo">' +
          '<a href="index.html" class="main-logo">Poker Hacker</a>' +
        '</h3>' +
        '<ul class="eight columns ul-nav">' +
          '<li><a href="index.html#overview">Overview</a></li>' +
          '<li><a href="index.html#stats">Stats</a></li>' +
          '<li><a href="index.html#session/all">All Sessions</a></li>' +
          '<li><span class="user-welcome">Welcome, Kevin</span></li>' +
        '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="row container">' +
      '<div class="eight columns main-content">' +
      '</div>' +
      '<div class="four columns new-game-sidebar">' +
      '</div>' +
    '</div>' +
    '<div class="row footer">' +
      '<ul class="centered ten columns">' +
        '<li><p>©2013 <a href="http://kevinhamiltonsmith.com">Kevin Hamilton Smith</a></p>' +
        '<li><i class="icon-github"></i><p><a href="https://github.com/kevinhamiltonsmith/poker-hacker">Fork on Github</a></p>' +
      '</ul>' +
    '</div>'
  ),

  initialize: function() {
  },

  render: function(){
    return this.$el.html(this.template());
  }
});

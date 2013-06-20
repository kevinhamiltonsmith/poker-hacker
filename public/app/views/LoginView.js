var LoginView = Backbone.View.extend({

  className: 'login',

  template: _.template(''+
    '<div class="sign-in-button">' +
      '<div class="btn large primary metro icon-left entypo icon-facebook-squared"><a href="#" class="switch active" gumby-trigger="#modal1">Sign In</a></div>' +
    '</div>'
  ),

  initialize: function() {
  },

  render: function(){
    return this.$el.html(this.template());
  }
});
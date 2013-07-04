var SidebarView = Backbone.View.extend({

  className: 'sidebar',

  events: {
    'click .tour-button': 'tourStart'
  },

  template: _.template('' +
    //disabled FB button placeholder, remove after OAuth is complete
    '<div class="sign-in-button">' +
      '<div class="btn large dafault metro icon-left entypo icon-facebook-squared"><a href="#">Sign In</a></div>' +
    '</div>' +
    '<div class="tour-button">' +
      '<div class="btn large primary metro icon-left entypo icon-address"><a href="#">Tour</a></div>' +
    '</div>'
  ),

  loginSidebar: function() {
    //FB login turned off until OAuth is complete
    // this.loginView = new LoginView();
    // this.$el.prepend(this.loginView.render().el);
  },

  tourStart: function(e) {
    e.preventDefault();
    $('.tour-nav').show();
    $('.top-in-progress-alert-tour').slideDown('slow');
    pokerHacker.navigate('tour/session/all', true);
  },

  render: function(){
    this.$el.append(this.template());
    this.loginSidebar();
    return this;
  }
});

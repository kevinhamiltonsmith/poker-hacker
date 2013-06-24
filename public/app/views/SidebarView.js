var SidebarView = Backbone.View.extend({

  className: 'sidebar',

  events: {
  },

  template: _.template(''
    // '<div class="new-session-button btn medium success metro">' +
    //   '<input type="submit" value="New Session"></input>' +
    // '</div>'
  ),

  initialize: function() {
  },

  loginSidebar: function() {
    this.loginView = new LoginView();
    this.$el.prepend(this.loginView.render().el);
  },

  render: function(){
    this.$el.append(this.template());
    this.loginSidebar();
    return this;
  }
});

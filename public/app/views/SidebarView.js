var SidebarView = Backbone.View.extend({

  className: 'sidebar',

  template: _.template(''),

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

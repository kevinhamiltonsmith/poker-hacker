var LoginView = Backbone.View.extend({

  className: 'login',

  events: {
    'click .sign-out-button': function(e) {
      e.preventDefault();
      FB.logout(function(response) {
        console.log('You are logged out', response);
        $('.sign-out-button').hide();
        $('.user-message').empty().append('<h5>You have been signed out.</h5>');
        $('.sign-in-button').fadeIn('slow');
      });
    },

    'click .sign-in-button': function(e) {
      e.preventDefault();
      FB.login(function(response) {
        if (response.authResponse) {
          $('.sign-in-button').hide();
          $('.sign-out-button').show();
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log('Welcome, ' + response.first_name + '.');
            $('.user-message').empty().append('<h5>Welcome, ' + response.first_name + '</h5>');
          });
        } else {           
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }
  },

  template: _.template(''+
    '<div class="user-message">' +
    '</div>' +
    '<div class="sign-in-button">' +
      '<div class="btn large primary metro icon-left entypo icon-facebook-squared"><a href="#">Sign In</a></div>' +
    '</div>' +
    '<div class="sign-out-button">' +
      '<div class="btn medium primary metro icon-left entypo icon-facebook-squared"><a href="#">Sign Out</a></div>' +
    '</div>'
  ),

  initialize: function() {
  },

  render: function(){
    this.$el.append(this.template());
    return this;
  }
});

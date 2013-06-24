var LoginView = Backbone.View.extend({

  className: 'login',

  events: {
    'click .sign-out-button': 'signedOut',
    'click .sign-in-button': 'signedIn'
  },
  signedIn: function(e) {
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
    return false; // e.preventDefault();
  },
  signedOut: function(e) {
      FB.logout(function(response) {
        console.log('You are logged out', response);
        $('.sign-out-button').hide();
        $('.user-message').empty().append('<h5>You have been signed out.</h5>');
        $('.sign-in-button').fadeIn('slow');
      });
    return false; // e.preventDefault();
  },
  signedInTemplate: _.template(''+
    '<div class="user-message">' +
    '</div>' +
    '<div class="sign-out-button">' +
      '<div class="btn medium primary metro icon-left entypo icon-facebook-squared"><a href="#">Sign Out</a></div>' +
    '</div>'
  ),
  signedOutTemplate: _.template(''+
    '<div class="user-message">' +
    '</div>' +
    '<div class="sign-in-button">' +
      '<div class="btn large primary metro icon-left entypo icon-facebook-squared"><a href="#">Sign In</a></div>' +
    '</div>'
  ),

  initialize: function() {
  },

  render: function(){
    var self = this;
    $(document).on('fbInit', function(){
      FB.getLoginStatus(checkLoginStatus);
      function authUser() {
        FB.login(checkLoginStatus);
      }
      function checkLoginStatus(response) {
        if(response && response.status == 'connected') {
          console.log('User is authorized');
          // Now Personalize the User Experience
          console.log('Access Token: ' + response.authResponse.accessToken);
          self.$el.append(self.signedInTemplate());
        } else {
          console.log('User is not authorized');
          self.$el.append(self.signedOutTemplate());
        }
      }
    });

    return this;
  }
});

var LoginView = Backbone.View.extend({

  className: 'login',
  initialize: function() {
  },
  template: _.template(''+
    // '<div class="user-message"><h5><%= message %></h5></div>' +
    '<div class="<%= button %>">' +
      '<div class="btn <%= btnclass %> primary metro icon-left entypo icon-facebook-squared"><a href="#">Sign <%= content %></a></div>' +
    '</div>'
  ),
  tempdata: {
    connected: {
      button: 'sign-out-button',
      content: 'Out',
      btnclass: 'medium'
    },
    unknown: {
      button: 'sign-in-button',
      content: 'In',
      btnclass: 'large'
    }
  },
  events: {
    'click .sign-out-button': 'signedOut',
    'click .sign-in-button': 'signedIn'
  },

  signedIn: function(e) {
      self = this;
      FB.login(function(response) {
        if (response.authResponse) {
          FB.api('/me', function(response) {
            console.log('Welcome, ' + response.first_name + '.');
            self.render();
          });
        } else {           
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    return false; // e.preventDefault();
  },

  signedOut: function(e) {
      self = this;
      FB.logout(function(response) {
        console.log('You are logged out', response);
        self.render();
      });
    return false; // e.preventDefault();
  },

  render: function(stuff){
    stuff = stuff || this.tempdata;
    self = this;
    function checkLoginStatus(response) {
        userStatusdata = stuff[response.status];
        self.$el.html(self.template(userStatusdata));
    };
    console.log(FB);
    if (FB) {
      console.log('has FB');
      FB.getLoginStatus(checkLoginStatus);
    } else {
      console.log('no has FB');
      checkLoginStatus({status:unknown});
    }
    // Login in the current user via Facebook and ask for email permission
    //function authUser() {
    //  FB.login(checkLoginStatus);
    //}
    return self;
  }
});

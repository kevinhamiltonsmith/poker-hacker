window.fbAsyncInit = function() {
  // init the FB JS SDK
  FB.init({
    appId      : '478839102195567',
    channelUrl : '//pokerhacker.herokuapp.com/channel.html',
    status     : true,                                 // Check Facebook Login status
    cookie     : true,                                 // enable cookies to allow the server to access the session
    xfbml      : true                                  // Look for social plugins on the page
  });

  // Additional initialization code such as adding Event Listeners goes here
};

// Load the SDK asynchronously
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/all.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
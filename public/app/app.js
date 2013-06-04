var sessions = new Sessions(testData);
var sessionsView = new SessionsView({collection: sessions});
$('body').append(sessionsView.render());

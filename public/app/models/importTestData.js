//import function for Poker Journal data
var data = testData;

Parse.initialize("3fI4larsOgFFmf2wXb1NL9LWZHydgHZl5IGpV8fz", "Kg3zRBFWsyLb4gszNN3Yv4EK4nPoUN5wMdSo7RcT");

for (var i = 0; i < data.length; i++) {
  data[i].dateStartRaw = new Date();
  data[i].dateEndRaw = new Date();
  data[i].sessionId = i+1;
  var testSesh = new Session(data[i]);
  testSesh.trigger('start');

  testSesh.save(null, {
    wait: true,
    success: function(newSesh) {
      console.log('New object created with objectId: ' + newSesh.id);
    },
    error: function(newSesh, error) {
      console.log('Failed to create new object, with error code: ' + error.description);
    }
  });
}

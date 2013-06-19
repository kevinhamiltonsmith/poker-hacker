console.log('TEST DATA')
var data = testData;

Parse.initialize("3fI4larsOgFFmf2wXb1NL9LWZHydgHZl5IGpV8fz", "Kg3zRBFWsyLb4gszNN3Yv4EK4nPoUN5wMdSo7RcT");

var testSesh = new Session(data[0]);
testSesh.save(null, {
  success: function(newSesh) {
    alert('New object created with objectId: ' + newSesh.id);
  },
  error: function(newSesh, error) {
    alert('Failed to create new object, with error code: ' + error.description);
  }
});

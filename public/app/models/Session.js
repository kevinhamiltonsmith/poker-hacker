var Session = Parse.Object.extend({

  className: "TestData",

  defaults: {
    "sessionId":99999,
    "dateStart":"",
    "dateEnd":"",
    "sessionLength":"0:00",
    "weekday":"",
    "game":"",
    "stakes":"",
    "limitType":"",
    "location":"",
    "locationType":"Casino",
    "totalBuyin":0,
    "cashedOut":0,
    "netProfit":0,
    "note":"",
    "parenProfit":"",
    "profitClass":"",
    "data":""
  },

  initialize: function() {
    this.on('formatData', this.formatData, this);
  },

  formatData: function() {
    var netProfit = this.get('netProfit');
    if (netProfit < 0) {
      netProfit = '($' + netProfit*-1 + ')';
      this.set({parenProfit: netProfit});
      this.set({profitClass: 'session-loss'});
    } else {
      this.set({parenProfit: '$' + netProfit});
      this.set({profitClass: 'session-win'});
    }

    var date = this.get('dateStart');
    date = date.substr(0, date.indexOf(','));
    this.set({date: date});
  }
});
var Session = Backbone.Model.extend({
  defaults: {
    //pull in user-specified defaults
  },

  initialize: function() {
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
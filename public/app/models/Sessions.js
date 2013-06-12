var Sessions = Backbone.Collection.extend({
  model: Session,

  totalSessions: function() {
    return this.length;
  },

  totalWon: function() {
    return this.reduce(function(memo, value){
      return memo + value.get('netProfit');
    }, 0);
  },

  totalHours: function() {
    return this.reduce(function(memo, value){
      var timeParts = value.get('sessionLength').split(/:/);
      var timePeriodHours = (parseInt(timeParts[0], 10)) + (parseInt(timeParts[1], 10) / 60) + (parseInt(timeParts[2], 10) / 3600);
      return memo + timePeriodHours;
    }, 0).toFixed(2);
  },

  winRate: function() {
    return (this.totalWon() / this.totalHours()).toFixed(2);
  },

  winRateSesh: function() {
    return (this.totalWon() / this.totalSessions()).toFixed(2);
  },

  winRateStdDev: function() {
    var dollarPerHour = this.winRate();
    var variance = this.reduce(function(memo, value){
      var timeParts = value.get('sessionLength').split(/:/);
      var singleHours = (parseInt(timeParts[0], 10)) + (parseInt(timeParts[1], 10) / 60) + (parseInt(timeParts[2], 10) / 3600);
      var singleVariance = Math.pow(((value.get('netProfit') / singleHours) - dollarPerHour), 2);
      return memo + singleVariance;
    }, 0);
    return Math.sqrt(variance / this.totalSessions()).toFixed(2);
  }
});
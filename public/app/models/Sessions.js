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
    }, 0);
  },

  winRate: function() {
    return (this.totalWon() / this.totalHours()).toFixed(2);
  }
});
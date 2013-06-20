var Sessions = Parse.Collection.extend({
  model: Session,

  initialize: function() {
    this.on('add', function(){
      console.log('new model added to colleciton');
    }, this);
  },

  totalSessions: function() {
    return this.length;
  },

  totalWon: function() {
    return this.reduce(function(memo, value){
      return memo + value.get('netProfit');
    }, 0);
  },

  profitData: function() {
    var result = [];
    var runningTotal = 0;
    _.each(this.models, function(value){
      runningTotal = runningTotal + value.get('netProfit');
      result.push(runningTotal);
    });
    return result;
  },

  totalHours: function() {
    return this.reduce(function(memo, value){
      var timeParts = value.get('sessionLength').split(/:/);
      var timePeriodHours = (parseInt(timeParts[0], 10)) + (parseInt(timeParts[1], 10) / 60);
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
      var singleHours = (parseInt(timeParts[0], 10)) + (parseInt(timeParts[1], 10) / 60);
      var singleVariance = Math.pow(((value.get('netProfit') / singleHours) - dollarPerHour), 2);
      return memo + singleVariance;
    }, 0);
    return Math.sqrt(variance / this.totalSessions()).toFixed(2);
  },

  //Stats
  winPercentage: function(win, notPercent) {
    var winCount = 0;
    var lossCount = 0;
    _.each(this.models, function(value){
      if (value.get('netProfit') > 0) winCount += 1;
      if (value.get('netProfit') < 0) lossCount += 1;
    });
    var result = win ? winCount : lossCount;
    if (notPercent) {
      return result;
    } else {
      return (result / this.totalSessions() * 100).toFixed(1);
    }
  },

  bestSession: function(best) {
    var bestSesh = this.models[0] ? this.models[0].get('netProfit') : 0;
    var worstSesh = this.models[0] ? this.models[0].get('netProfit') : 0;
    _.each(this.models, function(value){
      if (value.get('netProfit') > bestSesh) bestSesh = value.get('netProfit');
      if (value.get('netProfit') < worstSesh) worstSesh = value.get('netProfit');
    });
    return best ? bestSesh : worstSesh;
  },

  sessionStreak: function(wins) {
    var all = this.models;
    var winStreak = 0;
    var loseStreak = 0;
    var currentLongestWin = 0;
    var currentLongestLoss = 0;
    _.each(all, function(value){
      if (value.get('netProfit') > 0) winStreak = 1;
      if (value.get('netProfit') < 0) loseStreak = 1;
    });
    for (var i = 1; i < all.length; i++) {
      if ((all[i-1].get('netProfit') > 0) && (all[i].get('netProfit') > 0)) {
        currentLongestWin += 1;
        if (currentLongestWin > winStreak) winStreak = currentLongestWin;
      } else {
        currentLongestWin = 1;
      }
      if ((all[i-1].get('netProfit') < 0) && (all[i].get('netProfit') < 0)) {
        currentLongestLoss += 1;
        if (currentLongestLoss > loseStreak) loseStreak = currentLongestLoss;
      } else {
        currentLongestLoss = 1;
      }
    }
    return wins ? winStreak : loseStreak;
  }

});
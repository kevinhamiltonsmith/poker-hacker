var AddGameSidebarView = Backbone.View.extend({

  className: 'add-game-sidebar-view',

  initialize: function() {
    this.newSesh = new Session();
  },

  events: {
    'click .new-session-button': function(event){
      event.preventDefault();
      this.createNewSesh();
    },

    'click .end-session-button': function(event){
      event.preventDefault();
      this.finalizeSesh();
    },
  },

  createNewSesh: function() {
    this.newSesh = new Session();

    this.newSesh.on('change:limitType', function(){
      this.render();
      this.startSeshEvents();
    }, this);

    this.newSesh.on('change:netProfit', function(){
      this.endRender();
      this.endSeshEvents();
    }, this);

    this.setTime(true);

    this.newSesh.set({sessionId: this.collection.models.length + 1});
    this.newSesh.set({totalBuyin: parseInt($('.buyin-input').val()) });
    this.newSesh.set({location: $('.locationSelect').val()});
    this.newSesh.set({stakes: $('.stakesSelect').val()});
    this.newSesh.set({game: $('.gamesSelect').val()});
    this.newSesh.set({limitType: $('.limitSelect').val()});

    // var self = this;
    // this.newSesh.save(null, {
    //   success: function(newSesh) {
    //     alert('New object created with objectId: ' + newSesh.id);
    //     self.newSesh.trigger('start');
    //   },
    //   error: function(newSesh, error) {
    //     alert('Failed to create new object, with error code: ' + error.description);
    //   }
    // });
  },

  finalizeSesh: function() {
    this.setTime(false);

    this.newSesh.set({cashedOut: parseInt($('.cashout-input').val()) });
    var profit = this.newSesh.get('cashedOut') - this.newSesh.get('totalBuyin');
    this.newSesh.set({netProfit: profit});
  },

  startSeshEvents: function() {
    $('.new-session-button, .start-hide').hide();
    $('.end-session-button').fadeIn('slow');
    $('.top-in-progress-alert, .new-sesh-cashout, .start-show, .new-sesh-start-time').fadeIn();
    $('.add-game-sidebar-view form fieldset').addClass('session-in-progress');
  },

  endSeshEvents: function() {
    $('.top-in-progress-alert, .end-session-button, .end-hide').fadeOut('fast');
    $('.new-sesh-end-time').fadeIn();
    $('.add-game-sidebar-view form fieldset').removeClass('session-in-progress').addClass('session-complete');
  },

  setTime: function(start) {
    var dt = new Date();
    var currentDate = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
    var currentTime = this.formatAMPM(dt);
    if (start) {
      this.newSesh.set({dateStartRaw: dt});
      this.newSesh.set({dateStart: currentDate + ', ' + currentTime});
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      this.newSesh.set({weekday: days[dt.getDay()] });
    } else {
      this.newSesh.set({dateEndRaw: dt});
      this.newSesh.set({dateEnd: currentDate + ', ' + currentTime});
    }
  },

  formatAMPM: function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  },

  template: _.template(''+
    '<form>' +
      '<div class="row">' +
        '<fieldset class="twelve columns">' +
          '<legend>New Cash Game Session</legend>' +
          '<ul>' +
            '<li class="prepend field new-sesh-cashout">' +
              '<div class="row"><label class="default label">Cash Out</label></div>' +
              '<span class="adjoined end-hide">$</span>' +
              '<input class="wide text input cashout-input end-hide" type="text" placeholder="Cash Out" />' +
            '</li>' +
            '<li class="prepend field new-sesh-buyin">' +
              '<div class="row"><label class="default label">Initial Buyin</label></div>' +
              '<span class="adjoined start-hide">$</span>' +
              '<input class="wide text input start-hide buyin-input" type="text" placeholder="Buyin" />' +
              '<h5 class="start-show">$<%= totalBuyin %></h5>' +
            '</li>' +
            '<li class="field new-sesh-start-time">' +
              '<div class="row"><label class="default label">Start Date, Time</label></div><h5><%= dateStart %></h5>' +
            '</li>' +
            '<li class="field new-sesh-end-time">' +
              '<div class="row"><label class="default label">End Date, Time</label></div>' +
            '</li>' +
            '<li class="field new-sesh-location">' +
              '<div class="row"><label class="default label">Location</label></div>' +
              '<div class="picker start-hide">' +
                '<select class="locationSelect">' +
                  '<option value="#" disabled>Locations</option>' +
                  '<% _.each(locations, function(location) { %> <option><%= location %></option> <% }); %>' +
                '</select>' +
              '</div>' +
              '<h5 class="start-show"><%= location %></h5>' +
            '</li>' +
            '<li class="field new-sesh-stake">' +
              '<div class="row"><label class="default label">Stake</label></div>' +
              '<div class="picker start-hide">' +
                '<select class="stakesSelect">' +
                  '<option value="#" disabled>Stakes</option>' +
                  '<% _.each(stakesList, function(stake) { %> <option><%= stake %></option> <% }); %>' +
                '</select>' +
              '</div>' +
              '<h5 class="start-show"><%= stakes %></h5>' +
            '</li>' +
            '<li class="field new-sesh-limits">' +
              '<div class="row"><label class="default label">Limit</label></div>' +
              '<div class="picker start-hide">' +
                '<select class="limitSelect">' +
                  '<option value="#" disabled>Limits</option>' +
                  '<% _.each(limitTypes, function(limit) { %> <option><%= limit %></option> <% }); %>' +
                '</select>' +
              '</div>' +
              '<h5 class="start-show"><%= limitType %></h5>' +
            '</li>' +
            '<li class="field new-sesh-game">' +
              '<div class="row"><label class="default label">Game</label></div>' +
              '<div class="picker start-hide">' +
                '<select class="gamesSelect">' +
                  '<option value="#" disabled>Games</option>' +
                  '<% _.each(games, function(game) { %> <option><%= game %></option> <% }); %>' +
                '</select>' +
              '</div>' +
              '<h5 class="start-show"><%= game %></h5>' +
            '</li>' +
            '<li>' +
              '<div class="new-session-button">' +
                '<div class="btn medium success metro"><a href="#">Start Session</a></div>' +
              '</div>' +
            '</li>' +
            '<li>' +
              '<div class="end-session-button">' +
                '<div class="btn medium danger metro"><a href="#">End Session</a></div>' +
              '</div>' +
            '</li>' +
          '</ul>' +
        '</fieldset>' +
      '</div>' +
    '</form>'
  ),

  render: function() {
    var allData = $.extend({}, this.model.attributes, this.newSesh.attributes);
    return this.$el.html(this.template(allData));
  },

  endRender: function() {
    var cashOut = '<h5>$' + this.newSesh.get('cashedOut') + '</h5>';
    $('.new-sesh-cashout').append(cashOut);
    var endTime = '<h5>' + this.newSesh.get('dateEnd') + '</h5>';
    $('.new-sesh-end-time').append(endTime);
  }
});

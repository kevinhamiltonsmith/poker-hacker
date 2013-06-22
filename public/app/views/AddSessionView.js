var AddSessionView = Backbone.View.extend({

  className: 'add-session-view',

  initialize: function() {
    this.newSesh = new Session();
    this.isNewSession = true;
  },

  events: {
    'submit #new-session': function(e){
      e.preventDefault();
      if ($('.session-submit-button input').val() == "End Session"){
        this.finalizeSesh();
      } else {
        this.createNewSesh();
      }
    },

    'click .view-this-sesh': function(e){
      e.preventDefault();
      var id = $(e.currentTarget).data("session-id");
      this.sessionNav(id);
    },

    'change .toggle-switch .switch': function(e) {
      if ($('#live-game').is(':checked')){
        this.isNewSession = true;
        this.liveGame();
      } else if ($('#completed-game').is(':checked')) {
        this.isNewSession = false;
        this.completedGame();
      }
    }
  },

  //live session toggle switch display properties
  liveGame: function() {
    $('.new-sesh-start-time, .new-sesh-end-time, .new-sesh-cashout').hide();
  },

  //past session toggle switch display properties
  completedGame: function() {
    $('.new-sesh-start-time, .new-sesh-cashout, .new-sesh-end-time').show();
    $('.session-submit-button input').val('Add Session');
    $.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});
    $('#picker-start-date, #picker-end-date').datetimepicker({
      timeFormat: "hh:mm tt"
    });
  },

  createNewSesh: function() {
    this.newSesh = new Session();

    //event handler for completion of createNewSesh function
    this.newSesh.on('change:limitType', function(){
      this.render().el;
      this.startSeshEvents();
    }, this);

    //event handler for completion of finalizeSesh function
    this.newSesh.on('change:netProfit', function(){
      this.endRender();
      this.endSeshEvents();
    }, this);

    if (this.isNewSession) {
      this.setTime(true);
    } else {
      //format start and end times for sessions in the past
      var startDate = Date.parse($('#picker-start-date').val());
      this.setTime(true, startDate);
      var endDate = Date.parse($('#picker-end-date').val());
      this.setTime(false, endDate);
      var cashout = $('.cashout-input').val() ? parseInt($('.cashout-input').val()) : 0;
      this.newSesh.set({cashedOut: cashout});
    }

    this.newSesh.set({sessionId: this.collection.models.length + 1});

    if ($('.buyin-input').val()) {
      var buyin = parseInt($('.buyin-input').val());
      this.newSesh.set({totalBuyin: buyin});
      this.newSesh.set({location: $('.locationSelect').val()});
      this.newSesh.set({stakes: $('.stakesSelect').val()});
      this.newSesh.set({game: $('.gamesSelect').val()});
      this.newSesh.set({limitType: $('.limitSelect').val()});
//TODO: turned off save for testing
      // this.newSesh.save(null, {
      //   success: function(newSesh) {
      //     console.log('New session created with objectId: ' + newSesh.id);
      //   },
      //   error: function(newSesh, error) {
      //     console.log('Failed to create new session, with error code: ' + error.description);
      //   }
      // });
    } else {
      this.inputError();
    }

    if (this.isNewSession === false) {
      this.finalizeSesh();
    }
  },

  finalizeSesh: function() {
    if (this.isNewSession) {
      this.setTime(false);
      var cashout = $('.cashout-input').val() ? parseInt($('.cashout-input').val()) : 0;
      this.newSesh.set({cashedOut: cashout});
    }

    var profit = this.newSesh.get('cashedOut') - this.newSesh.get('totalBuyin');
    this.newSesh.set({netProfit: profit});

    this.newSesh.trigger('formatData');
//TODO: delete this line after testing is complete
    this.collection.add(this.newSesh);
//TODO: turned off save for testing
    // var self = this;
    // this.newSesh.save(null, {
    //   success: function(newSesh) {
    //     console.log('Session finalized with objectId: ' + newSesh.id);
    //     self.collection.add(self.newSesh);
    //   },
    //   error: function(newSesh, error) {
    //     console.log('Failed to finalize session, with error code: ' + error.description);
    //   }
    // });
  },

  startSeshEvents: function() {
    var self = this;
    $('.start-hide, .toggle-switch, .new-sesh-start-time input').hide();
    $('.session-submit-button').fadeOut('slow', function(){
        if (self.isNewSession) {
          $(this).removeClass('success').addClass('danger').fadeIn('slow');
          $('.session-submit-button input').val('End Session');
        }
      });
    $('.top-in-progress-alert, .new-sesh-cashout, .start-show, .new-sesh-start-time').fadeIn();
    $('.add-session-view form fieldset').addClass('session-in-progress');
  },

  endSeshEvents: function() {
    $('.top-in-progress-alert, .end-hide, .session-submit-button, .new-sesh-end-time input').hide();
    $('.new-sesh-end-time').fadeIn();
    $('.add-session-view form fieldset').removeClass('session-in-progress').addClass('session-complete');
  },

  setTime: function(start, dt) {
    if (dt == undefined) {
      var dt = new Date();
    }
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
//TODO: get rid of this time addition after testing
      var t = this.newSesh.get('dateEndRaw').getTime() + (1000 * 4000) - this.newSesh.get('dateStartRaw').getTime(),
      t = this.formatHoursMin(t);
      this.newSesh.set({sessionLength: t});
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

  formatHoursMin: function(t) {
    var hourConst = 60 * 60 * 1000,
      h = '0' + Math.floor(t / hourConst),
      m = '0' + Math.round( (t - h * hourConst) / 60000);
    return [h.substr(-2), m.substr(-2)].join(':');
  },

  inputError: function() {
    $('.new-sesh-buyin, .new-sesh-buyin span').addClass('danger');
  },

  template: _.template(''+
    '<h3>New Cash Game Session</h3>' +
    '<form id="new-session">' +
      '<div class="row">' +
        '<fieldset class="centered">' +
          '<div class="row toggle-switch">' +
            '<div class="centered">' +
              '<label class="switch-label">Choose:</label>' +
              '<div class="switch android">' +
                '<input id="live-game" name="view" type="radio" checked>' +
                '<label for="live-game" onclick="">Live Game</label>' +
                '<input id="completed-game" name="view" type="radio">' +
                '<label for="completed-game" onclick="">Completed Game</label>' +
                '<span class="slide-button"></span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<ul>' +
            '<li class="prepend field new-sesh-buyin">' +
              '<div class="row"><label class="default label">Initial Buyin</label></div>' +
              '<span class="adjoined start-hide">$</span>' +
              '<input class="wide text input start-hide buyin-input" type="text" placeholder="Buyin" />' +
              '<h5 class="start-show">$<%= totalBuyin %></h5>' +
            '</li>' +
           '<li class="prepend field new-sesh-cashout">' +
              '<div class="row"><label class="default label">Cash Out</label></div>' +
              '<span class="adjoined end-hide">$</span>' +
              '<input class="wide text input cashout-input end-hide" type="text" placeholder="Cash Out" />' +
            '</li>' +
            '<li class="field new-sesh-start-time">' +
              '<div class="row"><label class="default label">Start Date, Time</label></div><h5><%= dateStart %></h5>' +
              '<input id="picker-start-date" class="wide text input" type="text" />' +
            '</li>' +
            '<li class="field new-sesh-end-time">' +
              '<div class="row"><label class="default label">End Date, Time</label></div>' +
              '<input id="picker-end-date" class="wide text input" type="text" />' +
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
              '<div class="session-submit-button btn medium success metro">' +
                '<input type="submit" value="Start Session"></input>' +
              '</div>' +
            '</li>' +
          '</ul>' +
        '</fieldset>' +
      '</div>' +
    '</form>'
  ),

  render: function() {
    var allData = $.extend({}, this.model.attributes, this.newSesh.attributes);
    this.$el.empty().append(this.template(allData));
    return this;
  },

  endRender: function() {
    $('.add-session-view ul')
      .append('<div class="medium info btn view-this-sesh" data-session-id="' + this.newSesh.get('sessionId') + '"><a href="#">Session Details</a></div>')
      .prepend('<li class="success badge save-success">Session saved successfully!</li>');
    var cashOut = '<h5>$' + this.newSesh.get('cashedOut') + '</h5>';
    $('.new-sesh-cashout').append(cashOut);
    var endTime = '<h5>' + this.newSesh.get('dateEnd') + '</h5>';
    $('.new-sesh-end-time').append(endTime);
  },

  sessionNav: function(id) {
    pokerHacker.navigate('session/' + id, true);
  }
});

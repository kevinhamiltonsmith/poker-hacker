var AddGameSidebarView = Backbone.View.extend({

  className: 'add-game-sidebar-view',

  events: {
    'click .new-session-button': function(event){
      event.preventDefault();

      this.createNewSesh();
      this.render();

      $('.new-session-button').slideUp('fast');
      $('.end-session-button').fadeIn('slow');
      $('.top-in-progress-alert').slideDown('slow');
      $('.new-sesh-cashout').fadeIn();
      $('.add-game-sidebar-view form fieldset').addClass('session-in-progress');

      //display final values
      $('.new-sesh-start-time').fadeIn();
    },

    'click .end-session-button': function(event){
      event.preventDefault();
      $('.end-session-button').fadeOut('fast');
      $('.top-in-progress-alert').fadeOut('fast');
      $('.add-game-sidebar-view form fieldset').removeClass('session-in-progress');
    },
  },

  initialize: function() {
    this.newSesh = new Session();
  },

  createNewSesh: function() {
    this.newSesh = new Session();

    var dt = new Date();
    this.newSesh.set({dateStartRaw: dt});
    var startDate = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
    var startTime = this.formatAMPM(dt);
    this.newSesh.set({dateStart: startDate + ', ' + startTime});

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    this.newSesh.set({weekday: days[dt.getDay()] });

    this.newSesh.set({sessionId: this.collection.models.length + 1});

    var buyin = $('#buyin-input').val();
    this.newSesh.set({totalBuyin: buyin});

//TODO: finish up setting initial values, save to Parse
    console.log(this.newSesh)
  },

  finalizeSesh: function() {
//TODO: update Parse with the finalized session details
  },

  template: _.template(''+
    '<form>' +
      '<div class="row">' +
        '<fieldset class="twelve columns">' +
          '<legend>New Cash Game Session</legend>' +
          '<ul>' +
            '<li class="field new-sesh-start-time">' +
              '<div class="row"><label class="default label">Start Date, Time</label></div><span class="set-data"><%= dateStart %></span>' +
            '</li>' +
            '<li class="prepend field new-sesh-buyin">' +
              '<div class="row"><label class="default label">Initial Buyin</label></div>' +
              '<span class="adjoined">$</span>' +
              '<input class="wide text input" id="buyin-input" type="text" placeholder="Buyin" />' +
            '</li>' +
            '<li class="prepend field new-sesh-cashout">' +
              '<div class="row"><label class="default label">Cash Out</label></div>' +
              '<span class="adjoined">$</span>' +
              '<input class="wide text input" id="cashout-input" type="text" placeholder="Cash Out" />' +
            '</li>' +
            '<li class="field new-sesh-location">' +
              '<div class="row"><label class="default label">Location</label></div>' +
              '<div class="picker">' +
                '<select class="locationSelect">' +
                  '<option value="#" disabled>Locations</option>' +
                  '<% _.each(locations, function(location) { %> <option><%= location %></option> <% }); %>' +
                '</select>' +
              '</div>' +
            '</li>' +
            '<li class="field new-sesh-stake">' +
              '<div class="row"><label class="default label">Stake</label></div>' +
              '<div class="picker">' +
                '<select class="stakesSelect">' +
                  '<option value="#" disabled>Stakes</option>' +
                  '<% _.each(stakes, function(stake) { %> <option><%= stake %></option> <% }); %>' +
                '</select>' +
              '</div>' +
            '</li>' +
            '<li class="field new-sesh-game">' +
              '<div class="row"><label class="default label">Game</label></div>' +
              '<div class="picker">' +
                '<select class="gamesSelect">' +
                  '<option value="#" disabled>Games</option>' +
                  '<% _.each(games, function(game) { %> <option><%= game %></option> <% }); %>' +
                '</select>' +
              '</div>' +
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

  render: function(){
    var allData = $.extend({}, this.model.attributes, this.newSesh.attributes);
    return this.$el.html(this.template(allData));
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
  }
});

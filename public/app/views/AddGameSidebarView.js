var AddGameSidebarView = Backbone.View.extend({

  className: 'add-game-sidebar-view',

  events: {
    'click .new-session-button': function(event){
      event.preventDefault();
      $('.new-session-button').slideUp('fast');
      $('.end-session-button').fadeIn('slow');
      $('.top-in-progress-alert').slideDown('slow');
      // var squareValue = parseInt($(event.currentTarget).html());
      // var position = $(event.currentTarget).data("position");
      // this.model.setSquare(squareValue, position);
    },

    'click .end-session-button': function(event){
      event.preventDefault();
      $('.end-session-button').fadeOut('fast');
      $('.new-session-button').slideDown('slow');
      $('.top-in-progress-alert').fadeOut('fast');
    },
  },

  template: _.template(''+
    '<form>' +
      '<div class="row">' +
        '<fieldset class="twelve columns">' +
          '<legend>New Cash Game Session</legend>' +
          '<ul>' +
            '<li class="prepend field new-buyin">' +
              '<div class="row"><label class="default label">Initial Buyin</label></div>' +
              '<span class="adjoined">$</span>' +
              '<input class="wide text input" id="text1" type="text" placeholder="Buyin" />' +
            '</li>' +
            '<li class="field">' +
              '<div class="row"><label class="default label">Location</label></div>' +
              '<div class="picker">' +
                '<select class="locationSelect">' +
                  '<option value="#" disabled>Locations</option>' +
                  '<% _.each(locations, function(location) { %> <option><%= location %></option> <% }); %>' +
                '</select>' +
              '</div>' +
            '</li>' +
            '<li class="field">' +
              '<div class="row"><label class="default label">Stake</label></div>' +
              '<div class="picker">' +
                '<select class="stakesSelect">' +
                  '<option value="#" disabled>Stakes</option>' +
                  '<% _.each(stakes, function(stake) { %> <option><%= stake %></option> <% }); %>' +
                '</select>' +
              '</div>' +
            '</li>' +
            '<li class="field">' +
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

  initialize: function() {
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});

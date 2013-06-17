var AddGameSidebarView = Backbone.View.extend({

  className: 'add-game-sidebar-view',

  template: _.template(''+
    '<form>' +
      '<div class="row">' +
        '<fieldset class="twelve columns">' +
          '<legend>New Cash Game Session</legend>' +
          '<ul>' +
            '<li class="prepend field">' +
              '<span class="adjoined">$</span>' +
              '<input class="wide text input" id="text1" type="text" placeholder="Buyin" />' +
            '</li>' +
            '<li class="field">' +
              '<label class="inline" for="text2">Label 2</label>' +
              '<input class="password input" id="text2" type="password" placeholder="wide input" />' +
            '</li>' +
          '</ul>' +
        '</fieldset>' +
      '</div>' +
    '</form>'
  ),

  initialize: function() {
  },

  render: function(){
    console.log('sidebar initialize')
    return this.$el.html(this.template());
  }
});

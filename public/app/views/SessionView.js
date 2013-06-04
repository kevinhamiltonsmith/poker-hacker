var SessionView = Backbone.View.extend({

  className: 'session',

  template: _.template(''+
    '<h2><%= netProfit %></h2>'+
    '<p><%= dateStart %></p>'+
    '<p><%= stakes %></p>'+
    '<p><%= game %></p>'),

  initialize: function() {
    this.render();
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
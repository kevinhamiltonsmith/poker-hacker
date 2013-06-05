var SessionView = Backbone.View.extend({

  className: 'session row',

  template: _.template(''+
    '<div class="eight columns">' +
      '<h4><%= parenProfit %></h4>'+
      '<span><%= date %></span>'+
      '<span><%= stakes %></span>'+
      '<span><%= game %></span>'+
    '</div>'
  ),

  initialize: function() {
    this.render();
  },

  render: function(){
    // console.log(this.model.attributes)
    return this.$el.html(this.template(this.model.attributes));
  }
});
var SessionsView = Backbone.View.extend({

  className: 'sessions',

  initialize: function() {
    this.render();
  },

  render: function(){
    console.log(this);
    return this.$el.append(
      this.collection.map(function(session){
        return new SessionView({model: session}).render();
      })
    );
  }
});
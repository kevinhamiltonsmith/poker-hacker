var OverviewView = Backbone.View.extend({

  className: 'overview',

  template: _.template(''+
    '<div class="row">' +
      '<div class="centered six columns">' +
        '<h3>All Results</h3>' +

      '</div>' +
    '</div>'
  ),

  events: {
  },

  initialize: function() {
  },

  render: function(){
    console.log(this.collection)
    return this.$el.html(this.template());
  }
});

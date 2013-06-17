var OverviewChartView = Backbone.View.extend({
  
  className: 'overview-chart',

  template: _.template(''+
    ''
  ),

  initialize: function() {
    var data = [3,7,9,1,4,6,8,2,5];
    var w = 600;
    var h = 300;
    var max = d3.max(data);

    var x = d3.scale.linear().domain([0, data.length - 1]).range([0, w]);
    var y = d3.scale.linear().domain([0, max]).range([h, 0]);

    var vis = d3.select(this.el)
      .append('svg:svg')
        .attr('width', w)
        .attr('height', h);

    vis.selectAll('path.line')
      .data([data])
    .enter().append("svg:path")
      .attr("d", d3.svg.line()
        .x(function(d, i) {
          return x(i);
        })
        .y(y))
  },

  render: function() {
    return this.$el;
  }
});

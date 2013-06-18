var OverviewChartView = Backbone.View.extend({
  
  className: 'overview-chart',

  template: _.template(''+
    ''
  ),

  initialize: function() {
    data = this.collection.profitData();
    w = 560;
    h = 350;
    max = d3.max(data);
    min = d3.min(data);

    x = d3.scale.linear().domain([0, data.length - 1]).range([0, w]);
    y = d3.scale.linear().domain([min, max]).range([h, 0]);

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

    var ticks = vis.selectAll('.ticky')
      .data(y.ticks(7))
      .enter().append('svg:g')
      .attr('transform', function(d) {
        return "translate(0, " + (y(d)) + ")";
      })
      .attr('class', 'ticky');
    ticks.append('svg:line')
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('x1', 0)
      .attr('x2', w);
    ticks.append('svg:text')
      .text(function(d) {
        return d;
      })
      .attr('text-anchor', 'end')
      .attr('dy', 2)
      .attr('dx', -4);

    ticks = vis.selectAll('.tickx')
      .data(x.ticks(data.length))
      .enter().append('svg:g')
      .attr('transform', function(d, i) {
        return "translate(" + (x(i)) + ", 0)";
      })
      .attr('class', 'tickx');
    ticks.append('svg:line')
      .attr('y1', h)
      .attr('y2', 0)
      .attr('x1', 0)
      .attr('x2', 0);
    ticks.append('svg:text')
      .text(function(d, i) {
        return i;
      })
      .attr('y', h)
      .attr('dy', 15)
      .attr('dx', -2);
  },

  render: function() {
    return this.$el;
  }
});

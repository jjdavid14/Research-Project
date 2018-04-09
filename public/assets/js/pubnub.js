var palette = new Rickshaw.Color.Palette( { scheme: 'spectrum14' } );
// instantiate our graph!
var graph = new Rickshaw.Graph( {
  element: document.getElementById("chart"),
  width: 1100,
  height: 500,
  renderer: 'line',
  stroke: true,
  preserve: true,
  series: [
    {
      color: palette.color(),
      data: [],
      name: 'y-Value'
    }
  ]
});
var init = function() {
  // remove loading animation
  var element = document.getElementById("load");
  element.parentNode.removeChild(element);
  graph.render();
  var preview = new Rickshaw.Graph.RangeSlider( {
    graph: graph,
    element: document.getElementById('preview'),
  } );
  var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: graph,
    xFormatter: function(x) {
      return new Date(x * 1000).toString();
    }
  } );
  var annotator = new Rickshaw.Graph.Annotate( {
    graph: graph,
    element: document.getElementById('timeline')
  } );
  // var legend = new Rickshaw.Graph.Legend( {
  //   graph: graph,
  //   element: document.getElementById('legend')
  // } );
  // var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
  //   graph: graph,
  //   legend: legend
  // } );
  // var order = new Rickshaw.Graph.Behavior.Series.Order( {
  //   graph: graph,
  //   legend: legend
  // } );
  // var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight( {
  //   graph: graph,
  //   legend: legend
  // } );
  var smoother = new Rickshaw.Graph.Smoother( {
    graph: graph,
    element: document.querySelector('#smoother')
  } );
  var ticksTreatment = 'glow';
  var xAxis = new Rickshaw.Graph.Axis.Time( {
    graph: graph,
    ticksTreatment: ticksTreatment,
    timeFixture: new Rickshaw.Fixtures.Time.Local()
  } );
  xAxis.render();
  var yAxis = new Rickshaw.Graph.Axis.Y( {
    graph: graph,
    tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
    ticksTreatment: ticksTreatment
  } );
  yAxis.render();
  // var controls = new RenderControls( {
  //   element: document.querySelector('form'),
  //   graph: graph
  // } );
  // add some data every so often
};
new Rickshaw.Fixtures.PubNub({
  subscribe_key: 'sub-c-8fe601a4-31f0-11e8-8bd5-869948fadc3d',
  channel: 'rickshaw-channel-22',
  history: true,
  graph: graph,
  connect: init,
  limit: 50
});

var pubnub = PUBNUB.init({
  publish_key: 'pub-c-eb301f13-6628-4e66-942e-d1df411d693e',
  subscribe_key: 'sub-c-8fe601a4-31f0-11e8-8bd5-869948fadc3d'
});
var lastdata = [
  Math.round(Math.random() * 99)
];
setInterval(function(){
  var a = 10;
  var newdata = [
    lastdata[0] - (Math.random() * a) + (Math.random() * a)
  ]
  lastdata = newdata;
  pubnub.publish({
    channel: 'rickshaw-channel-22',
    message: {
      y: newdata,
      x: Math.floor(new Date().getTime() / 1000)
    }
  })
}, 1000);
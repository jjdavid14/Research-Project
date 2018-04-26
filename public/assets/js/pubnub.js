var palette = new Rickshaw.Color.Palette( { scheme: 'spectrum14' } );
// instantiate our graph!
var graph = new Rickshaw.Graph( {
  element: document.getElementById("chart"),
  min: -1,
  max: 1.5,
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

var _data = [
  0, 0, 0, 0, 0.0000050048828125, 0.0000137939453125, 0.000049560546875,
  0.00008740234375, 0.00015966796875, 0.000262451171875, 0.0003975830078125, 0.0005687255859375,
  0.0007802734375, 0.001037353515625, 0.0013468017578125, 0.00172119140625, 0.0021756591796875,
  0.0027232666015625, 0.0033880615234375, 0.004206787109375, 0.0052380371093750005,
  0.006586181640625, 0.008400146484375001, 0.010904296875, 0.0144892578125, 0.0196798095703125, 
  0.049684204101562504, 0.0886883544921875, 0.11185363769531251, 0.134164306640625,
  0.137352294921875, 0.1160369873046875, 0.08516308593750001, 0.0539765625, 
  0.014997436523437501, -0.015882568359375, -0.0387554931640625, -0.06125732421875,
  -0.0745780029296875, -0.07479357910156251, -0.0725338134765625, -0.0418538818359375,
  0.08582861328125001, 0.397717529296875, 0.8136408691406251, 1.2295617980957032,
  0.9944150390625001, 0.2824605712890625, -0.38949267578125, -0.597251220703125,
  -0.425675537109375, -0.1537947998046875, -0.0500914306640625, -0.0111041259765625,
  0.0027451171875, 0.0071739501953125, 0.008443359375, 0.0094327392578125, 0.012530517578125,
  0.0176046142578125, 0.0300162353515625, 0.0433489990234375, 0.056962646484375004,
  0.0704832763671875, 0.0770511474609375, 0.0898175048828125, 0.10311853027343751,
  0.117046142578125, 0.1312630615234375, 0.1529300537109375, 0.167607177734375,
  0.1899068603515625, 0.2124422607421875, 0.235044677734375, 0.2575535888671875,
  0.2724073486328125, 0.286978271484375, 0.3007579345703125, 0.3067425537109375,
  0.3106370849609375, 0.303756103515625, 0.2897236328125,0.25916931152343753,
  0.2200599365234375, 0.1728209228515625, 0.133416259765625, 0.086224853515625,
  0.05493408203125, 0.02409423828125, 0.00922607421875, -0.0043409423828125,
  -0.0097349853515625, -0.013127685546875, -0.01423095703125, -0.013834716796875,
  -0.012556030273437501, -0.010675048828125, -0.00835888671875, 
  -0.0057305908203125, -0.0000562744140625];

var i = 0;
var interval = 60 * 1000 / (_data.length * 120);

// Create a data point generator.
var getDataPoint = (function () {
  var _x = -1;
  var _max = _data.length;

  return function () {
    _x = (_x + 1) % _max;
    return  _data[_x] ;
  };
})();

setInterval(function(){
  var _x = -1;
  var _max = _data.length;
  _x = (_x + 1) % _max;
  if(i === _data.length) {
    i = 0;
  }
  var a = 10;
  var newdata = [
    //lastdata[0] - (Math.random() * a) + (Math.random() * a)
    getDataPoint()
  ]
  lastdata = newdata;
  pubnub.publish({
    channel: 'rickshaw-channel-22',
    message: {
      y: newdata,
      x: Date.now()
    }
  })
}, interval);